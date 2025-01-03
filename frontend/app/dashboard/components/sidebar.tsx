"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Phone,
  FileUp,
  Wrench,
  Box,
  Users,
  User,
  Bell,
  BookOpen,
  List,
  ChevronDown,
} from "lucide-react";

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Platform",
    href: "/dashboard/platform",
    icon: Phone,
    children: [
      { title: "Assistants", href: "/dashboard/assistants", icon: User },
      { title: "Phone Numbers", href: "/dashboard/phone-numbers", icon: Phone },
      { title: "Files", href: "/dashboard/files", icon: FileUp },
      { title: "Tools", href: "/dashboard/tools", icon: Wrench },
      { title: "Blocks", href: "/dashboard/blocks", icon: Box },
      { title: "Squads", href: "/dashboard/squads", icon: Users },
    ],
  },
  {
    title: "Voice Library",
    href: "/dashboard/voice-library",
    icon: BookOpen,
  },
  {
    title: "Logs",
    href: "/dashboard/logs",
    icon: List,
    children: [
      { title: "Calls", href: "/dashboard/logs/calls", icon: Phone },
      {
        title: "API Requests",
        href: "/dashboard/logs/api-requests",
        icon: FileUp,
      },
      { title: "Webhooks", href: "/dashboard/logs/webhooks", icon: Bell },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-[#1a1a1a] text-gray-300 w-64 min-h-screen py-6">
      <div className="px-6 mb-8">
        <i className="fi fi-ss-phone-call"></i>
      </div>
      <nav className="space-y-1 px-3">
        {sidebarNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.href} className="space-y-1">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-[#4ade80] bg-opacity-10 text-[#4ade80]"
                    : "hover:bg-gray-800 hover:text-white"
                )}
              >
                <span className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.title}</span>
                </span>
                {hasChildren && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isActive ? "transform rotate-180" : ""
                    )}
                  />
                )}
              </Link>
              {hasChildren && isActive && (
                <div className="ml-4 pl-4 border-l border-gray-800 space-y-1">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                          isChildActive
                            ? "bg-[#4ade80] bg-opacity-10 text-[#4ade80]"
                            : "hover:bg-gray-800 hover:text-white"
                        )}
                      >
                        <child.icon className="w-4 h-4 mr-3" />
                        <span>{child.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
