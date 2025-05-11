<template>
    <div class="question-body">
        <!-- 多行输入框 -->
        <textarea v-model="question.options" placeholder="请在这里回答问题，支持上传图片或文件（未实现）" class="input-textarea">
            </textarea>
    </div>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'


// 接受父组件传值
const props = defineProps({
    question: {
        type: Object,
        required: true
    }
})


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
.question-body {
    width: inherit;
    height: inherit;
    margin-top: 20px;
}

.input-textarea {
    width: 100%;
    height: 100px;
    resize: none;
}

/* 两端对齐 */
.preview-container {
    display: flex;
    justify-content: space-between;
}
</style>