"use client";

import { motion } from "framer-motion";
import { Smartphone, Watch, Monitor, Globe, RefreshCw } from "lucide-react";

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 14, delay: 0.2 },
  },
};

export default function CalendarFeature() {
  return (
    <section className="min-h-[100dvh] w-full flex items-center justify-center bg-white text-gray-900 snap-section relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6"
          >
            <Globe className="w-4 h-4" />
            <span>Nền tảng Google Calendar</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-gray-900">
            Xem trên <br />
            <span className="text-emerald-500 font-serif italic focus-within:">Mọi thiết bị</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 leading-relaxed mb-8">
            Dữ liệu được đồng bộ trực tiếp vào tài khoản Google, giúp bạn dễ dàng theo dõi lịch học trên điện thoại, máy tính bảng, đồng hồ thông minh và cả máy tính.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            {[
              { icon: Smartphone, label: "Smartphone" },
              { icon: Watch, label: "Smartwatch" },
              { icon: Monitor, label: "Laptop / Desktop" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold text-gray-700">
                <item.icon className="w-4 h-4 text-emerald-500" />
                {item.label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
           variants={cardVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.1 }}
           className="relative flex items-center justify-center"
        >
          {/* Devices Subject */}
          <div className="relative z-10 w-full max-w-[500px] aspect-square">
            <img 
              src="/assets/images/calendar-sync-v2.png" 
              alt="Device Synchronization" 
              className="w-full h-full object-contain transform scale-125"
            />
          </div>

          {/* Code-based Sync Pulse Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ 
                  opacity: [0, 0.4, 0],
                  scale: [0.3, 1.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-emerald-400/30 rounded-full"
              />
            ))}
          </div>

          {/* Sync Particles/Icons */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/4 right-1/4 p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/50"
            >
              <RefreshCw className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>

          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
