<template>

    <!-- 选项内容 -->
    <div class="option-container">

        <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
            <el-input v-model="option.value" placeholder="选项" class="option-input" />

            <upload-component :file-list="fileList" />
            <el-button v-if="question.options.length > 1" @click="removeOption(option.id)" :icon="Delete"
                type="danger" />
        </div>


        <el-button type="primary" @click="addOption" :icon="Plus" class="add-option">
            添加选项
        </el-button>
    </div>

</template>

<script setup>
import { ref, toRef } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'
import { Delete, Close, Plus } from '@element-plus/icons-vue'

import uploadComponent from '@/components/fileHandler/uploadFile.vue'
const fileList = ref([])

const emit = defineEmits(['addOption', 'removeOption'])
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
    align-items: center;
    margin-bottom: 10px;
}
</style>
