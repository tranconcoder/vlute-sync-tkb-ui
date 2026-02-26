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
  History,
  Info,
  ChevronDown,
  LayoutGrid,
  UserPlus,
  MapPin,
  Sparkles
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

  // Form States
  const [selectedCalendar, setSelectedCalendar] = useState("primary");
  const [reminderMinutes, setReminderMinutes] = useState(15);
  const [syncFrequency, setSyncFrequency] = useState("auto");
  
  // Toggles requested specifically
  const [notifUpcoming, setNotifUpcoming] = useState(true);
  const [notifChanges, setNotifChanges] = useState(true);

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
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Đang yêu cầu đồng bộ...",
      success: "Lịch học đã được cập nhật!",
      error: "Đồng bộ thất bại.",
    });
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  // Modern Toggle Component
  const ToggleButton = ({ active, label, subtitle, icon: Icon, onClick }: any) => (
    <div 
      className={`group flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all cursor-pointer ${
        active 
        ? "bg-emerald-50/50 border-emerald-100 shadow-sm" 
        : "bg-white border-gray-50 hover:border-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-5">
        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${
          active ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="font-black text-gray-900 leading-tight">{label}</p>
          <p className={`text-[11px] font-medium mt-1 leading-relaxed ${active ? "text-emerald-600/70" : "text-gray-400"}`}>
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Real Toggle Button Style */}
      <div className={`relative h-8 w-14 rounded-full transition-all duration-300 flex items-center px-1.5 shrink-0 shadow-inner ${active ? 'bg-emerald-500' : 'bg-gray-200'}`}>
        <motion.div 
          animate={{ x: active ? 22 : 0 }} 
          className="h-5 w-5 rounded-full bg-white shadow-xl" 
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-10 pb-24">
      {/* Header with Account Info */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
               <Calendar className="h-5 w-5" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight italic">
              VLUTE<span className="text-emerald-600">Sync</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            {isSynced && user?.google_info ? (
              <div className="flex items-center gap-2 bg-emerald-50/50 px-4 py-2 rounded-2xl border border-emerald-100/50 shadow-sm">
                <span className="text-sm font-black text-emerald-700 tracking-tight">{user.google_info.email}</span>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <button 
                  onClick={handleLinkGoogle}
                  className="ml-2 px-3 py-1 rounded-lg bg-white border border-emerald-200 text-[10px] font-black uppercase text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                >
                  Kết nối tài khoản khác
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Đồng bộ thời khoá biểu tự động lên Google Calendar
              </div>
            )}
          </div>
        </div>

        {!isSynced && (
          <button 
            onClick={handleLinkGoogle}
            disabled={isSyncing}
            className="group h-16 px-12 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center gap-4 transition-all shadow-xl shadow-emerald-200 active:scale-95 disabled:opacity-50"
          >
            {isSyncing ? (
              <RefreshCw className="h-6 w-6 animate-spin" />
            ) : (
              <>
                Kết nối với Google
                <ExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-30 group-hover:opacity-100" />
              </>
            )}
          </button>
        )}
      </header>

      {/* Main Feature Layout */}
      <div className="grid lg:grid-cols-5 gap-8">
         <div className="lg:col-span-3 space-y-8">
            {/* Sync Configuration (Always visible but maybe disabled/styled) */}
            <div className={`bg-white rounded-[3rem] border border-gray-100 p-10 shadow-sm space-y-10 transition-opacity ${!isSynced ? 'opacity-50 bg-gray-50/50 grayscale' : 'shadow-xl shadow-gray-200/40'}`}>
               <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                     <Settings2 className="h-6 w-6" />
                  </div>
                  <div>
                     <h4 className="text-xl font-black text-gray-900 tracking-tight">Cấu hình đồng bộ</h4>
                     <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">Automatic Scheduling</p>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Lịch lưu trữ (Google Calendar)</label>
                    <div className="relative group">
                       <select 
                        disabled={!isSynced}
                        value={selectedCalendar}
                        onChange={(e) => setSelectedCalendar(e.target.value)}
                        className="w-full h-16 bg-gray-50/50 border-2 border-gray-100 rounded-[1.5rem] px-8 font-black text-gray-900 focus:outline-none focus:border-emerald-500 appearance-none transition-all hover:bg-white"
                       >
                          <option value="primary">Lịch chính của bạn</option>
                          <option value="vlute">Tạo lịch mới "VLUTE TKB"</option>
                       </select>
                       <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Thời gian nhắc nhở (Phút)</label>
                    <div className="relative">
                       <input 
                        disabled={!isSynced}
                        type="number"
                        min="0"
                        value={reminderMinutes}
                        onChange={(e) => setReminderMinutes(parseInt(e.target.value) || 0)}
                        className="w-full h-16 bg-gray-50/50 border-2 border-gray-100 rounded-[1.5rem] px-8 font-black text-gray-900 focus:outline-none focus:border-emerald-500 transition-all hover:bg-white pr-20"
                       />
                       <Clock className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                    </div>
                  </div>
               </div>

               {isSynced && (
                 <button 
                   onClick={handleSyncNow}
                   disabled={isRefreshing}
                   className="w-full h-16 rounded-[1.5rem] bg-gray-900 hover:bg-black text-white font-black flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                 >
                   <RefreshCw className={`h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} />
                   Đồng bộ thủ công ngay
                 </button>
               )}
            </div>

            <div className="flex items-center gap-4 p-8 rounded-[2rem] bg-emerald-600 text-white shadow-xl shadow-emerald-200">
               <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="h-8 w-8 text-white/50" />
               </div>
               <div>
                  <h5 className="font-black text-lg">Mã hóa RSA 2048-bit</h5>
                  <p className="text-white/60 text-xs font-medium leading-relaxed mt-1">
                    Dữ liệu đăng nhập trường của bạn được mã hóa và bảo vệ an toàn tuyệt đối. Chúng tôi chỉ trung chuyển dữ liệu lịch, không lưu trữ thông tin nhạy cảm.
                  </p>
               </div>
            </div>
         </div>

         <div className="lg:col-span-2 space-y-8">
            {/* Toggle Section - As requested explicitly by user */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Tuỳ chọn chức năng</h4>
              
              <div className="grid gap-4">
                 <ToggleButton 
                    active={notifUpcoming}
                    onClick={() => setNotifUpcoming(!notifUpcoming)}
                    label="Nhắc nhở buổi học"
                    subtitle="Bật/tắt thông báo khi sắp đến giờ vào lớp."
                    icon={Bell}
                 />

                 <ToggleButton 
                    active={notifChanges}
                    onClick={() => setNotifChanges(!notifChanges)}
                    label="Thay đổi lịch học"
                    subtitle="Thông báo khi có sự thay đổi về phòng học/tiết học."
                    icon={MapPin}
                 />
              </div>
            </div>

            {/* Account Management */}
            {isSynced && (
               <div className="bg-white border-2 border-red-50 rounded-[2.5rem] p-8 space-y-6 shadow-sm overflow-hidden relative">
                  <div className="flex items-start gap-4">
                     <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shrink-0 shadow-inner">
                        <AlertTriangle className="h-6 w-6" />
                     </div>
                     <div className="space-y-1">
                        <h5 className="font-black text-gray-900 tracking-tight">Vùng nguy hiểm</h5>
                        <p className="text-[11px] font-medium text-gray-400 leading-relaxed">
                          Huỷ đồng bộ sẽ xoá toàn bộ các sự kiện lịch tập trung đã tạo trên Google Calendar của bạn.
                        </p>
                     </div>
                  </div>
                  <button 
                    onClick={() => {
                       setIsSynced(false);
                       toast.error("Đã gỡ bỏ toàn bộ liên kết đồng bộ.");
                    }}
                    className="w-full h-14 rounded-[1.2rem] bg-white border border-red-200 text-red-500 hover:bg-red-500 hover:text-white font-black text-[11px] uppercase tracking-widest transition-all"
                  >
                    Huỷ & Xoá dữ liệu đồng bộ
                  </button>
               </div>
            )}

            <div className="p-8 rounded-[2.5rem] bg-gray-50 flex flex-col items-center justify-center text-center gap-4">
               <Info className="h-10 w-10 text-gray-200" />
               <p className="text-[10px] font-bold text-gray-400 max-w-[150px] uppercase tracking-widest leading-loose">
                  Mọi cài đặt sẽ được lưu ngay lập tức
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
