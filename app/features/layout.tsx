"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calendar, 
  RefreshCw, 
  Settings, 
  Home, 
  LogOut,
  User,
  LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const navItems = [
  { name: "Lịch học", href: "/features", icon: Calendar },
  { name: "Đồng bộ", href: "/features/sync-calendar", icon: RefreshCw },
  { name: "Cài đặt", href: "/features/settings", icon: Settings },
];

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-gray-100 bg-white p-6 lg:block z-50">
        <div className="flex flex-col h-full">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xl shadow-emerald-100/50 border border-emerald-50 p-2 group-hover:scale-105 transition-transform">
              <Image 
                src="/logo.png" 
                alt="VLUTE Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">
              VLUTE<span className="text-emerald-500">Sync</span>
            </span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600 shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className={`h-5 w-5 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 h-6 w-1 rounded-full bg-emerald-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-50">
             <div className="mb-6 flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-xs font-black text-gray-900">Sinh Viên</p>
                  <p className="truncate text-[10px] font-medium text-gray-500">student@vlute.edu.vn</p>
                </div>
             </div>
            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-50">
              <LogOut className="h-5 w-5" />
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen lg:pl-64 pb-20 lg:pb-0">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white/80 px-6 backdrop-blur-xl lg:h-20 lg:px-10 border-b border-gray-50/50">
          <div className="flex items-center gap-4 lg:hidden">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1.5 border border-emerald-100 shadow-sm">
                <Image 
                  src="/logo.png" 
                  alt="VLUTE Logo" 
                  width={32} 
                  height={32}
                  className="object-contain"
                />
             </div>
             <span className="font-black text-gray-900">VLUTE Sync</span>
          </div>
          
          <h1 className="hidden text-xl font-black text-gray-900 lg:block">
            {navItems.find(i => i.href === pathname)?.name || "Tổng quan"}
          </h1>

          <div className="flex items-center gap-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-100 bg-white transition-colors hover:bg-gray-50 cursor-pointer">
                <User className="h-5 w-5 text-gray-600" />
             </div>
          </div>
        </header>

        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>

      {/* Mobile nav */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-gray-100 bg-white/95 p-3 backdrop-blur-xl lg:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${
                isActive ? "text-emerald-500" : "text-gray-400"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
