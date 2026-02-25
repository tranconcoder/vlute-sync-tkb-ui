"use client";

import { motion } from "framer-motion";
import { WifiOff, Database, CheckCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: 5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 60, damping: 12, delay: 0.4 },
  },
};

export default function OfflineFeature() {
  return (
    <section id="features" className="h-screen w-full flex items-center justify-center bg-white section-snap relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <div className="bg-gradient-to-tr from-blue-500 to-indigo-600 p-1 rounded-[2.5rem] shadow-2xl shadow-blue-200 aspect-square flex items-center justify-center">
            <div className="bg-white w-full h-full rounded-[2.4rem] overflow-hidden flex flex-col items-center justify-center text-center p-8">
              <Database className="w-24 h-24 text-blue-600 mb-6 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-48 bg-gray-100 rounded-full mx-auto" />
                <div className="h-4 w-32 bg-gray-50 rounded-full mx-auto" />
                <div className="mt-8 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm border border-emerald-100">
                  Sẵn sàng ngoại tuyến
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative badges */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute top-[-20px] right-[-20px] bg-white p-4 rounded-2xl shadow-lg border border-gray-50"
          >
            <div className="font-bold text-blue-600">Offline v1.0</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
