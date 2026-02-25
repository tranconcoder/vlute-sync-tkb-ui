"use client";

import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Brading / Visual (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        {/* Abstract shapes / pattern could go here */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-white opacity-5"></div>

        <div className="relative z-10 flex flex-col h-full justify-center">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-12 w-12 bg-gray-900 rounded-xl flex items-center justify-center p-2 shrink-0">
              <Image 
                src="/logo.png" 
                alt="Vlute Sync Logo" 
                width={48} 
                height={48}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Vlute Sync</h1>
          </div>
          
          <div className="mt-auto items-end flex pb-10">
            <div className="space-y-6 max-w-lg">
              <h2 className="text-4xl font-bold font-sans leading-tight">
                Quản lý thời khóa biểu thông minh và tiện lợi
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
          <div className="lg:hidden flex flex-col items-center justify-center mb-8 gap-3">
            <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center p-3 shadow-md shrink-0">
              <Image 
                src="/logo.png" 
                alt="Vlute Sync Logo" 
                width={64} 
                height={64}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Vlute Sync</h1>
          </div>

          <div className="text-left space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Đăng nhập</h2>
            <p className="text-gray-600">Vui lòng nhập thông tin để tiếp tục.</p>
          </div>

          <form className="space-y-6 mt-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium tracking-wide">
                  HOẶC TIẾP TỤC VỚI
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-200"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
