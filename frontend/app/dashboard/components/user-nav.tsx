"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutGrid,
  Phone,
  FileText,
  PenTool,
  Blocks,
  Users,
  ClipboardList,
  Network,
  Webhook,
  UserCircle,
  LogOut,
  Menu,
  Headset
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavbarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Platform",
    icon: Network,
    children: [
      { title: "Assistants", href: "/dashboard/assistants", icon: Users },
      { title: "Phone Numbers", href: "/dashboard/phone-numbers", icon: Phone },
      { title: "Files", href: "/dashboard/files", icon: FileText },
      { title: "Tools", href: "/dashboard/tools", icon: PenTool },
      { title: "Blocks", href: "/dashboard/blocks", icon: Blocks },
    ],
  },
  {
    title: "Logs",
    icon: ClipboardList,
    children: [
      { title: "Calls", href: "/dashboard/calls", icon: Headset },
      {
        title: "API Requests",
        href: "/dashboard/api-requests",
        icon: Network,
      },
      { title: "Webhooks", href: "/dashboard/webhooks", icon: Webhook },
    ],
  }
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const router = useRouter();
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    router.push("/");
    sessionStorage.clear();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isMobile = windowWidth < 1024;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md">
      <div className="container mx-auto flex h-16 items-center px-4 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6 text-white" />
        </Button>
        <div className="flex-1">
          <Link
            href="/dashboard"
            className="text-2xl font-bold tracking-wide text-white"
          >
            ELIDE
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatars/01.png" alt={username} />
                <AvatarFallback>{getInitials(username)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-[14px] font-medium text-white">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <span>{username}</span>
                <span className="text-sm text-muted">{email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-5 w-5" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut className="mr-2 h-5 w-5" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isMobile && (
        <nav
          className={`fixed top-16 left-0 w-full bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg transform transition-transform ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul className="flex flex-col gap-2 p-4">
            {NavbarItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href || "/dashboard"}
                  className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
