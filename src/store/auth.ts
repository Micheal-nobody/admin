import { defineStore } from 'pinia'
import api from '@/utils/axios'

interface AuthState {
    token: string | null
    refreshToken: string | null
    isRefreshing: boolean
    isAuthenticated: boolean
}

interface LoginData {
    [key: string]: string
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: null,
        refreshToken: null,
        isRefreshing: false,
        isAuthenticated: false
    }),
    actions: {
        // 设置Token
        setToken(token: string) {
            this.token = token
            localStorage.setItem('auth_token', token)
            this.isAuthenticated = true
        },

        // 设置Refresh Token
        setRefreshToken(refreshToken: string) {
            this.refreshToken = refreshToken
            localStorage.setItem('refresh_token', refreshToken)
        },

        // 登录处理
        async handleLogin(loginData: LoginData) {
            try {
                const formData = new FormData()
                for (const key in loginData) {
                    formData.append(key, loginData[key])
                }

                const response = await api.post('/login', formData)

                if (response.status === 200) {
                    // 假设返回结构为 { access_token, refresh_token }
                    this.setToken(response.data.access_token)
                    this.setRefreshToken(response.data.refresh_token)
                }
                return response.status
            } catch (err: any) {
                return err.response?.status || 500
            }
        },

        // 获取认证状态
        getAuthenticated() {
            const token = localStorage.getItem('auth_token')
            const refreshToken = localStorage.getItem('refresh_token')

            if (token && refreshToken) {
                this.setToken(token)
                this.refreshToken = refreshToken
                this.isAuthenticated = true
            }
        },

        // 刷新Token（解决命名冲突）
        async doRefreshToken() {
            if (this.isRefreshing) {
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
                // 如果需要更新refresh_token
                if (data.refresh_token) {
                    this.setRefreshToken(data.refresh_token)
                }
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
            localStorage.removeItem('refresh_token') // 新增清理
            this.isAuthenticated = false
        }
    },
    
    //如果开启的话会提示 没有于此调用匹配的重载
    // persist: true
})