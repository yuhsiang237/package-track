// src/api/index.ts
import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// -------------------------
// Axios 實例設定
// -------------------------
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://example.com/api",
  timeout: 10000,
});

// -------------------------
// 請求攔截器
// -------------------------
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ✅ 自動帶入 Token（如果存在）
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 其他通用設定（例如 content-type）
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    console.error("[Request Error]", error);
    return Promise.reject(error);
  },
);

// -------------------------
// 回應攔截器
// -------------------------
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res = response.data;

    // 可根據後端通用結構統一處理
    if (res && typeof res === "object" && "success" in res && !res.success) {
      console.warn("[API Warning]", res.message || "Unknown API error");
    }

    return res;
  },
  async (error) => {
    // 🔁 Token 過期處理範例（401）
    if (error.response?.status === 401) {
      console.warn("[Auth] Token expired, please re-login.");

      // 這裡可以加上 refresh token 流程
      // const newToken = await refreshToken();
      // localStorage.setItem("token", newToken);
      // retry original request...

      // 目前先清除登入狀態：
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    console.error("[Response Error]", error);
    return Promise.reject(error);
  },
);

export default service;
