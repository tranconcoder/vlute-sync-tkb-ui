"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_CONFIG } from "@/configs/app.config";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="VLUTE Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${
            isScrolled ? "text-gray-900" : "text-gray-900 lg:text-white"
          }`}>
            {APP_CONFIG.projectName}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className={`text-sm font-medium transition-colors hover:text-primary ${
            isScrolled ? "text-gray-600" : "text-gray-600 lg:text-white/90"
          }`}>
            Tính năng
          </Link>
          <Link href="/login" className="bg-primary hover:bg-secondary text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md">
            Đăng nhập
          </Link>
        </div>
      </div>
    </nav>
  );
}
