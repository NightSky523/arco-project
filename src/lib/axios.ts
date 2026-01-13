import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { useGlobal } from "@/stores/global";
import { Message } from "@arco-design/web-react";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useGlobal().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    let errorMessage = "请求失败";
    
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        errorMessage = (data as any)?.message || "登录已过期，请重新登录";
        Message.error(errorMessage);
        useGlobal().logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }
      
      if (status === 403) {
        errorMessage = (data as any)?.message || "没有权限访问";
      } else if (status === 500) {
        errorMessage = (data as any)?.message || "服务器错误，请稍后重试";
      } else {
        errorMessage = (data as any)?.message || `请求失败 (${status})`;
      }
    } else if (error.request) {
      errorMessage = "网络错误，请检查网络连接";
    } else {
      errorMessage = error.message || "请求配置错误";
    }
    
    Message.error(errorMessage);
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
