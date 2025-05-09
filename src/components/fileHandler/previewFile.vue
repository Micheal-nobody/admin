<template>

    <!-- 可拖动预览 -->
    <draggable v-model="props.fileList.value" @end="handleDragEnd" item-key="uid" handle=".drag-handle"
        class="drag-container" animation="300">

        <template #item="{ element: picture, index }">
            <div class="drag-item" :key="picture.uid">
                <el-card class="drag-card" @click="handlePreview(picture.url)" shadow="hover" body-style="padding: 0">
                    <img :src="picture.url" alt="Picture"  />
                </el-card>

                <div class="drag-handle">
                    <el-icon>
                        <Rank />
                    </el-icon>
                </div>
            </div>
        </template>
    </draggable>

    <!-- 点击预览 -->
    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview" width="100%" />
    </el-dialog>
</template>

<script setup>
import { ref, toRef, defineProps } from 'vue'
import draggable from 'vuedraggable'
import { Rank, More } from '@element-plus/icons-vue'


const dialogVisible = ref(false)
const dialogImageUrl = ref('')

const props = defineProps({
    fileList: {
        type: Array,
        default: () => []
    }
})

const handleDragEnd = () => {
    props.fileList.value.forEach((file, index) => {
        file.sortOrder = index + 1
    })
}

const handlePreview = (url) => {
    dialogImageUrl.value = url
    dialogVisible.value = true
}
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