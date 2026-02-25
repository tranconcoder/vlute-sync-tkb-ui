"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe, Bell, Clock, WifiOff } from "lucide-react";
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
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function Hero() {
  return (
    <section className="min-h-[100dvh] py-20 w-full flex items-center justify-center relative bg-gradient-to-br from-emerald-50 to-white snap-section overflow-hidden">
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

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1]"
          >
            Quản lý thời khóa biểu <br />
            <span className="text-primary italic">Thông minh & Tiện lợi</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Đừng bao giờ quên lịch học nữa. Đồng bộ ngay Thời khóa biểu VLUTE của bạn với Google Calendar chỉ trong vài giây.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/login"
              className="group w-full sm:w-auto h-12 px-8 bg-primary hover:bg-secondary text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-200 hover:shadow-2xl hover:shadow-emerald-300"
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

        {/* Quick Feature List - Wider and More Prominent */}
        <motion.div
          variants={itemVariants}
          className="mt-12 max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Trải nghiệm tính năng 
               <span className="text-primary italic ml-2">Đột phá</span>
            </h2>
            <div className="w-10 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: "Đồng bộ Google", desc: "Tự động cập nhật lịch học nhanh chóng và chính xác.", color: "bg-blue-50 text-blue-600 border-blue-100" },
              { icon: Bell, title: "Thông báo Email", desc: "Nhận thông báo ngay khi có sự thay đổi về phòng học hay thời gian.", color: "bg-purple-50 text-purple-600 border-purple-100" },
              { icon: Clock, title: "Nhắc nhở học", desc: "Cài đặt nhắc nhở linh hoạt, giúp bạn không bao giờ trễ giờ giảng đường.", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
              { icon: WifiOff, title: "Truy cập Offline", desc: "Xem lịch mọi lúc mọi nơi, ngay cả khi không có kết nối internet.", color: "bg-orange-50 text-orange-600 border-orange-100" },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative p-6 rounded-[2rem] bg-white border border-gray-100 hover:border-emerald-200 transition-all hover:shadow-2xl hover:shadow-emerald-100/50 hover:-translate-y-2 overflow-hidden"
              >
                {/* Decoration */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity bg-emerald-500`} />
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm ${f.color.split(' ')[0]} ${f.color.split(' ')[1]}`}>
                  <f.icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                
                <div className="mt-6 flex items-center text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Khám phá ngay <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 z-30"
      >
        <span className="text-xs uppercase tracking-widest font-bold">Cuộn xuống</span>
        <div className="w-1 h-8 rounded-full bg-emerald-100 flex justify-center p-1">
          <div className="w-full h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
}
