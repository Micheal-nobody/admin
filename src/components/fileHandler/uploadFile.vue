<template>

    <el-upload class="upload-demo" action="http://localhost:9090/api/file/test" v-model:file-list="props.fileList.value"
        :multiple="true" :show-file-list="false" list-type="picture" :limit="3" :before-upload="beforeUpload"
        :on-success="onSuccess" :on-error="onError" :auto-upload="false">

        <!-- 使用DocumentAdd图标 -->
        <el-button type="primary">
            <el-icon>
                <DocumentAdd />
            </el-icon>
        </el-button>

    </el-upload>

</template>

<script setup>
import { toRef, defineProps } from 'vue'
import { ElUpload } from 'element-plus'
import { DocumentAdd } from '@element-plus/icons-vue'



const props = defineProps({
    fileList: {
        type: Array,
        default: () => []
    }
})


const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isJPG) {
        console.log('You can only upload JPG file!')
    }
    if (!isLt2M) {
        console.log('Image must smaller than 2MB!')
    }
    // return isJPG && isLt2M
    return true
}

const onSuccess = (res, file) => {
    const index = props.fileList.value.findIndex(f => f.uid === file.uid);
    if (index !== -1) {
        props.file.sortOrder = index + 1;
    }

    console.log("success!")
}

const onError = (err, file) => {
    console.log("error!")
}

</script>