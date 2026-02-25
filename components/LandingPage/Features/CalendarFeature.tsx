"use client";

import { motion } from "framer-motion";
import { Smartphone, Watch, Monitor, Globe } from "lucide-react";

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
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function CalendarFeature() {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-gray-900 text-white section-snap relative overflow-hidden">
      <motion.div 
        className="container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-3xl mx-auto mb-20">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-400 text-sm font-medium mb-6"
          >
            <Globe className="w-4 h-4" />
            <span>Nền tảng Google Calendar</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Xem trên <br />
            <span className="text-emerald-400 font-serif italic">Mọi thiết bị</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Dữ liệu được đồng bộ trực tiếp vào tài khoản Google, giúp bạn dễ dàng theo dõi lịch học trên điện thoại, máy tính bảng, đồng hồ thông minh và cả máy tính.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Smartphone, label: "Smartphone", color: "text-blue-400", bg: "bg-blue-500/10" },
            { icon: Watch, label: "Smartwatch", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: Monitor, label: "PC / Desktop", color: "text-purple-400", bg: "bg-purple-500/10" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className={`${item.bg} p-8 rounded-[2rem] border border-white/5 flex flex-col items-center gap-6 transition-all`}
            >
              <item.icon className={`w-12 h-12 ${item.color}`} />
              <span className="font-bold tracking-wide">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Background decoration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.05, scale: 1.2 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white rounded-full scale-125" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white rounded-full scale-110" />
      </motion.div>
    </section>
  );
}
