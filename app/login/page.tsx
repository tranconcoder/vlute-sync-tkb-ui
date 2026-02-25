"use client";

import Image from "next/image";
import { APP_CONFIG } from "@/configs/app.config";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/validations/login.validate";
import axiosInstance from "@/lib/axios";
import { useNotification } from "@/context/NotificationContext";

export default function LoginPage() {
  const { addNotification } = useNotification();

  const formik = useFormik({
    initialValues: {
      studentId: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axiosInstance.post("/auth/login", values);
        console.log("Login Success:", response.data);
        
        addNotification({
          type: 'success',
          message: 'Đăng nhập thành công! Hệ thống đang đồng bộ dữ liệu của bạn.',
          duration: 3000
        });
      } catch (error: unknown) {
        console.error("Login Error:", error);
        let errorMessage = "Đã có lỗi xảy ra khi kết nối tới hệ thống.";
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { data?: { message?: string } } };
          errorMessage = axiosError.response?.data?.message || errorMessage;
        }

        addNotification({
          type: 'error',
          message: `Lỗi đăng nhập: ${errorMessage}`,
          duration: 5000
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

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
              className="object-contain shrink-0 drop-shadow-md h-auto"
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
              className="object-contain shrink-0 drop-shadow-lg h-auto"
              priority
            />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{APP_CONFIG.projectName}</h1>
          </div>

          <div className="text-left space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Đăng nhập</h2>
            <p className="text-gray-600">Vui lòng nhập thông tin để tiếp tục.</p>
          </div>

          <form className="space-y-6 mt-8" onSubmit={formik.handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-900">
                  Email sinh viên
                </label>
                <div 
                  className={`flex bg-white rounded-xl border overflow-hidden focus-within:ring-2 focus-within:border-transparent transition-all ${
                    formik.touched.studentId && formik.errors.studentId 
                      ? "border-red-500 focus-within:ring-red-500" 
                      : "border-gray-200 focus-within:ring-primary"
                  }`}
                >
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    placeholder="Nhập 8 số mã sinh viên"
                    value={formik.values.studentId}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      formik.setFieldValue("studentId", val);
                    }}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none font-medium tracking-wider"
                  />
                  <div className="flex items-center px-4 bg-gray-50 border-l border-gray-200 text-gray-600 font-medium text-sm whitespace-nowrap">
                    @st.vlute.edu.vn
                  </div>
                </div>
                {formik.touched.studentId && formik.errors.studentId && (
                  <p className="text-sm text-red-500 mt-1">{formik.errors.studentId}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 bg-white rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-primary"
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
