import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'



//表示路由规则
const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login.vue"),
    },
    {
        path: "/content",
        component: () => import("@/views/Content.vue"),
        meta: { requiresAuth: true },
        children: [
            {
                path: "",
                name: "content",
                //! 我也不知道为什么，但就是用不了相对路径，只能用绝对路径
                redirect: "/content/Home",
            },
            {
                path: "Home",
                name: "home",
                component: () => import("@/components/Home.vue"),
            },
            {
                path: "Form/:id",
                name: "Form",
                component: () => import("@/components/Form/Form.vue"),
            }, {
                path: "Setting",
                name: "设置",
                component: () => import("@/components/Setting.vue"),
            }, {
                path: "test",
                name: "测试",
                component: () => import("@/components/Test.vue"),
            }
        ]
    },
]


//创建路由实例
const router = createRouter({ history: createWebHistory(), routes })

// 全局前置守卫
//TODO: 这里的路由守卫还需要完善，比如验证本地token是否有效（也就是是否登录）
router.beforeEach((to, from, next) => {
    console.log('全局前置守卫')
    // 登录验证
    if (to.meta.requiresAuth) {
        const authStore = useAuthStore()

        if (authStore.isAuthenticated) {
            next()
        } else {
            console.log('未登录，跳转到登录页面')
            next({ name: 'login' })
        }
    }
    else {
        next()
    }
})

//导出路由实例
export default router;
