<template>
    <!-- debug区域，记得删掉 -->
    <div
        style="background-color: #f5f5f5;padding: 10px;margin-bottom: 10px; display: flex; justify-content: space-between;align-items: center;">
        <button @click="console.log(id)">show id</button>
        <!-- <button @click="console.log(FormData)">show FormData</button> -->
        <button @click="showFormData()">show FormData</button>
        <button @click="console.log(formStore.currentForm.questions[1].options)">show currentForm</button>
        <button @click="console.log(formStore.formList)">show formList</button>
        <button @click="console.log(questions)">show Question</button>
    </div>

    <el-container>

        <!-- Page Header -->
        <el-header>
            <span class="section-title">增加问题：</span>
            <el-button v-for="type in questionTypes" :key="type" class="add-question" @click="addQuestion(type)"
                type="primary">
                {{ typeMap[type] }}
            </el-button>

            <el-button class="save-btn" @click="saveForm" type="success">保存问卷</el-button>
            <el-button class="delete-btn" @click="deleteForm" type="danger">删除问卷</el-button>
        </el-header>


        <!-- 可拖动的问题列表 -->
        <el-main>

            <draggable :list="questions" item-key="id" @end="handleDragUpdate" handle=".drag-handle" :animation="300"
                ghost-class="ghost" drag-class="dragging">

                <template #item="{ element: question }">

                    <div class="question-item">

                        <!-- 问题头部-->
                        <div class="question-header">

                            <!-- 拖动按钮 -->
                            <el-icon class="drag-handle">
                                <Rank />
                            </el-icon>

                            <!-- 问题序号 -->
                            <span class="question-number">
                                {{ question.sortOrder + 1 }},
                                {{ typeMap[question.type] }}
                            </span>

                            <!-- 删除问题按钮 -->
                            <el-button type="danger" @click="deleteQuestion(question.id)" :icon="Delete" circle
                                class="remove-question-btn" />
                        </div>


                        <!-- 问题主体  -->
                        <div class="question-body">
                            <el-card>
                                <!-- 问题内容，就是你问的是个啥？ -->
                                <questionHeader :question="question" />

                                <!-- 用户答题部分，根据问题类型不同，显示不同的组件，比如选择题显示选项，评分题显示分数等 -->
                                <component :is="questionComponentMap[question.type]" :question="question"
                                    @addOption="addOption" @removeOption="deleteOption">
                                </component>

                            </el-card>
                        </div>
                    </div>

                </template>
            </draggable>

        </el-main>

    </el-container>

</template>

<script setup>
//#region 导入依赖
import { onDeactivated, ref, watch } from 'vue';
import { computed } from 'vue';
import { Plus, Close, Delete, Rank } from '@element-plus/icons-vue';
import draggable from 'vuedraggable';
import { useRoute } from 'vue-router';
import { useFormStore } from '@/store/formStore';

import questionHeader from '@/components/Form/questionHeader.vue'
//#endregion

//#region 定义样式常量
import openEnded from './openEnded.vue';
import scoreProblem from './scoreProblem.vue';
import { ElMessage } from 'element-plus';
import OptionBody from './OptionBody.vue';

const typeMap = {
    TEXT: '文本题',
    SINGLE_SELECT: '单选题',
    MULTI_SELECT: '多选题',
    SCORE: '评分题'
}
const questionComponentMap = {
    TEXT: openEnded,
    SCORE: scoreProblem,
    SINGLE_SELECT: OptionBody,
    MULTI_SELECT: OptionBody,
}

const questionTypes = Object.keys(typeMap)
//#endregion

//#region 获取数据
const formStore = useFormStore();
const route = useRoute();

//从路由参数中接受id，并更新当前表单
const id = computed(() => Number(route.params.id))
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
    formStore.addQuestion(type)
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






//debug区域，记得删掉
const showFormData = () => {
    console.log(FormData.value)
}
</script>


<style scoped>
/* #region  draggable的样式*/
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

/* 拖拽把手的样式 */
.drag-handle {
    cursor: pointer;
    margin-right: 8px;
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none;
}

/* #endregion */


/* Page Header */
.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 20px;
}

.add-question {
    margin-right: 20px;
}

/* #region 问题列表 */
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

.question-body {
    margin-top: 10px;
}

/* #endregion */
</style>
