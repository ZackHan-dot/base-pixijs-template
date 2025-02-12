import { toast } from 'sonner';
import axios from 'axios';
import { clearAuthCache } from './utils';

const isDevelopment = process.env.NODE_ENV === 'development';

// 创建一个 Axios 实例
const http = axios.create({
    baseURL: isDevelopment ? '/' : process.env.REACT_APP_API_BASE_URL,
    timeout: 15000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
http.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        return response.data;
    },
    error => {
        // 对响应错误做些什么
        if (error.response && error.response.status === 401) {
            // 处理未授权错误，例如重定向到登录页面
            clearAuthCache();
            window.location.href = '/auth/login';
            return;
        }
        toast.error(`网络错误：${error.message}`);
        return Promise.reject(error);
    }
);

export default http;
