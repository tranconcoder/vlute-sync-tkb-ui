import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { APP_CONFIG } from "@/configs/app.config";

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface RefreshQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Variable to track refresh state
let isRefreshing = false;
let failedQueue: RefreshQueueItem[] = [];
let refreshRetries = 0;
const MAX_REFRESH_RETRIES = 3;

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<{ metadata?: { code?: string } }>) => {
    const originalRequest = error.config as CustomRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Check if error is 403 and has the special code
    if (
      error.response?.status === 403 &&
      error.response?.data?.metadata?.code === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh");

        // Reset retries on success
        refreshRetries = 0;
        isRefreshing = false;
        processQueue(null);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshRetries++;

        if (refreshRetries < MAX_REFRESH_RETRIES) {
          // Wait a bit and try again
          await new Promise((resolve) => setTimeout(resolve, 1000));
          isRefreshing = false; // Allow retry
          return axiosInstance(originalRequest);
        }

        // Failed after max retries
        isRefreshing = false;
        processQueue(refreshError);
        refreshRetries = 0;

        // Force logout: clear state and redirect
        if (typeof window !== "undefined") {
          window.location.href = "/login?expired=true";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
