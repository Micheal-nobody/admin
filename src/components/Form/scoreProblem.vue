<template>
    <div class="main-content">
        <!-- 问题列表 -->
        <el-card class="question-item" shadow="hover">

            <el-input v-model="question.title" placeholder="请输入问题" class="question-title" />

            <!-- 问题内容 -->
            <div class="question-body">
                <!-- 打分区间 -->
                <div class="score-range">
                    <el-slider v-model="question.score" :min="0" :max="10" :step="0.1" show-input></el-slider>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'

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

const question = toRef(props.question)
</script>

<style scoped>
/* 添加一些必要的样式 */
.main-content {
    margin-top: 20px;
    width: 100%;
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
