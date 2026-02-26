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
  MapPin
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
  const [upcomingReminders, setUpcomingReminders] = useState(true);
  const [changeNotifications, setChangeNotifications] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState("auto");

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

  return (
    <div className="max-w-4xl space-y-10 pb-24">
      {/* Header with Account Info */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Đồng bộ Lịch</h2>
          <div className="flex items-center gap-3">
            {isSynced && user?.google_info ? (
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 shadow-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-black text-emerald-700">{user.google_info.email}</span>
                <button 
                  onClick={handleLinkGoogle}
                  className="ml-2 p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-600 transition-colors flex items-center gap-1.5 border border-emerald-200"
                  title="Liên kết tài khoản khác"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-black uppercase">Đổi tài khoản</span>
                </button>
              </div>
            ) : (
              <p className="text-gray-500 font-medium">Kết nối với Google Calendar để bắt đầu.</p>
            )}
          </div>
        </div>

        {!isSynced && (
          <button 
            onClick={handleLinkGoogle}
            disabled={isSyncing}
            className="h-16 px-10 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center gap-4 transition-all shadow-xl shadow-emerald-200 active:scale-95 disabled:opacity-50"
          >
            {isSyncing ? (
              <RefreshCw className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <Calendar className="h-6 w-6" />
                Liên kết Google
                <ExternalLink className="h-5 w-5 opacity-50" />
              </>
            )}
          </button>
        )}
      </header>

      {/* Hero Action Section (If Synced) */}
      {isSynced && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[3rem] bg-gray-900 p-10 text-white shadow-2xl shadow-gray-300"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="space-y-4 max-w-md">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-white/5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Trạng thái: Hoạt động
               </div>
               <h3 className="text-3xl font-black leading-tight">Đồng bộ tự động</h3>
               <p className="text-white/60 font-medium leading-relaxed">
                 Hệ thống sẽ tự động cập nhật lịch học từ VLUTE-TKB lên Google Calendar mỗi khi phát hiện thay đổi.
               </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleSyncNow}
                disabled={isRefreshing}
                className="h-16 px-10 rounded-[2rem] bg-emerald-500 hover:bg-emerald-600 text-white font-black flex items-center justify-center gap-4 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} />
                Làm mới ngay
              </button>
              <p className="text-center text-[10px] font-black text-white/30 uppercase tracking-tighter">Vừa cập nhật xong</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        </motion.div>
      )}

      {/* Configuration Section */}
      <AnimatePresence mode="wait">
        {isSynced ? (
          <motion.div
            key="config"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-5 gap-8"
          >
            {/* Form Controls */}
            <div className="lg:col-span-3 space-y-8">
               <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm space-y-10">
                  <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                     <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Settings2 className="h-6 w-6" />
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-gray-900">Thiết lập chung</h4>
                        <p className="text-xs font-medium text-gray-400 mt-1">Cấu hình cách thức hoạt động của lịch.</p>
                     </div>
                  </div>

                  {/* Calendar Selection Dropdown */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Lịch đích (Google Calendar)</label>
                    <div className="relative group">
                       <select 
                        value={selectedCalendar}
                        onChange={(e) => setSelectedCalendar(e.target.value)}
                        className="w-full h-16 bg-gray-50/50 border-2 border-gray-100 rounded-3xl px-8 font-black text-gray-900 focus:outline-none focus:border-emerald-500 appearance-none transition-all hover:bg-white"
                       >
                          <option value="primary">Lịch chính (Mặc định)</option>
                          <option value="vlute">Lịch VLUTE-TKB (Tạo mới)</option>
                       </select>
                       <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-emerald-500" />
                    </div>
                  </div>

                  {/* Reminder Numeric Input */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Thời gian nhắc trước (Phút)</label>
                    <div className="relative flex items-center">
                       <input 
                        type="number"
                        min="0"
                        value={reminderMinutes}
                        onChange={(e) => setReminderMinutes(parseInt(e.target.value) || 0)}
                        className="w-full h-16 bg-gray-50/50 border-2 border-gray-100 rounded-3xl px-8 font-black text-gray-900 focus:outline-none focus:border-emerald-500 transition-all hover:bg-white"
                       />
                       <Clock className="absolute right-8 h-5 w-5 text-gray-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* Sync Frequency Dropdown */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tần suất đồng bộ</label>
                    <div className="relative group">
                       <select 
                        value={syncFrequency}
                        onChange={(e) => setSyncFrequency(e.target.value)}
                        className="w-full h-16 bg-gray-50/50 border-2 border-gray-100 rounded-3xl px-8 font-black text-gray-900 focus:outline-none focus:border-emerald-500 appearance-none transition-all hover:bg-white"
                       >
                          <option value="auto">Tự động (Real-time)</option>
                          <option value="15m">Mỗi 15 phút</option>
                          <option value="1h">Mỗi 1 giờ</option>
                       </select>
                       <LayoutGrid className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-emerald-500" />
                    </div>
                  </div>
               </div>
            </div>

            {/* Sidebar Controls - Toggles requested by user */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-8">
                  <h4 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-4">Tuỳ chọn thông báo</h4>
                  
                  <div className="space-y-6">
                    {/* Toggle: Upcoming Reminders */}
                    <div 
                      className="flex items-start justify-between cursor-pointer py-2 group" 
                      onClick={() => setUpcomingReminders(!upcomingReminders)}
                    >
                       <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${upcomingReminders ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'bg-gray-50 text-gray-300'}`}>
                             <Bell className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-black text-sm text-gray-700 leading-tight">Nhắc nhở buổi học</p>
                            <p className="text-[10px] font-medium text-gray-400 mt-1">Sắp có buổi học</p>
                          </div>
                       </div>
                       <div className={`relative h-7 w-12 rounded-full transition-all duration-300 flex items-center px-1 shrink-0 ${upcomingReminders ? 'bg-emerald-500 shadow-lg shadow-emerald-100' : 'bg-gray-200'}`}>
                          <motion.div animate={{ x: upcomingReminders ? 20 : 0 }} className="h-5 w-5 rounded-full bg-white shadow-sm" />
                       </div>
                    </div>

                    {/* Toggle: Change Notifications */}
                    <div 
                      className="flex items-start justify-between cursor-pointer py-2 group" 
                      onClick={() => setChangeNotifications(!changeNotifications)}
                    >
                       <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${changeNotifications ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'bg-gray-50 text-gray-300'}`}>
                             <MapPin className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-black text-sm text-gray-700 leading-tight">Thay đổi lịch học</p>
                            <p className="text-[10px] font-medium text-gray-400 mt-1">Đổi phòng, đổi thời gian</p>
                          </div>
                       </div>
                       <div className={`relative h-7 w-12 rounded-full transition-all duration-300 flex items-center px-1 shrink-0 ${changeNotifications ? 'bg-emerald-500 shadow-lg shadow-emerald-100' : 'bg-gray-200'}`}>
                          <motion.div animate={{ x: changeNotifications ? 20 : 0 }} className="h-5 w-5 rounded-full bg-white shadow-sm" />
                       </div>
                    </div>
                  </div>
               </div>

               {/* Danger Zone */}
               <div className="bg-red-50/30 rounded-[2.5rem] border border-red-100/50 p-8 space-y-6">
                  <div className="flex items-center gap-3 text-red-600">
                     <AlertTriangle className="h-5 w-5" />
                     <h4 className="text-lg font-black tracking-tight">Hủy dịch vụ</h4>
                  </div>
                  <button 
                    onClick={() => {
                        setIsSynced(false);
                        toast.error("Đã ngắt kết nối.");
                    }}
                    className="w-full h-14 rounded-2xl bg-white border-2 border-red-100 text-red-500 hover:bg-red-50 font-black text-xs flex items-center justify-center gap-3 transition-all shadow-sm active:scale-95"
                  >
                    <Trash2 className="h-5 w-5" />
                    Dừng đồng bộ & Xóa lịch
                  </button>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unlinked"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-8 text-center bg-white rounded-[3rem] border border-gray-100 shadow-sm space-y-8"
          >
             <div className="h-28 w-28 rounded-[2.5rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                <Calendar className="h-14 w-14" />
             </div>
             <div className="space-y-3 max-w-sm">
                <h3 className="text-2xl font-black text-gray-900">Kết nối ngay</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Đưa toàn bộ lịch học của bạn lên điện thoại chỉ với một lần nhấn.
                </p>
             </div>
             <button 
                onClick={handleLinkGoogle}
                disabled={isSyncing}
                className="h-16 px-12 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center gap-4 transition-all shadow-2xl shadow-emerald-200"
              >
                {isSyncing ? (
                  <RefreshCw className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    Liên kết với Google
                    <ExternalLink className="h-5 w-5 opacity-50" />
                  </>
                )}
              </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 p-6 rounded-3xl bg-blue-50/50 border border-blue-100/50 text-blue-600">
         <Info className="h-5 w-5 shrink-0" />
         <p className="text-[11px] font-bold leading-relaxed">
           Hệ thống sử dụng OAuth2 để truy cập an toàn. Chúng tôi không bao giờ lưu trữ mật khẩu Google của bạn.
         </p>
      </div>
    </div>
  );
}
