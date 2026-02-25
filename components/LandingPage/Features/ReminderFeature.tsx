"use client";

import { motion } from "framer-motion";
import { AlarmClock, Clock } from "lucide-react";

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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const phoneVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 12, delay: 0.2 },
  },
};

export default function ReminderFeature() {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-white section-snap relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants} className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
            <AlarmClock className="w-8 h-8" />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Nhắc nhở <br />
            <span className="text-amber-600">Đến giờ học</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 leading-relaxed">
            Đặt lịch nhắc nhở 15, 30 phút hoặc 1 tiếng trước khi vào lớp. Đảm bảo bạn luôn có mặt đúng giờ và chuẩn bị tốt nhất cho mỗi buổi học.
          </motion.p>
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-amber-200 transition-colors bg-gray-50/50 group">
              <Clock className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-bold text-gray-900">Nhắc nhở linh hoạt</div>
                <div className="text-sm text-gray-500">Tùy chỉnh thời gian nhắc nhở theo ý muốn</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
           variants={phoneVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
           className="relative flex items-center justify-center pt-20 md:pt-0"
        >
          {/* Phone Subject */}
          <div className="relative z-10 w-full max-w-[450px] aspect-square">
            <img 
              src="/assets/images/reminder-phone.png" 
              alt="Smartphone Reminder" 
              className="w-full h-full object-contain transform scale-125"
            />
          </div>

          {/* Code-based Notification Bubble */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, x: 20, y: 0 }}
            whileInView={{ opacity: 1, scale: 1, x: 50, y: -80 }}
            transition={{ 
              delay: 0.8,
              type: "spring",
              stiffness: 120,
              damping: 12
            }}
            className="absolute top-1/2 right-1/2 z-20 w-[260px] bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-100 p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-200 animate-pulse">
                <AlarmClock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-amber-600 uppercase">Lịch học sắp tới</div>
                <div className="text-sm font-bold text-gray-900">Bắt đầu sau 15p</div>
              </div>
            </div>
            
            <div className="bg-gray-900 text-white p-3 rounded-2xl">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-medium text-gray-400">Tiết 1 - 3</span>
                <span className="text-[10px] bg-amber-500 px-1.5 py-0.5 rounded font-bold">A2 201</span>
              </div>
              <div className="text-xs font-bold truncate">Toán cao cấp C1</div>
            </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-amber-400/10 blur-[100px] rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
