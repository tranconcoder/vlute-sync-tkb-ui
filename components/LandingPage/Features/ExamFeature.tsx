"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, MapPin, ShieldCheck, AlertCircle } from "lucide-react";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 12 },
  },
};

const examData = [
  { subject: "Lập trình Web", date: "15/06/2026", time: "07:30", room: "A1-402", type: "Cuối kỳ" },
];

export default function ExamFeature() {
  return (
    <section className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-50 text-gray-900 snap-section relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 -skew-x-12 transform translate-x-1/4" />
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10"
        >
          <motion.div
            variants={cardVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Xác minh cộng đồng</span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Theo dõi lịch kiểm tra <br />
            <span className="text-primary italic">& Thi giữa kỳ</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
          >
            Quản lý tập trung các bài kiểm tra ngắn, thi giữa kỳ do giảng viên giao trực tiếp - những thông tin thường không có trên hệ thống quản lý của nhà trường.
          </motion.p>

          <motion.div variants={itemVariants} className="space-y-4">
            {[
              { icon: BookOpen, text: "Ghi chú nhanh lịch kiểm tra đột xuất" },
              { icon: Clock, text: "Nhắc nhở thời gian làm bài & phòng thi" },
              { icon: AlertCircle, text: "Xác minh chéo thông tin từ bạn học" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="flex items-center gap-4 text-gray-700 font-medium"
              >
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary border border-gray-100">
                  <item.icon className="w-4 h-4" />
                </div>
                {item.text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual Content - Exam Cards List */}
        <div className="relative flex items-center justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full max-w-md space-y-6"
          >
            {examData.map((exam, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white p-6 rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-white hover:border-emerald-200 transition-all hover:scale-[1.02] group relative overflow-hidden"
              >
                {/* Floating highlight */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full uppercase tracking-wider">
                    {exam.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">{exam.subject}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>{exam.date} • {exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>Phòng: {exam.room}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                        <img 
                          src={`https://i.pravatar.cc/100?u=${i + index}`} 
                          alt={`Student avatar ${i}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-600">
                      +12
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                    Đã xác minh
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Verification Prompt Card (Mock) */}
            <motion.div
              variants={cardVariants}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-primary p-6 rounded-[2rem] text-white shadow-xl shadow-emerald-900/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-bold text-sm">Dành cho bạn</span>
                </div>
                <p className="text-sm opacity-90 mb-6">
                  Bạn &quot;Nguyễn Văn A&quot; vừa thêm lịch thi bù môn An toàn thông tin. Bạn có muốn xác nhận?
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white text-primary py-2 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors">
                    Xác nhận ngay
                  </button>
                  <button className="px-4 bg-white/10 text-white py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors border border-white/20">
                    Tin giả
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
