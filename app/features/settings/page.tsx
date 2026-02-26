"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings, Shield, Bell, Moon, Globe, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-10">
        <h2 className="text-3xl font-black text-gray-900">Cài đặt</h2>
        <p className="text-gray-500 mt-2 font-medium">Quản lý tài khoản và tùy chỉnh trải nghiệm của bạn.</p>
      </header>

      <div className="grid gap-6">
        {[
          { icon: Shield, title: "Bảo mật", desc: "Quản lý mật khẩu và các phiên đăng nhập." },
          { icon: Bell, title: "Thông báo", desc: "Tùy chỉnh cách bạn nhận thông báo." },
          { icon: Moon, title: "Giao diện", desc: "Chuyển đổi giữa chế độ sáng và tối." },
          { icon: Globe, title: "Ngôn ngữ", desc: "Chọn ngôn ngữ hiển thị của ứng dụng." },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group flex items-center justify-between p-6 rounded-[2rem] bg-white border border-gray-50 hover:border-emerald-100 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-black text-gray-900">{item.title}</p>
                <p className="text-xs font-medium text-gray-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
