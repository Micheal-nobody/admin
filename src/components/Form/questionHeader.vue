<template>

    <div class="container">

        <div class="input-container">
            <el-input placeholder="请输入问题" class="question-title" />
            <uploadComponent :file-list="fileList" />
        </div>
        <showImagesComponent :file-list="fileList" />

    </div>

</template>

<script setup>
import { ref, toRef } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'

import uploadComponent from '@/components/fileHandler/uploadFile.vue'
import showImagesComponent from '@/components/fileHandler/previewFile.vue'


// 接受父组件传值
const props = defineProps({
    fileList: {
        type: Array,
        default: () => []
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
.container {
    display: flex;
    flex-direction: column;
}

.input-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
</style>