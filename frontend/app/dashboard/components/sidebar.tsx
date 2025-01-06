"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScrollArea } from "../../../components/ui/scroll-area";
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
  Headset
} from "lucide-react";
import { cn } from "../../../lib/utils";

const sidebarNavItems = [
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
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
];

export function Sidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="hidden lg:block border-r border-gray-400 text-gray-200">
      <div className="flex h-full flex-col">
        {/* Scrollable Sidebar */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-2 py-4">
            {sidebarNavItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openMenus[item.title];

              return (
                <div key={item.title} className="space-y-1">
                  {hasChildren ? (
                    <div>
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className={cn(
                          "w-full flex items-center justify-start gap-2 text-sm rounded-md px-3 py-2 transition-colors hover:bg-gray-800 hover:text-white"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </button>
                      {isOpen && (
                        <div className="ml-4 space-y-1 pt-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href ?? "/"} // Add this line
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
                  ) : (
                    <Link
                      href={item.href ?? "/"} // Add this line
                      className={cn(
                        "w-full flex items-center justify-start gap-2 text-sm rounded-md px-3 py-2 transition-colors hover:bg-gray-800 hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
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
