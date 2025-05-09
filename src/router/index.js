import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { ElMessage } from 'element-plus'



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
                path: "", // 匹配 /content
                name: "content",
                redirect: { name: "home" } // 使用命名路由确保准确性
            },
            {
                path: "Home", // 相对路径，实际路径为 /content/home
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
    const authStore = useAuthStore()

    //TODO:测试阶段，先注释掉
    next()

    // //如果没有登录，则尝试获取本地token
    // if (!authStore.isAuthenticated) {
    //     authStore.getAuthenticated();
    // }


    // // 登录验证
    // if (to.meta.requiresAuth) {
    //     if (authStore.isAuthenticated) {
    //         next()
    //     } else {
    //         ElMessage.error('请先登录')
    //         next({ name: 'login' })
    //     }
    // }
    // else {
    //     next()
    // }
})

//导出路由实例
export default router;
