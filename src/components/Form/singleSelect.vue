<template>
    <div class="main-content">
        <!-- 问题列表 -->
        <el-card class="question-item" shadow="hover">

            <el-input v-model="question.title" placeholder="请输入问题" class="question-title" />
            <!-- 问题内容 -->
            <div class="question-body">
                <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
                    <el-input v-model="option.value" placeholder="选项" class="option-input">
                        <template #append>
                            <el-button v-if="question.options.length > 1" @click="removeOption(option.id)"
                                :icon="Close" circle />
                        </template>
                    </el-input>
                </div>

                <el-button type="primary" @click="addOption" :icon="Plus" class="add-option">
                    添加选项
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'
import { Delete, Close, Plus } from '@element-plus/icons-vue'
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
/* 添加一些必要的样式 */
.main-content {
    margin-top: 20px;
}

.question-item {
    margin-bottom: 20px;
}

.question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.question-number {
    font-weight: bold;
}
</style>
