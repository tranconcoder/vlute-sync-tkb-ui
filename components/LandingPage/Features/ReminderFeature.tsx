"use client";

import { motion } from "framer-motion";
import { AlarmClock, Clock } from "lucide-react";

export default function ReminderFeature() {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-white section-snap relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
            <AlarmClock className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Nhắc nhở <br />
            <span className="text-amber-600">Đến giờ học</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Đặt lịch nhắc nhở 15, 30 phút hoặc 1 tiếng trước khi vào lớp. Đảm bảo bạn luôn có mặt đúng giờ và chuẩn bị tốt nhất cho mỗi buổi học.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-amber-200 transition-colors bg-gray-50/50 group">
              <Clock className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-bold text-gray-900">Nhắc nhở linh hoạt</div>
                <div className="text-sm text-gray-500">Tùy chỉnh thời gian nhắc nhở theo ý muốn</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <div className="w-full max-w-sm mx-auto bg-amber-500 rounded-[3rem] p-8 shadow-2xl shadow-amber-200 text-white flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6"
            >
              <AlarmClock className="w-10 h-10" />
            </motion.div>
            <div className="text-2xl font-bold mb-2">Đến giờ học!</div>
            <div className="text-amber-100 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-ping" />
              Bắt đầu sau 15 phút
            </div>
            
            <div className="w-full space-y-3">
              <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between">
                <span className="font-medium text-sm">Toán cao cấp</span>
                <span className="text-xs bg-white text-amber-600 px-2 py-1 rounded font-bold">A2 201</span>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl opacity-50 flex items-center justify-between">
                <span className="font-medium text-sm">Anh văn chuyên ngành</span>
                <span className="text-xs px-2 py-1 rounded font-bold">13:30</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
