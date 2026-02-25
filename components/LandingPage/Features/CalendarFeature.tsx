"use client";

import { motion } from "framer-motion";
import { Smartphone, Watch, Monitor, Globe } from "lucide-react";

export default function CalendarFeature() {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-gray-900 text-white section-snap relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-400 text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            <span>Nền tảng Google Calendar</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Xem trên <br />
            <span className="text-emerald-400 font-serif italic">Mọi thiết bị</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Dữ liệu được đồng bộ trực tiếp vào tài khoản Google, giúp bạn dễ dàng theo dõi lịch học trên điện thoại, máy tính bảng, đồng hồ thông minh và cả máy tính.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Smartphone, label: "Smartphone", color: "text-blue-400", bg: "bg-blue-500/10" },
            { icon: Watch, label: "Smartwatch", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: Monitor, label: "PC / Desktop", color: "text-purple-400", bg: "bg-purple-500/10" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`${item.bg} p-8 rounded-[2rem] border border-white/5 flex flex-col items-center gap-6 transition-all hover:bg-white/10`}
            >
              <item.icon className={`w-12 h-12 ${item.color}`} />
              <span className="font-bold tracking-wide">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute opacity-5 inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white rounded-full scale-125" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white rounded-full scale-110" />
      </div>
    </section>
  );
}
