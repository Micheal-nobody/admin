<template>
    <div class="aside-container">
        <h3 class="sidebar-title">招新管理系统</h3>

        <div class="scroll-wrapper">
            <el-menu :default-active="selectedIndex" @select="selected" class="custom-menu" active-text-color="#409EFF">
                <!-- 主页菜单项 -->
                <el-menu-item index="主页" @click="goToPage('home')" class="menu-item">
                    <el-icon class="menu-icon">
                        <House />
                    </el-icon>
                    <span class="menu-text">主页</span>
                </el-menu-item>

                <!-- 招新子菜单 -->
                <el-sub-menu index="招新" class="sub-menu" popper-class="sub-menu-popper">
                    <template #title>
                        <el-icon class="menu-icon">
                            <Bell />
                        </el-icon>
                        <span class="menu-text">招新管理</span>
                    </template>

                    <div class="form-list">
                        <el-menu-item v-for="(item, index) in forms" :index="String(index)" @click="goToForm(item.id)"
                            class="nested-item">
                            <span class="form-name">{{ item.name }}</span>
                            <el-tag :type="statusConfig[item.status].type" size="small" class="status-tag">
                                {{ statusConfig[item.status].text }}
                            </el-tag>
                        </el-menu-item>
                    </div>

                    <div class="form-creator">
                        <el-menu-item index="form-add" class="input-item">
                            <el-input v-model="newformName" placeholder="新问卷名称" size="small" clearable />
                        </el-menu-item>
                        <el-menu-item index="新增" @click="addForm">
                            <el-button type="primary" size="small" class="create-btn" :disabled="!newformName">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                                创建问卷
                            </el-button>
                        </el-menu-item>
                    </div>
                </el-sub-menu>

                <!-- 设置菜单项 -->
                <el-menu-item @click="goToPage('设置')" class="menu-item">
                    <el-icon class="menu-icon">
                        <component :is="items[1].icon"></component>
                    </el-icon>
                    <span class="menu-text">{{ items[1].name }}</span>
                </el-menu-item>
            </el-menu>
        </div>

    </div>
</template>
<script setup>
import { ref, toRef, watch } from 'vue'
import { defineProps, computed } from 'vue'
import { House, User, Bell, Setting, Plus } from '@element-plus/icons-vue'
import { ElTag } from 'element-plus'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/store/formStore'
const formStore = useFormStore()
const forms = computed(() => formStore.formList)


// 菜单项
const items = [
    { name: '招新', icon: Bell },
    { name: '设置', icon: Setting },
]

const statusConfig = computed(() => ({
    DRAFT: {
        type: 'info',
        text: '草稿',
    },
    SUBMITTED: {

        type: 'primary',
        text: '审核中',
    },
    PASSED: {
        type: 'success',
        text: '通过',
    },
    REJECTED: {
        type: 'danger',
        text: '未通过',
    }
}))


const selectedIndex = ref('主页')
function selected(pageName) {
    selectedIndex.value = pageName
}

//#region 路由跳转
const router = useRouter()
const goToPage = (pageName) => {
    router.push({ name: pageName })
}

const goToForm = (id) => {
    router.push({ name: 'Form', params: { id: id } })
}
//#endregion

const newformName = ref('')
function addForm() {
    formStore.addForm(formStore.currentForm.clubId, newformName.value)
    // newformName.value = ''
}
</script>

<style scoped>
/* .aside-container {
    background: #f8f9fa;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
} */

.sidebar-title {
    padding: 18px 24px;
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
}

.custom-menu {
    border-right: none !important;
    background: transparent;
}

.menu-item {
    height: 48px;
    margin: 4px 8px;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
        background-color: rgba(64, 158, 255, 0.08);
    }
}

.menu-icon {
    width: 20px;
    margin-right: 12px;
    font-size: 18px;
}

.menu-text {
    font-size: 14px;
    font-weight: 500;
}

.sub-menu {
    margin: 8px 0;

}

.form-list {
    padding: 0 8px;
}

.nested-item {
    height: 40px;
    margin: 4px 0;
    font-size: 13px;

    .form-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.status-tag {
    margin-left: 8px;
    font-size: 10px;
    height: 18px;
    line-height: 18px;
}

.form-creator {
    padding: 8px 12px;
    border-top: 1px solid #eee;
    margin-top: 8px;
}

.input-item {
    height: auto !important;
    padding: 4px 0;
}

.create-btn {
    width: 100%;
    justify-content: center;
    letter-spacing: 0.5px;
}

.aside-container {
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.sidebar-title {
    flex: 0 0 64px;
    padding: 18px 24px;
    font-size: 18px;
}

.scroll-wrapper {
    width: inherit;
    height: inherit;
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #c0c4cc transparent;
}

/* 滚动条样式 (Chrome) */
.scroll-wrapper::-webkit-scrollbar {
    width: 6px;
}

.scroll-wrapper::-webkit-scrollbar-track {
    background: rgba(192, 196, 204, 0.1);
}

.scroll-wrapper::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #c0c4cc;
}
</style>