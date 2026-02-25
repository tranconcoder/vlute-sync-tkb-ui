"use client";

import { motion } from "framer-motion";
import { WifiOff, CheckCircle } from "lucide-react";

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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: 5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 12, delay: 0.2 },
  },
};

export default function OfflineFeature() {
  return (
    <section id="features" className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants} className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <WifiOff className="w-8 h-8" />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Xem lịch học <br />
            <span className="text-blue-600">Mọi lúc, Mọi nơi</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 leading-relaxed">
            Ngay cả khi không có kết nối Internet. Toàn bộ thời khóa biểu sẽ được lưu cục bộ trên thiết bị của bạn sau mỗi lần đồng bộ.
          </motion.p>
          <motion.ul variants={itemVariants} className="space-y-4">
            {[
              "Dữ liệu được nén tối ưu",
              "Tự động làm mới khi có mạng",
              "Truy cập tức thì không độ trễ"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative flex justify-center items-center"
        >
          {/* Main Illustration */}
          <div className="relative z-10 w-full max-w-[500px] aspect-square rounded-[3rem] overflow-hidden bg-gradient-to-b from-blue-50/50 to-transparent border border-blue-100/30">
            <img 
              src="/assets/images/offline-illustration-v2.png" 
              alt="Offline Schedule Illustration" 
              className="w-full h-full object-contain transform scale-110"
            />
          </div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-400/10 blur-[100px] rounded-full -z-10" />
          
          {/* Floating Decorative Elements */}
          <motion.div 
            animate={{ 
              y: [0, -12, 0],
              x: [0, 8, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-blue-100/50 border border-blue-50 z-20"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative z-10" />
              </div>
              <span className="text-sm font-bold text-gray-700">Đã lưu offline</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, 12, 0],
              x: [0, -8, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-10 -left-6 bg-white/90 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl shadow-indigo-100/50 border border-indigo-50 z-20 max-w-[170px]"
          >
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-indigo-400" />
                   <div className="h-1.5 w-12 bg-indigo-100 rounded-full" />
                </div>
                <div className="h-2 w-full bg-indigo-50 rounded-full" />
                <div className="h-2 w-3/4 bg-gray-50 rounded-full" />
                <div className="pt-1 flex justify-between items-center text-[10px] font-bold text-indigo-500">
                   <span>Sync Status</span>
                   <span>100%</span>
                </div>
            </div>
          </motion.div>

          {/* Background Rotating Rings */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-blue-200/40 rounded-full"
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
