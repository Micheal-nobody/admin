<template>

    <!-- 选项内容 -->
    <div class="option-container">

        <draggable :list="question.options" handle=".handle" animation=200 item-key="id">
            <template #item="{ element: option }">
                <div class="option-item">
                    <div class="option-item-content">

                        <!-- 旋转icon的方向 -->
                        <el-icon class="handle" style="cursor: move; color: #666;transform: rotate(90deg); ">
                            <MoreFilled />
                        </el-icon>

                        <el-input v-model="option.optionText" placeholder="这是一个选项" class="option-input" />

                        <upload-component :file-list="option.optionAttachments" type="option" :id="option.id" />
                        <el-button v-if="question.options.length > 1" @click="removeOption(option.id)" :icon="Delete"
                            type="danger" />
                    </div>

                    <div class="preview-file-container">
                        <preview-file :file-list="option.optionAttachments" />
                    </div>
                </div>
            </template>
        </draggable>


        <el-button type="primary" @click="addOption" :icon="Plus" class="add-option">
            添加选项
        </el-button>
    </div>

</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'
import { Delete, Close, Plus, MoreFilled } from '@element-plus/icons-vue'
import draggable from 'vuedraggable';
import uploadComponent from '@/components/fileHandler/uploadFile.vue'
import previewFile from '@/components/fileHandler/previewFile.vue'

//引入Option接口
import type { Question } from '@/models/form'

const emit = defineEmits(['addOption', 'removeOption'])
const props = defineProps({
    question: {
        type: Object as () => Question,
        required: true
    }
})
const question = toRef(props, 'question')

const addOption = () => {
    emit('addOption', question.value)
}

const removeOption = (optionId) => {
    emit('removeOption', question.value, optionId)
}
</script>

<style scoped>
.option-contaienr {
    margin-top: 10px;
}

.option-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.option-item-content {
    display: flex;
    align-items: center;
}

.preview-file-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}
</style>
