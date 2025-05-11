<template>

    <!-- <button @click="showFileList()">show fileList</button> -->
    <el-upload class="upload-demo" action="http://localhost:9090/api/file/upload" :headers="headers" :data="data"
        v-model="UploadUserFileList" :multiple="true" :show-file-list="false" list-type="picture" :limit="5"
        :before-upload="beforeUpload" :on-success="onSuccess" :on-error="onError">

        <!-- 使用DocumentAdd图标 -->
        <el-button type="primary">
            <el-icon>
                <DocumentAdd />
            </el-icon>
        </el-button>

    </el-upload>

</template>


<script setup lang="ts">
import { reactive, ref, PropType } from 'vue'
import { toRef, defineProps, defineEmits } from 'vue'
import { ElUpload } from 'element-plus'
import { DocumentAdd, Upload } from '@element-plus/icons-vue'
const emits = defineEmits(['success', 'error'])

import { UploadUserFile } from 'element-plus'
import { File } from '@/models/form'
import { id } from 'element-plus/es/locale'

const props = defineProps({
    fileList: {
        type: Array as PropType<File[]>,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    }
})
const fileList = toRef(props, 'fileList')

const UploadUserFileList = ref<UploadUserFile[]>([])
//! 我也不知道为什么，如果使用reactive，那么UploadUserFileList中的文件信息不会被v-model更新
// const UploadUserFileList = reactive<UploadUserFile[]>([])

const token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjMzLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXX0.69BERPx7FuKyLl6NkfBTE5CZZFMlQWHwFgpjAORCPlQms5uRwdtS_tmUnCBR-aVbJjtFAQLsJ01IeDGYhMkNFg"
const headers = {
    token: token
}
const data = {
    relatedType: props.type,
    relatedId: props.id,
    sortOrder: fileList.value.length + 1
}

const showFileList = () => {
    console.log(UploadUserFileList.value)
}


const beforeUpload = (file) => {
    // const isJPG = file.type === 'image/jpeg'
    // const isLt2M = file.size / 1024 / 1024 < 2
    // if (!isJPG) {
    //     console.log('You can only upload JPG file!')
    // }
    // if (!isLt2M) {
    //     console.log('Image must smaller than 2MB!')
    // }
    // return isJPG && isLt2M

    console.log("beforeUpload", file)

    return true
}

//成功后将UploadUserFileList中的文件信息添加到fileList中
const onSuccess = (res, file: UploadUserFile) => {
    const newFile = {
        id: res.data.data,
        relatedType: props.type,
        relatedId: -1,
        url: file.url,
        fileName: file.name,
        fileData: file.raw,
        mimeType: file.raw.type,
        sortOrder: 0,
        createTime: new Date().toISOString()
    } as unknown as File

    fileList.value.push(newFile)

    console.log("success!", res, file)
}

const onError = (err, file) => {
    console.log("error!")
}
</script>