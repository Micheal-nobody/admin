import axios from 'axios'
import { useAuthStore } from '@/store/auth'

// 创建 Axios 实例
const api = axios.create({
    baseURL: "http://localhost:9090",    // 请求的基础路径
    timeout: 10000,                      // 请求超时时间
    withCredentials: true               // 允许携带 cookie
})

api.setToken = (token) => {
    useAuthStore().setToken(token)
    api.defaults.headers.common['token'] = `${token}`
}

// 请求拦截器：自动添加 Token
api.interceptors.request.use(config => {
    const { token } = useAuthStore();
    if (token) {
        config.headers.token = `${token}`
    }
    return config
})

// 响应拦截器：处理错误
api.interceptors.response.use(
    response => response,
    error => {
        console.log(error.response)
        if (error.response.status === 401) { 
            useAuthStore().logout()
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)



// 响应拦截器：处理 Token 过期
// api.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config
//         const authStore = useAuthStore()

//         // 检测 401 错误且未重试过
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true // 标记重试

//             try {
//                 // 尝试刷新 Token
//                 const newToken = await authStore.refreshToken()
//                 // 更新请求头并重试
//                 originalRequest.headers.Authorization = `Bearer ${newToken}`
//                 return api(originalRequest)
//             } catch (refreshError) {
//                 // 刷新失败则登出
//                 authStore.logout()
//                 window.location.href = '/login'
//                 return Promise.reject(refreshError)
//             }
//         }

//         return Promise.reject(error)
//     }
// )

export default api

