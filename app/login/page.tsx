"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/validations/login.validate";
import axiosInstance from "@/lib/axios";
import { useNotification } from "@/context/NotificationContext";
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { addNotification } = useNotification();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      student_id: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axiosInstance.post("/auth/login", values);
        
        addNotification({
          type: 'success',
          message: 'Đăng nhập thành công! Hệ thống đang truy xuất dữ liệu.',
          duration: 3000
        });

        // Redirect to features after a short delay
        setTimeout(() => {
          router.push("/features");
        }, 1000);

      } catch (error: any) {
        let errorMessage = "Đã có lỗi xảy ra khi kết nối tới hệ thống.";
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }

        addNotification({
          type: 'error',
          message: 'Lỗi đăng nhập: ' + errorMessage,
          duration: 5000
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAF9] overflow-hidden">
      {/* Left side - Visual & Branding (Desktop) */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-emerald-600 relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] rounded-full bg-white"
        />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95 origin-left">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-2xl p-2.5">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40} 
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-white italic">
              VLUTE<span className="opacity-80">Sync</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 max-w-lg"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-emerald-100 text-xs font-black uppercase tracking-widest border border-white/10">
              <Sparkles className="h-4 w-4" />
              Sẵn sàng đồng bộ ngay
            </div>
            <h2 className="text-5xl font-black text-white leading-tight">
              Quản lý lịch học <br />
              <span className="text-emerald-300 underline decoration-white/30 underline-offset-8">thông minh hơn.</span>
            </h2>
            <p className="text-emerald-50/70 text-lg font-medium leading-relaxed">
              Trải nghiệm hệ thống tự động hóa thời khóa biểu đầu tiên dành riêng cho sinh viên VLUTE.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 pt-10 border-t border-white/10 flex items-center justify-between">
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="h-10 w-10 rounded-full border-2 border-emerald-600 bg-emerald-100 flex items-center justify-center text-[10px] font-black text-emerald-600">
                 {String.fromCharCode(64 + i)}
               </div>
             ))}
             <div className="h-10 px-4 rounded-full border-2 border-emerald-600 bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs font-black text-white ml-2">
                +1.2k Sinh viên
             </div>
          </div>
          <div className="text-white text-xs font-black opacity-50 uppercase tracking-widest">Version 2.0</div>
        </div>
      </div>

      {/* Right side - Form (Desktop + Mobile) */}
      <div className="w-full lg:w-[55%] flex flex-col relative bg-white">
        {/* Mobile Header Overlay */}
        <div className="lg:hidden absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-20">
           <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 flex items-center justify-center bg-emerald-600 rounded-xl p-1.5 shadow-lg shadow-emerald-200">
                 <Image src="/logo.png" alt="Logo" width={24} height={24} />
              </div>
              <span className="font-black italic text-gray-900">Sync</span>
           </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-10"
          >
            <div className="space-y-3">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Chào mừng! 👋</h1>
              <p className="text-gray-500 font-medium">Nhập tài khoản sinh viên được cấp bởi trường để tiếp tục.</p>
            </div>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="space-y-5">
                <div className="group space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-emerald-600">
                    Mã số sinh viên
                  </label>
                  <div className={`relative flex items-center transition-all ${formik.touched.student_id && formik.errors.student_id ? 'ring-2 ring-red-100' : 'focus-within:ring-4 focus-within:ring-emerald-50'}`}>
                    <div className="absolute left-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                       <Mail className="h-5 w-5" />
                    </div>
                    <input
                      name="student_id"
                      type="text"
                      placeholder="MSSV (VD: 20004123)"
                      className={`w-full bg-gray-50/50 border-2 py-4 pl-12 pr-32 rounded-2xl font-black text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-emerald-500 transition-all ${
                        formik.touched.student_id && formik.errors.student_id ? 'border-red-500' : 'border-gray-100 group-focus-within:border-emerald-500'
                      }`}
                      value={formik.values.student_id}
                      onChange={(e) => formik.setFieldValue("student_id", e.target.value.replace(/[^0-9]/g, ''))}
                      disabled={formik.isSubmitting}
                    />
                    <div className="absolute right-3 px-3 py-1.5 rounded-xl bg-gray-100 text-[10px] font-black text-gray-500 uppercase tracking-tighter">
                       @st.vlute.edu.vn
                    </div>
                  </div>
                  <AnimatePresence>
                    {formik.touched.student_id && formik.errors.student_id && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-[10px] font-black text-red-500 ml-1 uppercase"
                      >
                        {formik.errors.student_id as string}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="group space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-emerald-600">
                    Mật khẩu
                  </label>
                  <div className={`relative flex items-center transition-all ${formik.touched.password && formik.errors.password ? 'ring-2 ring-red-100' : 'focus-within:ring-4 focus-within:ring-emerald-50'}`}>
                    <div className="absolute left-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                       <Lock className="h-5 w-5" />
                    </div>
                    <input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className={`w-full bg-gray-50/50 border-2 py-4 px-12 rounded-2xl font-black text-gray-900 placeholder:text-gray-300 focus:outline-none transition-all ${
                        formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-100 group-focus-within:border-emerald-500'
                      }`}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                  <AnimatePresence>
                    {formik.touched.password && formik.errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-[10px] font-black text-red-500 ml-1 uppercase"
                      >
                        {formik.errors.password as string}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                 <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-gray-200 text-emerald-500 focus:ring-emerald-500 transition-all cursor-pointer" />
                    <span className="text-xs font-black text-gray-500 group-hover:text-gray-900 transition-colors">Ghi nhớ tôi</span>
                 </label>
                 <button type="button" className="text-xs font-black text-emerald-600 hover:text-emerald-700 underline underline-offset-4 decoration-emerald-200">Quên mật khẩu?</button>
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="group relative w-full flex items-center justify-center py-5 px-6 rounded-[1.5rem] bg-gray-900 text-white font-black overflow-hidden transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:bg-gray-200 disabled:scale-100"
              >
                <div className="relative z-10 flex items-center gap-2">
                  {formik.isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Truy cập hệ thống
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
                {!formik.isSubmitting && (
                   <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                )}
              </button>
            </form>

            <div className="pt-8 text-center space-y-6">
               <div className="flex items-center gap-4 text-gray-200">
                  <div className="flex-1 h-px bg-current" />
                  <span className="text-[10px] font-black uppercase text-gray-400">Bảo mật bởi SSL</span>
                  <div className="flex-1 h-px bg-current" />
               </div>
               
               <div className="flex items-center justify-center gap-6">
                 <ShieldCheck className="h-8 w-8 text-emerald-500/20" />
                 <p className="text-[10px] text-gray-400 font-medium max-w-[200px]">
                    Thông tin của bạn được mã hóa và bảo mật tuyệt đối theo tiêu chuẩn AES-256.
                 </p>
               </div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative corner */}
        <div className="hidden lg:block absolute bottom-0 right-0 p-10 opacity-5 grayscale pointer-events-none">
           <Image src="/logo.png" alt="watermark" width={300} height={300} />
        </div>
      </div>
    </div>
  );
}
