"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const scheduleData = [
  {
    id: 1,
    course: "Phát triển ứng dụng di động",
    time: "07:30 - 11:00",
    room: "A.3.4",
    instructor: "ThS. Nguyễn Văn A",
    type: "Lý thuyết",
    color: "emerald"
  },
  {
    id: 2,
    course: "Công nghệ Web",
    time: "13:30 - 17:00",
    room: "B.2.1",
    instructor: "TS. Trần Thị B",
    type: "Thực hành",
    color: "blue"
  }
];

export default function SchedulePage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Hôm nay, 26 Tháng 2
            </div>
            <h2 className="text-3xl font-black text-gray-900">Lịch học của bạn</h2>
            <p className="text-gray-500 mt-1 font-medium">Bạn có 2 buổi học trong ngày hôm nay.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="h-11 px-6 rounded-2xl bg-white border border-gray-100 font-bold text-sm text-gray-900 shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                Tuần này
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </motion.div>
      </header>

      <div className="grid gap-6">
        {scheduleData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row items-center gap-6 rounded-[2.5rem] bg-white p-6 border border-gray-50 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all cursor-pointer overflow-hidden"
          >
            {/* Side color bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'}`} />

            <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl ${item.color === 'emerald' ? 'bg-emerald-50' : 'bg-blue-50'} transition-transform group-hover:scale-105 group-hover:rotate-2`}>
               <CalendarIcon className={`h-10 w-10 ${item.color === 'emerald' ? 'text-emerald-500' : 'text-blue-500'}`} />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                 <span className={`rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-widest ${item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {item.type}
                 </span>
                 <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    {item.time}
                 </div>
              </div>
              
              <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
                 {item.course}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
                 <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-red-400" />
                    Phòng {item.room}
                 </div>
                 <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    {item.instructor}
                 </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-center gap-2">
               <button className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                  <ChevronRight className="h-6 w-6" />
               </button>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-[2.5rem] bg-emerald-500 p-8 text-white shadow-xl shadow-emerald-200"
        >
           <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                 <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                 <h4 className="text-lg font-black mb-1">Mẹo nhỏ cho bạn</h4>
                 <p className="text-emerald-50 text-sm font-medium leading-relaxed">
                    Bạn có thể nhấn vào từng buổi học để xem chi tiết tài liệu học tập hoặc ghi chú cho buổi đó.
                 </p>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
