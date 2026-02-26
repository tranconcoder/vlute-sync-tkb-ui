"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RefreshCw, 
  Trash2, 
  Bell, 
  AlertTriangle, 
  Settings2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Mail,
  Clock,
  History
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchCurrentUser } from "@/store/slices/userSlice";
import { APP_CONFIG } from "@/configs/app.config";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

export default function SyncCalendarPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  
  const [isSynced, setIsSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // UI Only states for future API integration
  const [reminders, setReminders] = useState([15, 30]); // minutes before
  const [emailNotify, setEmailNotify] = useState(true);

  useEffect(() => {
      setIsSynced(!!user?.google_info);
  }, [user]);

  useEffect(() => {
    const linkingStatus = searchParams.get("linking");
    if (linkingStatus === "success") {
      toast.success("Liên kết Google Calendar thành công!");
      dispatch(fetchCurrentUser());
      router.replace("/features/sync-calendar");
    }
  }, [searchParams, dispatch, router]);

  const handleLinkGoogle = async () => {
    setIsSyncing(true);
    try {
      await axiosInstance.post("/auth/refresh");
      window.location.href = `${APP_CONFIG.apiBaseUrl}/auth/google`;
    } catch (error) {
      console.error("Refresh failed before linking:", error);
      window.location.href = `${APP_CONFIG.apiBaseUrl}/auth/google`;
    }
  };

  const handleSyncNow = async () => {
    setIsRefreshing(true);
    // Simulate API call
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Đang đồng bộ lịch học...",
      success: "Đồng bộ thành công!",
      error: "Đồng bộ thất bại, vui lòng thử lại.",
    });
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const toggleReminder = (time: number) => {
    if (reminders.includes(time)) {
      setReminders(reminders.filter(t => t !== time));
    } else {
      setReminders([...reminders, time]);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Đồng bộ Lịch</h2>
          <p className="text-gray-500 mt-2 font-medium">Quản lý và đồng bộ lịch học của bạn với Google Calendar một cách tự động.</p>
        </div>
        {!isSynced && (
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
            <ShieldCheck className="h-4 w-4" />
            Bảo mật 256-bit
          </div>
        )}
      </header>

      {/* Connection Dashboard */}
      <motion.div 
        layout
        className="relative overflow-hidden rounded-[3rem] bg-white border border-gray-100 p-8 shadow-2xl shadow-gray-200/40 transition-all"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-10">
          <div className="relative h-32 w-32 shrink-0">
             <div className={`absolute inset-0 rounded-[3rem] blur-2xl opacity-20 ${isSynced ? 'bg-emerald-400' : 'bg-blue-400'}`} />
             <div className={`relative h-full w-full rounded-[2.8rem] flex items-center justify-center p-6 border-4 border-white shadow-inner ${isSynced ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-400'}`}>
                <Calendar className="h-14 w-14" />
                {isSynced && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white border-4 border-white shadow-lg"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.div>
                )}
             </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-2">
               <div className="flex items-center gap-3">
                 <h3 className="text-3xl font-black text-gray-900">
                    {isSynced ? "Lịch đang kết nối" : "Google Calendar"}
                 </h3>
                 {isSynced && (
                    <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                 )}
               </div>
               {isSynced && user?.google_info ? (
                 <div className="flex items-center gap-2 group cursor-pointer">
                    <p className="text-lg font-bold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-2xl border border-emerald-100/50">
                      {user.google_info.email}
                    </p>
                 </div>
               ) : (
                 <p className="text-gray-500 font-medium">
                   Kết nối để tự động thêm lịch học của bạn vào điện thoại và nhận thông báo nhắc nhở.
                 </p>
               )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {!isSynced ? (
                <button 
                  onClick={handleLinkGoogle}
                  disabled={isSyncing}
                  className="group relative h-16 px-12 rounded-[2rem] bg-gray-900 hover:bg-black text-white font-black flex items-center gap-4 transition-all shadow-xl shadow-gray-200 disabled:opacity-50 active:scale-95"
                >
                  {isSyncing ? (
                    <RefreshCw className="h-6 w-6 animate-spin text-emerald-400" />
                  ) : (
                    <>
                      Kết nối với Google
                      <ExternalLink className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-6">
                   <button 
                    onClick={handleSyncNow}
                    disabled={isRefreshing}
                    className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black flex items-center gap-3 transition-all shadow-lg shadow-emerald-200 active:scale-95 disabled:opacity-50"
                   >
                     <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                     Đồng bộ ngay
                   </button>
                   <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                      <History className="h-4 w-4" />
                      Vừa xong
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-50/30 blur-[100px]" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-50/20 blur-[100px]" />
      </motion.div>

      <AnimatePresence mode="wait">
        {isSynced ? (
          <motion.div
            key="synced-ui"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Reminders & Notifications */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h4 className="text-xl font-black text-gray-900 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                       <Bell className="h-5 w-5" />
                    </div>
                    Cài đặt nhắc nhở
                  </h4>
               </div>

               <div className="space-y-4">
                  {/* Lesson Reminders */}
                  <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                          <Clock className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="font-black text-gray-900 text-lg">Thông báo buổi học</p>
                          <p className="text-sm font-medium text-gray-400">Chọn thời gian muốn được nhắc trước.</p>
                       </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                       {[10, 15, 30, 60].map((time) => (
                         <button
                           key={time}
                           onClick={() => toggleReminder(time)}
                           className={`h-12 px-6 rounded-2xl font-black text-sm transition-all border ${
                             reminders.includes(time) 
                             ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-100 scale-105' 
                             : 'bg-white text-gray-500 border-gray-100 hover:border-orange-200'
                           }`}
                         >
                           {time < 60 ? `${time} phút` : `${time / 60} giờ`}
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* Email Notifications */}
                  <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                          <Mail className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="font-black text-gray-900 text-lg">Thông báo qua Email</p>
                          <p className="text-sm font-medium text-gray-400">Gửi mail khi lịch có sự thay đổi.</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setEmailNotify(!emailNotify)}
                      className={`relative h-8 w-14 rounded-full transition-colors p-1 ${emailNotify ? 'bg-emerald-500' : 'bg-gray-200'}`}
                    >
                       <motion.div 
                        animate={{ x: emailNotify ? 24 : 0 }}
                        className="h-6 w-6 rounded-full bg-white shadow-sm" 
                       />
                    </button>
                  </div>
               </div>
            </div>

            {/* Account & Advanced Actions */}
            <div className="space-y-6">
              <h4 className="text-xl font-black text-gray-900 flex items-center gap-3">
                 <div className="h-10 w-10 rounded-2xl bg-gray-900 flex items-center justify-center text-white">
                    <Settings2 className="h-5 w-5" />
                 </div>
                 Quản lý đồng bộ
              </h4>

              <div className="bg-gray-50 rounded-[2.5rem] p-4 space-y-4">
                <div className="p-6 rounded-[2rem] bg-white border border-white shadow-sm flex items-start gap-4">
                   <div className="h-12 w-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 shrink-0">
                      <AlertTriangle className="h-6 w-6" />
                   </div>
                   <div>
                      <p className="font-black text-gray-900 leading-tight">Lưu ý xóa lịch</p>
                      <p className="text-xs font-medium text-gray-400 mt-1 leading-relaxed">
                        Mọi buổi học đã được thêm vào Google Calendar sẽ bị xóa hoàn toàn khỏi tài khoản của bạn sau khi hủy đồng bộ.
                      </p>
                   </div>
                </div>

                <div className="grid gap-3">
                   <button 
                    onClick={() => {
                        toast.info("Chức năng đang được phát triển.");
                    }}
                    className="group bg-white hover:bg-gray-100 p-6 rounded-[2rem] border border-white shadow-sm flex items-center justify-between transition-all"
                   >
                      <div className="flex items-center gap-4 font-black text-gray-700">
                        <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gray-900">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        Kiểm tra bảo mật
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                   </button>

                   <button 
                    onClick={() => {
                      // Placeholder for unlink
                      setIsSynced(false);
                      toast.success("Đã hủy đồng bộ lịch thành công.");
                    }}
                    className="group bg-red-50/50 hover:bg-red-50 p-6 rounded-[2rem] border border-red-100 flex items-center justify-between transition-all"
                   >
                      <div className="flex items-center gap-4 font-black text-red-500">
                        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                          <Trash2 className="h-5 w-5" />
                        </div>
                        Hủy đồng bộ & Xóa dữ liệu
                      </div>
                      <ChevronRight className="h-5 w-5 text-red-200 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="un-synced-tips"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: Bell, title: "Không bỏ lỡ", desc: "Tự động gửi thông báo nhắc nhở 15' trước buổi học.", color: "bg-blue-50 text-blue-500" },
              { icon: RefreshCw, title: "Tự động", desc: "Mọi thay đổi từ hệ thống được cập nhật ngay vào lịch của bạn.", color: "bg-emerald-50 text-emerald-500" },
              { icon: ShieldCheck, title: "An toàn", desc: "Dữ liệu được mã hóa và bảo mật tuyệt đối với Google.", color: "bg-purple-50 text-purple-500" }
            ].map((tip, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-gray-100 flex flex-col gap-4 shadow-sm">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${tip.color}`}>
                   <tip.icon className="h-7 w-7" />
                </div>
                <div>
                   <h5 className="font-black text-gray-900 text-lg leading-tight">{tip.title}</h5>
                   <p className="text-gray-400 text-sm font-medium mt-2 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
