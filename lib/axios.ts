import axios from "axios";
import { APP_CONFIG } from "@/configs/app.config";

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
