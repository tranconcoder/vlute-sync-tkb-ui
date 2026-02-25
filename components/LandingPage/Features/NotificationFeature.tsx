"use client";

import { motion } from "framer-motion";
import { Mail, BellRing, RefreshCw } from "lucide-react";

export default function NotificationFeature() {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-gray-50 section-snap relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center flex-row-reverse">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 relative"
        >
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 max-w-md mx-auto relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="font-bold text-gray-900">Thông báo mới</div>
              </div>
              <span className="text-xs text-gray-400 font-medium">Vừa xong</span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-sm font-semibold text-emerald-900 mb-1">Cập nhật Thời khóa biểu</p>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Phòng đào tạo vừa thay đổi lịch học môn &quot;Lập trình Web&quot; từ sáng thứ 2 sang chiều thứ 3. Hệ thống đã tự động cập nhật lịch của bạn.
                </p>
              </div>
              <div className="h-12 w-full bg-gray-50 rounded-xl" />
            </div>
          </div>
          
          {/* Floating icons */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-40px] left-[20%] text-emerald-200"
          >
            <RefreshCw className="w-20 h-20" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2"
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <BellRing className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Thông báo <br />
            <span className="text-emerald-600">Ngay lập tức</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Hệ thống tự động phát hiện mọi thay đổi từ Phòng đào tạo. Nhận ngay email thông báo và xem lịch học mới nhất trên Google Calendar mà không cần làm gì thêm.
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-bold text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Auto Refresh
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-bold text-gray-700">
              Email Alerts
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
