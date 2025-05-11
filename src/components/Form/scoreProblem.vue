<template>

    <!-- 打分区间 -->
    <div class="main-content">
        <div class="score-range">
            <el-slider v-model="question.score" :min="0" :max="10" :step="0.1" show-input></el-slider>
        </div>
    </div>

</template>

<script setup>
import { ref, toRef } from 'vue'
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
    question: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
/* 添加一些必要的样式 */
.main-content {
    margin-top: 20px;
    width: 100%;
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
