<template>

    <button @click="console.log(id)">show id</button>
    <button @click="console.log(FormData)">show FormData</button>
    <button @click="console.log(formStore.currentForm)">show currentForm</button>
    <button @click="console.log(formStore.formList)">show formList</button>
    <button @click="console.log(questions)">show Question</button>

    <el-card class="Page-header">
        <span class="section-title">增加问题：</span>
        <el-button v-for="type in questionTypes" :key="type" class="add-question" @click="addQuestion(type)"
            type="primary">
            {{ typeMap[type] }}
        </el-button>

        <el-button class="save-btn" @click="saveForm" type="success">保存问卷</el-button>
        <el-button class="delete-btn" @click="deleteForm" type="danger">删除问卷</el-button>
    </el-card>

    <draggable :list="questions" item-key="id" @end="handleDragUpdate" handle=".drag-handle" :animation="300" ghost-class="ghost"
        drag-class="dragging">

        <template #item="{ element: question, index }">

            <div class="question-item">

                <!-- 问题头部 -->
                <div class="question-header">
                    <el-icon class="drag-handle">
                        <Rank />
                    </el-icon>

                    <span class="question-number">
                        {{ question.sortOrder }},
                        {{ typeMap[question.type] }}
                    </span>

                    <el-button type="danger" @click="deleteQuestion(question.id)" :icon="Delete" circle
                        class="remove-question-btn" />
                </div>


                <!-- 问题主体  -->
                <div class="question-body">
                    <component :is="questionComponentMap[question.type]" :question="question" :index="index"
                        @addOption="addOption" @removeOption="deleteOption">
                    </component>
                </div>

            </div>

        </template>
    </draggable>

</template>

<script setup>
//#region 导入依赖
import { onDeactivated, ref, watch } from 'vue';
import { computed } from 'vue';
import { Plus, Close, Delete, Rank } from '@element-plus/icons-vue';
import draggable from 'vuedraggable';
import { useRoute } from 'vue-router';
import { useFormStore } from '@/store/form';
//#endregion

//#region 定义样式常量
import multipleSelect from './multipleSelect.vue';
import openEnded from './openEnded.vue';
import scoreProblem from './scoreProblem.vue';
import SingleSelect from './singleSelect.vue';
import { ElMessage } from 'element-plus';

const typeMap = {
    TEXT: '文本题',
    SINGLE_SELECT: '单选题',
    MULTI_SELECT: '多选题',
    SCORE: '评分题'
}
const questionComponentMap = {
    TEXT: openEnded,
    SINGLE_SELECT: SingleSelect,
    MULTI_SELECT: multipleSelect,
    SCORE: scoreProblem
}

const questionTypes = Object.keys(typeMap)
//#endregion

//#region 获取数据
const formStore = useFormStore();
const route = useRoute();
const id = computed(() => Number(route.params.id))
formStore.setCurrentFormById(id.value);
watch(id, (newId) => {
    formStore.setCurrentFormById(newId);
}, { immediate: true });

const FormData = computed(() => formStore.currentForm)
const questions = computed(() => FormData.value?.questions || [])
//#endregion

//#region 处理表单操作
const saveForm = () => {
    formStore.saveForm(FormData.value)
}

const deleteForm = () => {
    if (formStore.deleteForm(id.value)) {
        ElMessage.success('删除成功');
    } else {
        ElMessage.error('删除失败');
    }
}
//#endregion

//#region 处理问题操作

const addQuestion = (type) => {
    formStore.addQuestion(id.value, type)
}

// 删除问题
const deleteQuestion = (questionId) => {
    formStore.deleteQuestion(questionId)
}

const addOption = (question) => {
    formStore.addOption(question)
}

const deleteOption = (question, optionId) => {
    formStore.deleteOption(question, optionId)
}
//#endregion


const handleDragUpdate = () => {
    formStore.updateQuestionSortOrder();
};
</script>


<style scoped>
/* 被拖拽到达目标位置后的（占位符）样式 */
.ghost {
    opacity: 0.5;
    background: #f0f8ff;
    border: 2px dashed #1e90ff;
}

/* 被拖拽元素留在原地的样式 */
.dragging {
    opacity: 0.5;
    background: #f0f8ff;
    border: 2px dashed #1e90ff;
}

.drag-handle {
    cursor: move;
    margin-right: 8px;
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none;
}

/* Page Header */
.Page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 20px;
}

.add-question {
    margin-right: 20px;
}

/* wrapper*/
.main-content {
    width: 90%;
    margin: 0 auto;
}

.question-item {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
}

.question-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.question-number {
    font-size: 18px;
    font-weight: bold;
}

.remove-question-btn {
    margin-left: 10px;
}

.question-body {
    margin-top: 10px;
}
</style>
