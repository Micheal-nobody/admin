import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import api from '@/utils/axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'


export const useFormStore = defineStore('form', () => {
    const router = useRouter()
    const formList = ref([])
    const currentFormId = ref('')
    const currentForm = computed(() => {
        return formList.value.find(form => form.id === currentFormId.value) || {}
    })


    const setCurrentFormById = (id) => {
        currentFormId.value = id;
    }

    // 按照俱乐部ID查询表单，查询某个社团的所有表单
    const fetchByClubId = async (clubId) => {

        console.log("fetchByClubId clubId", clubId)

        const response = await api.get(`/api/form/getByClubId/${clubId}`);
        if (response.data.status == 200) {
            formList.value = response.data.data || [];
        } else {
            ElMessage.error('获取表单列表失败');
        }
    };

    //#region Form相关操作
    const saveForm = async (form) => {
        console.log("saveForm form", form)
        const response = await api.put('/api/form/update', form);
        console.log("saveForm response", response)
        if (response.data.status === 200) {
            ElMessage.success('保存成功');
            return true;
        } else {
            ElMessage.error('保存失败');
            return false;
        }
    };

    //! 测试成功1
    const deleteForm = async (id) => {
        const response = await api.delete(`/api/form/delete/${id}`);
        if (response.data.status === 200) {
            formList.value = formList.value.filter(form => form.id !== id);
            if (formList.value.length > 0) {
                router.push({ name: 'Form', params: { id: formList.value[0].id } })
            } else {
                currentFormId.value = null;
            }
            ElMessage.success('删除成功');
        } else {
            ElMessage.error('删除失败');
        }
    };

    //! 测试成功2
    const addForm = async (clubId, name) => {
        // 设置查询参数
        const params = {
            clubId: clubId,
            name: name,
        };
        console.log("addForm params", params)

        // 发送请求
        const response = await api.post('/api/form/add', params, { headers: { 'Content-Type': 'application/json' } });

        console.log("addForm response", response)
        if (response.data.status === 200) {
            formList.value.push(response.data.data);
            ElMessage.success('新增成功');
            return true;
        } else {

            ElMessage.error('新增失败');
            return false;
        }
    };


    //#region Form中子类相关操作
    const newQuestion = ref({
        id: -1,
        isDeleted: false,
        isRequired: false,
        options: [],
        sortOrder: 0,
        title: '在这里修改问题名称',
        titleImg: '',
        type: '',
    })

    const generateNewOption = (questionId, sortOrder) => {
        return {
            questionId,
            value: `选项${sortOrder}`,
            url: '',
            sortOrder
        }
    }

    const defaultOptions = [
        {
            "id": -1,
            "title": "选项1",
            "url": "",
            "sortOrder": 1
        },
        {
            "id": -1,
            "title": "选项2",
            "url": "",
            "sortOrder": 2
        },
        {
            "id": -1,
            "title": "选项3",
            "url": "",
            "sortOrder": 3
        }
    ]

    const addQuestion = async (formId, type) => {
        const response = await api.post('/api/form/question/add', Object.assign(newQuestion.value, { formId: formId, type: type, sortOrder: currentForm.value.questions.length + 1 }));

        if (response.data.status === 200) {
            currentForm.value.questions.push(response.data.data);
            ElMessage.success('新增成功');
        }
    };

    const updateQuestionSortOrder = () => {
        currentForm.value.questions.forEach((question, index) => {
            question.sortOrder = index + 1;
        })
    }

    const deleteQuestion = async (questionId) => {
        const response = await api.delete(`/api/form/question/delete/${questionId}`);
        if (response.data.status === 200) {
            ElMessage.success('删除成功');
            currentForm.value.questions = currentForm.value.questions.filter(question => question.id !== questionId);

            // 更新sortOrder
            updateQuestionSortOrder();

        } else {
            ElMessage.error('删除失败');
        }

        console.log("删除后,currentForm.value.questions", currentForm.value.questions)
    }

    const addOption = async (question) => {
        console.log("form.js   addOption question", question)
        const nweOption = generateNewOption(question.id, question.options.length + 1)

        const response = await api.post('/api/form/option/add', nweOption);
        if (response.data.status === 200) {
            ElMessage.success('新增成功');

            // 更新选项列表
            question.options.push(response.data.data);

            console.log("addOption question.options", question.options)
        } else {
            ElMessage.error('新增失败');
        }
    };

    const deleteOption = async (question, optionId) => {
        console.log("请求网址：" + '/api/form/option/delete/' + optionId)
        const response = await api.delete(`/api/form/option/delete/${optionId}`);
        if (response.data.status === 200) {
            ElMessage.success('删除成功');
            question.options = question.options.filter(option => option.id !== optionId);
        } else {
            ElMessage.error('删除失败');
        }
    };
    //#endregion


    return {
        newQuestion,
        formList,
        currentForm,

        fetchByClubId,
        setCurrentFormById,
        saveForm,
        deleteForm,
        addForm,
        addQuestion,
        deleteQuestion,
        addOption,
        deleteOption,
        updateQuestionSortOrder,
    }
})