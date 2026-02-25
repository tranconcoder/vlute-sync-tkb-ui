"use client";

import Image from "next/image";
import { APP_CONFIG } from "@/configs/app.config";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Brading / Visual (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        {/* Abstract shapes / pattern could go here */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-white opacity-5"></div>

        <div className="relative z-10 flex flex-col h-full justify-center">
          <div className="flex items-center gap-4 mb-12">
            <Image 
              src="/logo.png" 
              alt={`${APP_CONFIG.projectName} Logo`} 
              width={80} 
              height={80}
              className="object-contain shrink-0 drop-shadow-md"
              priority
            />
            <h1 className="text-4xl font-extrabold tracking-tight">{APP_CONFIG.projectName}</h1>
          </div>
          
          <div className="mt-auto items-end flex pb-10">
            <div className="space-y-6 max-w-lg">
              <h2 className="text-4xl font-bold font-sans leading-tight">
                {APP_CONFIG.projectDescription}
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Đồng bộ hóa dữ liệu học tập của bạn nhanh chóng. Đăng nhập để truy cập vào hệ thống.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white text-gray-900 relative z-10">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Header (Hidden on large screens) */}
          <div className="lg:hidden flex flex-col items-center justify-center mb-10 gap-4">
            <Image 
              src="/logo.png" 
              alt={`${APP_CONFIG.projectName} Logo`} 
              width={100} 
              height={100}
              className="object-contain shrink-0 drop-shadow-lg"
              priority
            />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{APP_CONFIG.projectName}</h1>
          </div>

          <div className="text-left space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Đăng nhập</h2>
            <p className="text-gray-600">Vui lòng nhập thông tin để tiếp tục.</p>
          </div>

          <form className="space-y-6 mt-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-900">
                  Email sinh viên
                </label>
                <div className="flex bg-white rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                  <input
                    id="studentId"
                    type="text"
                    placeholder="Nhập mã sinh viên (VD: 200...)"
                    className="w-full px-4 py-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                    required
                  />
                  <div className="flex items-center px-4 bg-gray-50 border-l border-gray-200 text-gray-600 font-medium text-sm whitespace-nowrap">
                    @st.vlute.edu.vn
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
