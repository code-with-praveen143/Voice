"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import { AuthLayout } from "../components/layout/auth-layout";
import AppLayout from "../components/layout/app-layout";

const authPages = ["/login", "/signup", "/privacy", "/"];
const validRoutesPrefixes = [
  "/dashboard",
  "/dashboard/assistants",
  "/dashboard/phone-numbers",
  "/dashboard/files",
  "/dashboard/tools",
  "/dashboard/blocks",
  "/dashboard/calls",
  "/dashboard/api-requests",
  "/dashboard/webhooks",
];

const isValidRoute = (pathname: string): boolean => {
  return validRoutesPrefixes.some((prefix) => pathname.startsWith(prefix));
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const isAuthPage = authPages.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-[#1a1a1a]">
        <QueryClientProvider client={queryClient}>
            {isAuthPage || !isValidRoute(pathname) ? (
              <AuthLayout>{children}</AuthLayout>
            ) : (
              <AppLayout>{children}</AppLayout>
            )}
        </QueryClientProvider>
      </body>
    </html>
  );
}
