<template>

    <div class="container">

        <div class="input-container">
            <el-input placeholder="请输入问题" class="question-title" />
            <!-- 直接传入正确的type名字：question -->
            <uploadComponent :file-list="question.questionAttachments" type="question" :id="question.id" />
        </div>
        <showImagesComponent :file-list="question.questionAttachments" />

    </div>
</template>

<script setup lang="ts">
import { ref, toRef, computed, PropType } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'

import uploadComponent from '@/components/fileHandler/uploadFile.vue'
import showImagesComponent from '@/components/fileHandler/previewFile.vue'

//这是我自定义的File类型
import { File, Question } from '@/models/form'

// 接受父组件传值
const props = defineProps({
    question: {
        type: Object as PropType<Question>,
        required: true,
    },
})


const question = toRef(props, 'question')

const showFileList = () => {
    console.log(question.value.questionAttachments)
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