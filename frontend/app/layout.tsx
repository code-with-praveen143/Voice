"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Loader2 } from "lucide-react";
import AppLayout from "@/components/layout/app-layout";

const authPages = ["/login", "/signup", "/privacy", "/"];
const validRoutesPrefixes = ["/dashboard"];

const isValidRoute = (pathname: string) => {
  return validRoutesPrefixes.some((prefix) => pathname.startsWith(prefix));
};

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#4ade80]" />
    </div>
  );
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = sessionStorage.getItem("auth_token");

        if (!token && isValidRoute(pathname)) {
          router.replace("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/");
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      })
  );

  const pathname = usePathname();
  const isAuthPage = authPages.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-[#1a1a1a]">
        <QueryClientProvider client={queryClient}>
          <AppLayout>{children}</AppLayout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
