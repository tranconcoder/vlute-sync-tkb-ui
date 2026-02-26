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
  Calendar
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchCurrentUser } from "@/store/slices/userSlice";
import { APP_CONFIG } from "@/configs/app.config";
import { toast } from "sonner"; // Assuming sonner is used, based on typical premium look or alert UI
import axiosInstance from "@/lib/axios";

export default function SyncCalendarPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  
  const [isSynced, setIsSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (user?.google_info) {
      setIsSynced(true);
    } else {
      setIsSynced(false);
    }
  }, [user]);

  useEffect(() => {
    const linkingStatus = searchParams.get("linking");
    if (linkingStatus === "success") {
      toast.success("Liên kết Google Calendar thành công!");
      dispatch(fetchCurrentUser());
      // Remove query param without refreshing
      router.replace("/features/sync-calendar");
    }
  }, [searchParams, dispatch, router]);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      // Refresh token to ensure session is valid and secrets are rotated before linking
      await axiosInstance.post("/auth/refresh");
      window.location.href = `${APP_CONFIG.apiBaseUrl}/auth/google`;
    } catch (error) {
      console.error("Refresh failed before linking:", error);
      // Fallback: Try redirecting anyway, the backend might still handle it or fail gracefully
      window.location.href = `${APP_CONFIG.apiBaseUrl}/auth/google`;
    }
  };

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <header>
        <h2 className="text-3xl font-black text-gray-900">Đồng bộ Lịch học</h2>
        <p className="text-gray-500 mt-2 font-medium">Kết nối với Google Calendar để nhận thông báo và quản lý lịch học thuận tiện hơn.</p>
      </header>

      {/* Connection Card */}
      <motion.div 
        layout
        className="relative overflow-hidden rounded-[3rem] bg-white border border-gray-100 p-8 shadow-xl shadow-gray-200/50 transition-all"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
          <div className="h-24 w-24 shrink-0 rounded-[2.5rem] bg-emerald-50 flex items-center justify-center p-4">
            <div className="relative">
               <Calendar className="h-12 w-12 text-emerald-500" />
               {isSynced && (
                 <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white border-4 border-white"
                 >
                    <CheckCircle2 className="h-4 w-4" />
                 </motion.div>
               )}
            </div>
          </div>

          <div className="flex-1 space-y-4">
             <div>
                <h3 className="text-2xl font-black text-gray-900">
                  {isSynced ? "Lịch đang hoạt động" : "Chưa kết nối Google Calendar"}
                </h3>
                {isSynced && user?.google_info && (
                  <p className="text-sm font-bold text-emerald-600 bg-emerald-50/50 px-3 py-1 rounded-full w-fit mt-1">
                    {user.google_info.email}
                  </p>
                )}
                <p className="text-gray-500 font-medium mt-2">
                  {isSynced 
                    ? "Lịch học của bạn đang được đồng bộ tự động mỗi khi có thay đổi." 
                    : "Đăng nhập bằng tài khoản Google để bắt đầu đồng bộ lịch học của bạn."}
                </p>
             </div>

             <div className="flex flex-wrap items-center gap-4">
                {!isSynced ? (
                  <button 
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="group relative h-14 px-10 rounded-[1.5rem] bg-emerald-500 hover:bg-emerald-600 text-white font-black flex items-center gap-3 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50"
                  >
                    {isSyncing ? (
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Kết nối Google
                        <ExternalLink className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 font-black text-xs text-emerald-600 uppercase tracking-widest border border-emerald-100">
                    <ShieldCheck className="h-4 w-4" />
                    Đã bảo mật & Liên kết
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-50/50 blur-3xl" />
      </motion.div>

      <AnimatePresence>
        {isSynced && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Sync Controls */}
            <div className="space-y-6">
              <h4 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-emerald-500" />
                Cài đặt đồng bộ
              </h4>
              
              <div className="grid gap-4">
                 {[
                   { icon: Bell, title: "Nhắc nhở học tập", desc: "Thông báo 15p trước khi bắt đầu tiết học.", toggle: true, default: true },
                   { icon: AlertTriangle, title: "Cảnh báo thay đổi", desc: "Thông báo ngay khi phòng hoặc thời gian thay đổi.", toggle: true, default: true },
                 ].map((opt, i) => (
                   <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-white border border-gray-50 shadow-sm">
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500">
                            <opt.icon className="h-6 w-6" />
                         </div>
                         <div>
                            <p className="font-black text-gray-900">{opt.title}</p>
                            <p className="text-xs font-medium text-gray-400 mt-0.5">{opt.desc}</p>
                         </div>
                      </div>
                      <div className="h-6 w-12 rounded-full bg-emerald-500 p-1 flex justify-end cursor-pointer">
                         <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-6">
              <h4 className="text-lg font-black text-gray-900">Quản lý nâng cao</h4>
              <div className="flex flex-col gap-4">
                 <button className="group flex items-center justify-between p-6 rounded-[2rem] bg-white border border-gray-50 shadow-sm hover:border-emerald-200 transition-all">
                    <div className="flex items-center gap-4 text-emerald-600 font-black">
                       <RefreshCw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                       Đồng bộ lại toàn bộ
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                 </button>

                 <button 
                  onClick={() => {
                    // In real app, call API to unlink
                    setIsSynced(false);
                  }}
                  className="group flex items-center justify-between p-6 rounded-[2rem] bg-red-50/30 border border-red-50 hover:bg-red-50 transition-all"
                 >
                    <div className="flex items-center gap-4 text-red-500 font-black">
                       <Trash2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
                       Hủy đồng bộ & Xóa lịch
                    </div>
                    <ChevronRight className="h-5 w-5 text-red-200 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
              
              <div className="p-6 rounded-[2.5rem] bg-gray-900 text-white flex items-center gap-4 shadow-xl">
                 <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                 </div>
                 <p className="text-xs font-medium leading-relaxed">
                    Mọi thay đổi của bạn sẽ được lưu tự động. Đồng bộ có thể mất 1-2 phút để hiển thị trên thiết bị của bạn.
                 </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
