"use client";

import { APP_CONFIG } from "@/configs/app.config";
import { Github, Globe, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-12 px-6 section-snap">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="font-bold text-2xl text-gray-900 mb-2">{APP_CONFIG.projectName}</div>
          <p className="text-gray-500 text-sm max-w-sm">
            Hệ thống đồng bộ Thời khóa biểu VLUTE với Google Calendar. Một sản phẩm hỗ trợ sinh viên quản lý việc học tốt hơn.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-emerald-50 transition-all">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-emerald-50 transition-all">
            <Globe className="w-5 h-5" />
          </Link>
          <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-emerald-50 transition-all">
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-50 flex justify-between items-center">
        <div className="text-xs text-gray-400">
          © 2026 {APP_CONFIG.projectName}. All rights reserved.
        </div>
        <div className="flex gap-6 text-xs text-gray-400">
          <Link href="#" className="hover:text-gray-600 transition-colors">Điều khoản</Link>
          <Link href="#" className="hover:text-gray-600 transition-colors">Bảo mật</Link>
        </div>
      </div>
    </footer>
  );
}
