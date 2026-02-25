"use client";

import { motion } from "framer-motion";
import { Mail, BellRing } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 14, delay: 0.2 },
  },
};

export default function NotificationFeature() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="order-2 md:order-1 relative flex items-center justify-center pt-20 md:pt-0"
        >
          {/* Laptop Subject */}
          <div className="relative z-10 w-full max-w-[600px] aspect-[4/3]">
            <img 
              src="/assets/images/notification-laptop.png" 
              alt="Laptop Workstation" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Code-based Email Notification Card */}
          <motion.div 
            initial={{ opacity: 0, y: -40, x: "-50%", scale: 0.8 }}
            whileInView={{ opacity: 1, y: -100, x: "-50%", scale: 1 }}
            transition={{ 
              delay: 1,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="absolute top-1/2 left-1/2 z-20 w-[280px] md:w-[350px] bg-white rounded-3xl shadow-2xl border border-emerald-50 p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 animate-bounce">
                <Mail className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Hộp thư mới</span>
                  <span className="text-[10px] text-gray-400">Vừa xong</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 truncate">Sửa đổi TKB Môn Lập trình Web</h4>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
              Phòng đào tạo vừa cập nhật lịch học. Hệ thống đã tự động đồng bộ lên Google Calendar của bạn.
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <div className="text-[10px] font-bold text-emerald-600 px-2 py-1 bg-emerald-50 rounded-lg">Đã đồng bộ</div>
            </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-emerald-400/10 blur-[100px] rounded-full -z-10" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="order-1 md:order-2"
        >
          <motion.div variants={itemVariants} className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <BellRing className="w-8 h-8" />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Thông báo <br />
            <span className="text-emerald-600">Ngay lập tức</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 leading-relaxed">
            Hệ thống tự động phát hiện mọi thay đổi từ Phòng đào tạo. Nhận ngay email thông báo và xem lịch học mới nhất trên Google Calendar mà không cần làm gì thêm.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-4">
            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-bold text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Auto Refresh
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-bold text-gray-700">
              Email Alerts
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
