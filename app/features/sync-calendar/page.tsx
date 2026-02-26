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
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Info,
  LogOut,
  ChevronRight
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
  const [isSyncing, setIsSyncing] = useState(false); // Linking process
  const [isRefreshing, setIsRefreshing] = useState(false); // Sync data process
  const [syncStatus, setSyncStatus] = useState("Sẵn sàng");

  // Notification Toggles
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
    setSyncStatus("Đang đồng bộ môn Hệ thống nhúng...");
    
    toast.promise(new Promise((resolve) => setTimeout(resolve, 3000)), {
      loading: "Đang đồng bộ lịch học...",
      success: () => {
        setSyncStatus("Đã đồng bộ xong");
        setIsRefreshing(false);
        return "Đồng bộ thành công!";
      },
      error: () => {
        setSyncStatus("Đồng bộ thất bại");
        setIsRefreshing(false);
        return "Đồng bộ thất bại.";
      }
    });
  };

  const handleUnlink = () => {
    toast.info("Đang hủy liên kết & xóa dữ liệu...");
    setTimeout(() => {
        setIsSynced(false);
        toast.success("Đã hủy đồng bộ lịch hoàn toàn.");
    }, 1500);
  };

  // Shared Toggle Component
  const CustomToggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <div 
      onClick={onClick}
      className={`relative h-8 w-14 rounded-full transition-all duration-300 flex items-center px-1.5 shrink-0 cursor-pointer shadow-inner ${
        active ? 'bg-emerald-500' : 'bg-gray-200'
      }`}
    >
      <motion.div 
        animate={{ x: active ? 22 : 0 }} 
        className="h-5 w-5 rounded-full bg-white shadow-xl" 
      />
    </div>
  );

  return (
    <div className="max-w-4xl space-y-10 pb-24">
      {/* 1. Section Thông tin (Information Section) */}
      <section className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-xl shadow-gray-200/40 relative overflow-hidden">
        <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                    <Info className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Thông tin tài khoản</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Account & Sync Status</p>
                </div>
            </div>

            {isSynced && user?.google_info ? (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-900 leading-tight">Email liên kết</p>
                                <p className="text-emerald-600 font-bold">{user.google_info.email}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${isRefreshing ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-400'}`}>
                                <RefreshCw className={`h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} />
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-900 leading-tight">Trạng thái đồng bộ</p>
                                <p className={`text-sm font-bold ${isRefreshing ? 'text-emerald-500' : 'text-gray-400'}`}>
                                    {syncStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleLinkGoogle}
                        className="h-14 px-8 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-500 hover:bg-gray-100 hover:border-emerald-300 hover:text-emerald-600 font-black text-sm flex items-center justify-center gap-3 transition-all"
                    >
                        <UserPlus className="h-5 w-5" />
                        Đổi tài khoản khác
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-8 text-center">
                    <div className="relative">
                        <div className="h-28 w-28 rounded-[2.5rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                            <Calendar className="h-12 w-12" />
                        </div>
                        <div className="absolute -right-2 -bottom-2 h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center text-red-500 border border-red-50">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                    </div>
                    
                    <div className="space-y-3 max-w-sm">
                        <h3 className="text-2xl font-black text-gray-900 italic">Bắt đầu đồng bộ</h3>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            Liên kết tài khoản Google để tự động hóa thời khóa biểu lên Google Calendar một cách thông minh.
                        </p>
                    </div>

                    <button 
                        onClick={handleLinkGoogle}
                        disabled={isSyncing}
                        className="group h-16 px-12 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center gap-4 transition-all shadow-2xl shadow-emerald-200 active:scale-95 disabled:opacity-50"
                    >
                        {isSyncing ? (
                            <RefreshCw className="h-6 w-6 animate-spin" />
                        ) : (
                            <>
                                Kết nối Google
                                <ExternalLink className="h-5 w-5 opacity-30 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
        
        {/* Background Decals */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-50/40 blur-[100px] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-50/20 blur-[100px] pointer-events-none" />
      </section>

      {/* Conditional Rendering of bottom sections */}
      <AnimatePresence>
        {isSynced && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-10"
          >
            {/* 2. Section Đồng bộ (Sync Section) */}
            <section className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-sm space-y-8">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                    <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                        <RefreshCw className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Thao tác đồng bộ</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Control Panel</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <button 
                        onClick={handleSyncNow}
                        disabled={isRefreshing}
                        className="group relative h-20 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center justify-center gap-4 transition-all shadow-xl shadow-emerald-200 active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw className={`h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Đồng bộ ngay
                    </button>

                    <button 
                        onClick={handleUnlink}
                        className="h-20 rounded-[2rem] bg-white border-2 border-red-50 text-red-500 hover:bg-red-50 font-black flex items-center justify-center gap-4 transition-all active:scale-95"
                    >
                        <Trash2 className="h-6 w-6" />
                        Hủy đồng bộ & Xóa lịch
                    </button>
                </div>
            </section>

            {/* 3. Section Group Thông báo (Notification Group) */}
            <section className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-sm space-y-10">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center">
                        <Bell className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Cấu hình thông báo</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Smart Alerts</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Toggle: Upcoming Session */}
                    <div className="flex items-center justify-between p-6 rounded-[2.2rem] bg-gray-50/50 border border-gray-100 transition-all hover:bg-white group">
                        <div className="flex items-center gap-5">
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${notifUpcoming ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white text-gray-300 border border-gray-100 shadow-sm'}`}>
                                <Bell className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-black text-gray-900 leading-tight">Nhắc nhở buổi học</p>
                                <p className="text-[11px] font-medium text-gray-400 mt-1 uppercase tracking-tight">Session Reminders</p>
                            </div>
                        </div>
                        <CustomToggle active={notifUpcoming} onClick={() => setNotifUpcoming(!notifUpcoming)} />
                    </div>

                    {/* Toggle: Schedule Changes */}
                    <div className="flex items-center justify-between p-6 rounded-[2.2rem] bg-gray-50/50 border border-gray-100 transition-all hover:bg-white group">
                        <div className="flex items-center gap-5">
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${notifChanges ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white text-gray-300 border border-gray-100 shadow-sm'}`}>
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-black text-gray-900 leading-tight">Cảnh báo thay đổi</p>
                                <p className="text-[11px] font-medium text-gray-400 mt-1 uppercase tracking-tight">Change Notifications</p>
                            </div>
                        </div>
                        <CustomToggle active={notifChanges} onClick={() => setNotifChanges(!notifChanges)} />
                    </div>
                </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Info Card */}
      <div className="flex items-start gap-5 p-8 rounded-[2.5rem] bg-gray-900 text-white shadow-2xl shadow-gray-200 overflow-hidden relative">
          <div className="h-14 w-14 rounded-[1.2rem] bg-emerald-500 flex items-center justify-center text-white shrink-0 relative z-10">
              <ShieldCheck className="h-8 w-8" />
          </div>
          <div className="relative z-10 space-y-1">
              <h5 className="font-black text-lg tracking-tight italic">Công nghệ bảo mật nâng cao</h5>
              <p className="text-white/50 text-xs font-medium leading-relaxed">
                  Toàn bộ quá trình đồng bộ được thực hiện qua mã hóa OAuth2 chuẩn Google. 
                  Chúng tôi cam kết không lưu giữ thông tin cá nhân ngoài tài khoản email trung chuyển.
              </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10">
              <ShieldCheck className="h-48 w-48" />
          </div>
      </div>
    </div>
  );
}

// Helper icons needed
function UserPlus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}
