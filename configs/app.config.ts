import { EnvUtil } from "@/lib/env";

export const APP_CONFIG = {
  // App
  projectName: "Vlute Sync",
  projectDescription: "Quản lý thời khóa biểu thông minh và tiện lợi",

  // Api
  apiBaseUrl: EnvUtil.getEnv(
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:3000",
  ),
};
