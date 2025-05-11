<template>

    <!-- 可拖动预览 -->
     <!-- <button @click="showfileList()">show previewList</button>
     <button @click="showfileData()">show fileData</button> -->
    <draggable v-model="fileList" @end="handleDragEnd" item-key="id" handle=".drag-handle" class="drag-container"
        animation="300">
        <template #item="{ element: picture }">

            <div class="drag-item" :key="picture.uid">
                <el-card class="drag-card" @click="handlePreview(picture.url)" shadow="hover" body-style="padding: 0">
                    <img :src="picture.url" alt="Picture" />
                </el-card>

                <el-icon class="handle" style="cursor:pointer;">
                    <MoreFilled />
                </el-icon>
            </div>

        </template>
    </draggable>

    <!-- 点击预览 -->
    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview" width="100%" />
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRef, defineProps, PropType,onMounted } from 'vue'
import draggable from 'vuedraggable'
import { MoreFilled } from '@element-plus/icons-vue'
import { File } from '@/models/form'



//#region 预览部分
const dialogVisible = ref(false)
const dialogImageUrl = ref('')

const handleDragEnd = () => {
    fileList.value.forEach((file, index) => {
        file.sortOrder = index + 1
    })
}

const handlePreview = (url) => {
    dialogImageUrl.value = url
    dialogVisible.value = true
}
//#endregion

const props = defineProps({
    fileList: {
        type: Array as PropType<File[]>,
        required: true
    }
})
const fileList = toRef(props, 'fileList')

const showfileList = () => {
    console.log(fileList.value)
}
const showfileData = () => {
    console.log(fileList[0].fileData)
}

//挂载时，将base64格式的图片转为blob格式
onMounted(() => {
    fileList.value.forEach((file) => {
        const { fileData } = file;
        if (fileData && typeof fileData === "string") {
            // 处理base64格式图片
            const binaryData = atob(fileData);
            const arrayBuffer = new ArrayBuffer(binaryData.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < binaryData.length; i++) {
                uint8Array[i] = binaryData.charCodeAt(i);
            }

            // 转为blob格式
            file.fileData = new Blob([uint8Array], { type: file.mimeType });

            //添加url属性
            file.url = URL.createObjectURL(file.fileData);
        }
        return file;
    });
});
</script>

<style scoped>
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
    max-width: 300px;
    max-height: 300px;
    padding: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}

.drag-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>