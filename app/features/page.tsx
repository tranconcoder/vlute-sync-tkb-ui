"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  CalendarDays,
  CalendarRange,
  CalendarSearch
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

const viewModes = [
  { id: "day", name: "Ngày", icon: CalendarIcon },
  { id: "week", name: "Tuần", icon: CalendarRange },
  { id: "month", name: "Tháng", icon: CalendarDays },
];

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState("day");

  return (
    <div className="max-w-4xl pb-10">
      <header className="mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {viewMode === "day" ? "Hôm nay, 26 Tháng 2" : viewMode === "week" ? "Tuần này" : "Tháng 2, 2026"}
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              {viewMode === "day" ? "Lịch học của bạn" : viewMode === "week" ? "Tiến độ tuần" : "Lịch trình tháng"}
            </h2>
            <p className="text-gray-500 mt-1 font-medium">
              {viewMode === "day" ? "Bạn có 2 buổi học trong ngày hôm nay." : "Xem chi tiết kế hoạch học tập của bạn."}
            </p>
          </div>
          
          <div className="flex items-center bg-gray-100/50 p-1.5 rounded-[1.5rem] border border-gray-100 shadow-inner">
            {viewModes.map((mode) => {
              const isActive = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${
                    isActive ? "text-white" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <mode.icon className="h-4 w-4" />
                  <span className="relative z-10">{mode.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="view-mode-active"
                      className="absolute inset-0 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-200"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {viewMode === "day" && (
            <div className="grid gap-6">
              {scheduleData.map((item, index) => (
                <DayCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}

          {viewMode === "week" && (
            <div className="grid gap-4">
               {/* Simplified Week Grid */}
               <div className="grid grid-cols-7 gap-2 mb-6">
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d, i) => (
                    <div key={i} className={`flex flex-col items-center gap-2 p-4 rounded-3xl border transition-all ${i === 3 ? 'bg-emerald-500 text-white border-emerald-500 shadow-xl shadow-emerald-100' : 'bg-white border-gray-100 text-gray-400'}`}>
                       <span className="text-[10px] font-black uppercase">{d}</span>
                       <span className="text-lg font-black">{23 + i}</span>
                    </div>
                  ))}
               </div>
               <div className="space-y-4">
                  <h4 className="text-lg font-black text-gray-900 mb-4">Lịch trình chi tiết</h4>
                  {scheduleData.map((item, index) => (
                    <DayCard key={item.id} item={item} index={index} compact />
                  ))}
               </div>
            </div>
          )}

          {viewMode === "month" && (
            <div className="bg-white rounded-[3rem] p-8 border border-gray-50 shadow-xl shadow-gray-100">
               <div className="grid grid-cols-7 gap-2">
                  {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
                    <div key={d} className="text-center text-[10px] font-black text-gray-400 py-4 uppercase tracking-widest">{d}</div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div key={i} className={`aspect-square flex flex-col items-center justify-center rounded-2xl transition-all cursor-pointer border ${i + 1 === 26 ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' : 'bg-gray-50/50 border-transparent hover:border-emerald-200 hover:bg-white text-gray-600'}`}>
                       <span className="text-sm font-black">{i + 1}</span>
                       {(i + 1 === 26 || i + 1 === 28) && (
                         <div className={`h-1.5 w-1.5 rounded-full mt-1 ${i + 1 === 26 ? 'bg-white' : 'bg-emerald-500'}`} />
                       )}
                    </div>
                  ))}
               </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 rounded-[2.5rem] bg-emerald-500 p-8 text-white shadow-xl shadow-emerald-200"
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
  );
}

function DayCard({ item, index, compact = false }: { item: any, index: number, compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group relative flex flex-col md:flex-row items-center gap-6 rounded-[2.5rem] bg-white border border-gray-50 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all cursor-pointer overflow-hidden ${compact ? 'p-5' : 'p-6'}`}
    >
      {/* Side color bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-2 ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'}`} />

      <div className={`flex shrink-0 items-center justify-center rounded-3xl ${item.color === 'emerald' ? 'bg-emerald-50' : 'bg-blue-50'} transition-transform group-hover:scale-105 group-hover:rotate-2 ${compact ? 'h-16 w-16' : 'h-20 w-20'}`}>
         <CalendarIcon className={`${compact ? 'h-8 w-8' : 'h-10 w-10'} ${item.color === 'emerald' ? 'text-emerald-500' : 'text-blue-500'}`} />
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
        
        <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-black text-gray-900 group-hover:text-emerald-600 transition-colors`}>
           {item.course}
        </h3>

        {!compact && (
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
        )}
      </div>

      <div className="hidden lg:flex flex-col items-center gap-2">
         <button className={`rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm ${compact ? 'h-10 w-10' : 'h-12 w-12'}`}>
            <ChevronRight className={compact ? 'h-5 w-5' : 'h-6 w-6'} />
         </button>
      </div>
    </motion.div>
  );
}
