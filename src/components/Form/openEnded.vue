<template>
    <el-card class="main-content">

        <el-input v-model="question.title" placeholder="请输入问题" class="question-title" />
        <el-divider></el-divider>

        <!-- 问题内容 -->
        <div class="question-body">
            <!-- 多行输入框 -->
            <textarea v-model="question.options" placeholder="请在这里回答问题，支持上传图片或文件（未实现）"
                class="input-textarea"></textarea>

            <!-- 图片上传 -->
            <upload-component />
        </div>
    </el-card>

</template>

<script setup>
import { ref, toRef } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'

import uploadComponent from './upload.vue'


// 接受父组件传值
const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})


// 定义数据
const question = toRef(props.question)

// 自定义事件
const emit = defineEmits(['removeQuestion'])


// 计算属性：type转中文
const typeMap = {
    TEXT: '文本题',
    SINGLE_SELECT: '单选题',
    MULTI_SELECT: '多选题',
    SCORE: '评分题'
}

// // 图片，文件上传成功后的处理函数
// function handleSuccess(res, file) {
//     if (file.type.includes('image')) {
//         question.value.images.push(res.data)
//     } else {
//         question.value.files.push(res.data)
//     }
// }

// // 图片，文件上传移除后的处理函数
// function handleRemove(file, fileList) {
//     if (file.type.includes('image')) {
//         const index = question.value.images.indexOf(file)
//         question.value.images.splice(index, 1)
//     } else {
//         const index = question.value.files.indexOf(file)
//         question.value.files.splice(index, 1)
//     }
// }

</script>

<style scoped>
.main-content {
    margin-top: 20px;
    width: 100%;
}

.input-textarea {
    width: 100%;
    height: 100px;
    resize: none;
}
</style>