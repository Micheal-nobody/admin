<template>

    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <h1>系统登录</h1>
            </div>

            <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginFormRef" label-position="left"
                label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" size="large" placeholder="请输入用户名"
                        prefix-icon="el-icon-user" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" size="large" type="password" show-password
                        placeholder="请输入密码" prefix-icon="el-icon-lock" />
                </el-form-item>

                <el-button class="login-btn" type="primary" size="large" @click="handleLogin">
                    立即登录
                </el-button>

                <div class="login-links">
                    <a href="#" @click.prevent="handleForgetPassword">忘记密码</a>
                    <a href="#" @click.prevent="handleRegister">注册账户</a>
                </div>
            </el-form>
        </div>
    </div>

</template>

<script setup>
//#region 导入依赖
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/utils/axios';

import useLoginForm from '@/Composable/useLoginForm';
import { useAuthStore } from '@/store/auth';
import router from '@/router';
const authStore = useAuthStore();
const { loginForm, rules } = useLoginForm();
const loginFormRef = ref(null);
//#endregion


// 登录处理方法
// !目前只设置了登陆成功的提示信息，后续可以增加更多的功能
const handleLogin = () => {
    loginFormRef.value.validate(async (valid) => {
        if (valid) {
            const isSuccess = await authStore.handleLogin(loginForm.value);

            if (isSuccess === 200) {
                ElMessage.success("登录成功")
                router.push({ name: 'home' });
                
            } else {
                ElMessage.error('用户名或密码错误');
            }



        } else {
            console.log('登录失败');
            ElMessage.error('请输入正确的用户名和密码');
        }
    });
}


// 忘记密码处理方法
const handleForgetPassword = () => {
    ElMessage.info('请联系管理员找回密码');
};

// 注册账户处理方法
const handleRegister = () => {
    ElMessage.info('请访问注册页面完成注册');
};
</script>

<script setup>

</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
}

.login-box {
    width: 100%;
    max-width: 450px;
    padding: 30px 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.login-header h1 {
    font-size: 22px;
    color: #303133;
    margin-bottom: 8px;
}

.login-form {
    .el-form-item {
        margin-bottom: 22px;
    }

    :deep(.el-input) {
        width: 100%;
    }

    :deep(.el-form-item__label) {
        text-align: left;
        padding-right: 8px;
        font-size: 14px;
        line-height: 1.5;
    }

    :deep(.el-input__inner) {
        height: 44px;
        border-radius: 8px;
        font-size: 14px;
    }

    :deep(.el-input__icon) {
        line-height: 44px;
    }
}

.login-btn {
    width: 100%;
    margin-top: 15px;
    font-size: 14px;
    height: 44px;
    letter-spacing: 1px;
}

.login-links {
    margin-top: 15px;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.login-links {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.login-links a {
    color: #409eff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
}

.login-links a:hover {
    color: #66b1ff;
    text-decoration: underline;
}

@media (max-width: 768px) {
    .login-box {
        padding: 25px 15px;
        border-radius: 10px;
    }

    .login-header h1 {
        font-size: 20px;
    }

    .login-form {
        :deep(.el-form-item__label) {
            font-size: 13px;
        }

        :deep(.el-input__inner) {
            height: 40px;
            font-size: 13px;
        }

        :deep(.el-input__icon) {
            font-size: 16px;
        }
    }

    .login-btn {
        height: 42px;
        font-size: 13px;
        margin-top: 10px;
    }

    .login-links {
        margin-top: 12px;
    }
}

@media (max-width: 480px) {
    .login-container {
        padding: 15px;
    }

    .login-header {
        margin-bottom: 25px;
    }

    .login-form .el-form-item {
        margin-bottom: 18px;
    }
}
</style>
