import { defineStore } from 'pinia'
import api from '@/utils/axios'


// 这是在测试
//TODO: 正式使用时一定要修改isAuthenticated的初始值，否则会导致刷新页面时一直处于未登录状态
export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        refreshToken: null,
        isRefreshing: false,
        isAuthenticated: true
    }),
    actions: {
        // 设置 Token
        setToken(token) {
            this.token = token
            localStorage.setItem('auth_token', token)
        },

        //处理login界面的操作
        async handleLogin(loginData) {
            try {
                const formData = new FormData();
                for (let key in loginData) {
                    formData.append(key, loginData[key]);
                }

                const response = await api.post('/login', formData);

                if (response.status === 200) {
                    api.setToken(response.data.data);
                    this.isAuthenticated = true;
                }

                return response.status;
            } catch (err) {
                return err.response.status;
            }
        },

        // 获取验证
        async getAuthenticated() {
            const token = localStorage.getItem('auth_token')
            if (token) {
                this.setToken(token)
                try {
                    const response = await api.get('/auth/verify')
                    this.isAuthenticated = true
                    return response.data.data
                } catch (error) {
                    this.logout()
                    return null
                }
            }
            return null
        },

        // 刷新 Token（处理并发请求）
        async refreshToken() {
            if (this.isRefreshing) {
                // 如果正在刷新，等待现有 Promise
                return new Promise(resolve => {
                    const interval = setInterval(() => {
                        if (!this.isRefreshing) {
                            clearInterval(interval)
                            resolve(this.token)
                        }
                    }, 100)
                })
            }

            this.isRefreshing = true
            try {
                const { data } = await api.post('/auth/refresh', {
                    refresh_token: this.refreshToken
                })
                this.setToken(data.access_token)
                return data.access_token
            } finally {
                this.isRefreshing = false
            }
        },

        // 登出清理
        logout() {
            this.token = null
            this.refreshToken = null
            localStorage.removeItem('auth_token')
        }
    },

    persist: true // 使用 pinia-plugin-persist 持久化状态
})