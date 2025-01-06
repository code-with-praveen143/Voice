"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, Phone, FileText, PenTool, Blocks, Users, ClipboardList, Network, Webhook, UserCircle, LogOut, Menu, Headset, ChevronDown } from 'lucide-react';
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";

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
      { title: "API Requests", href: "/dashboard/api-requests", icon: Network },
      { title: "Webhooks", href: "/dashboard/webhooks", icon: Webhook },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

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

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isMobile = windowWidth < 1024;

  const NavItem = ({ item, onClick }: { item: any; onClick?: () => void }) => {
    const isActive = pathname === item.href;

    if (item.children) {
      return (
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-white bg-slate-800 hover:bg-slate-700">
            <div className="flex items-center">
              <item.icon className="mr-2 h-5 w-5" />
              <span>{item.title}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 space-y-1 mt-1">
            {item.children.map((child: any) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center rounded-lg px-4 py-2 text-white bg-slate-800 hover:bg-slate-700",
                  pathname === child.href && "bg-slate-600"
                )}
                onClick={onClick}
              >
                <child.icon className="mr-2 h-5 w-5" />
                {child.title}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center rounded-lg px-4 py-2 hover:bg-white/10",
          isActive && "bg-white/20"
        )}
        onClick={onClick}
      >
        <item.icon className="mr-2 h-5 w-5" />
        {item.title}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A] bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:32px_32px] shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4 lg:hidden hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6 text-white" />
          </Button>
          
          <Link
            href="/dashboard"
            className="text-2xl font-bold tracking-wide text-white"
          >
            ELIDE
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 bg-white">
                  <AvatarImage src="/avatars/01.png" alt={username} />
                  <AvatarFallback>{getInitials(username)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-800">
              <DropdownMenuLabel className="text-white">
                <div className="flex flex-col space-y-1">
                  <span>{username}</span>
                  <span className="text-sm text-gray-400">{email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-white hover:bg-slate-700 focus:bg-slate-700">
                  <UserCircle className="mr-2 h-5 w-5" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 hover:bg-slate-700 focus:bg-slate-700"
              >
                <LogOut className="mr-2 h-5 w-5" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 bg-black/60 transition-opacity",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsOpen(false)}
        >
          <nav
            className={cn(
              "absolute left-0 top-0 bottom-0 w-72 bg-slate-800 p-4 shadow-xl transition-transform duration-200 ease-in-out",
              isOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              {NavbarItems.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}