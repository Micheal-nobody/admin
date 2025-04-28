<template>

    <button @click="console.log(fileList)">show fileList</button>

    <el-upload class="upload-demo" action="http://localhost:9090/api/file/test" v-model:file-list="fileList"
        :multiple="true" :show-file-list="false" list-type="picture" :limit="3" :before-upload="beforeUpload"
        :on-success="onSuccess" :on-error="onError">

        <el-button type="primary">点击上传图片</el-button>

    </el-upload>

    <!-- 可拖动预览 -->
    <draggable v-model="fileList" group="people" @end="handleDragEnd" item-key="uid" handle=".drag-handle"
        class="drag-container" animation="300">
        <template #item="{ element: picture, index }">
            <div class="drag-item" :key="picture.uid">
                <el-card class="drag-card">
                    <img :src="picture.url" alt="Picture" style="width: 100%" />
                </el-card>
                <div class="drag-handle">
                    <el-icon>
                        <More />
                    </el-icon>
                </div>
            </div>
        </template>
    </draggable>



    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview" />
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { Rank, More } from '@element-plus/icons-vue'


const dialogVisible = ref(false)
const dialogImageUrl = ref('')

const fileList = ref([])

const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isJPG) {
        console.log('You can only upload JPG file!')
    }
    if (!isLt2M) {
        console.log('Image must smaller than 2MB!')
    }
    return isJPG && isLt2M
}

const onSuccess = (res, file) => {
    const index = fileList.value.findIndex(f => f.uid === file.uid);
    if (index !== -1) {
        file.sortOrder = index + 1;
    }

    console.log("success!")
}

const onError = (err, file) => {
    console.log("error!")
}

const handleDragEnd = () => {
    fileList.value.forEach((file, index) => {
        file.sortOrder = index + 1
    })
}



</script>

<style scoped>
.upload-demo {
    width: 100%;
}


.drag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.drag-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.drag-card {
    width: 100px;
    height: 100px;
    padding: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: move;
}

.drag-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>