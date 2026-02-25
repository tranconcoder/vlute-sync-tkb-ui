"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function Hero() {
  return (
    <section className="h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-emerald-50 to-white section-snap overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 right-[-10%] w-[40rem] h-[40rem] rounded-full bg-emerald-100/50 blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] rounded-full bg-emerald-50 blur-3xl"
        />
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-8"
          >
            <Calendar className="w-4 h-4" />
            <span>Tự động đồng bộ lịch học VLUTE</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[1.1]"
          >
            Quản lý thời khóa biểu <br />
            <span className="text-primary italic">Thông minh & Tiện lợi</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Đừng bao giờ quên lịch học nữa. Đồng bộ ngay Thời khóa biểu VLUTE của bạn với Google Calendar chỉ trong vài giây.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/login"
              className="group w-full sm:w-auto h-14 px-8 bg-primary hover:bg-secondary text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-200 hover:shadow-2xl hover:shadow-emerald-300"
            >
              Bắt đầu ngay
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium px-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Chỉ dùng tài khoản trường cấp
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-xs uppercase tracking-widest font-bold">Cuộn xuống</span>
        <div className="w-1 h-8 rounded-full bg-emerald-100 flex justify-center p-1">
          <div className="w-full h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
}
