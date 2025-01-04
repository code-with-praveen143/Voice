"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutGrid,
  Phone,
  FileText,
  PenTool,
  Blocks,
  Users,
  Mic2,
  ClipboardList,
  Network,
  Webhook,
  UserCircle,
} from "lucide-react";

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Platform",
    href: "/dashboard/platform",
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
    href: "/dashboard/logs",
    icon: ClipboardList,
    children: [
      { title: "Calls", href: "/dashboard/logs/calls", icon: Network },
      { title: "API Requests", href: "/dashboard/logs/api-requests", icon: Network },
      { title: "Webhooks", href: "/dashboard/logs/webhooks", icon: Webhook },
    ],
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
];

export function Sidebar() {
  return (
    <div className="hidden lg:block border-r border-gray-400 text-white">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-14 items-center border-b border-gray-800 px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-teal-500">
            ELIDE
          </Link>
        </div>

        {/* Scrollable Sidebar */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-2 py-4">
            {sidebarNavItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={item.href} className="space-y-1">
                  <Link
                    href={item.href}
                    className={cn(
                      "w-full flex items-center justify-start gap-2 text-sm rounded-md px-3 py-2 transition-colors hover:bg-gray-800 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                  {hasChildren && (
                    <div className="ml-4 space-y-1 pt-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "w-full flex items-center justify-start gap-2 text-sm rounded-md px-3 py-2 transition-colors hover:bg-gray-800 hover:text-white"
                          )}
                        >
                          <child.icon className="h-4 w-4" />
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
