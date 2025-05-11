import { Form, Question, Option, File } from '@/models/form'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import api from '@/utils/axios'

interface FormState {
    formList: Form[];
    currentFormId: number | null;
}

export const useFormStore = defineStore('form', {
    state: (): FormState => ({
        formList: [],
        currentFormId: null,
    }),

    getters: {
        currentForm(state): Form | null {
            return state.currentFormId
                ? state.formList.find(form => form.id === state.currentFormId) || null
                : null
        }
    },

    actions: {
        //#region ----------------- Form 操作 -----------------
        setCurrentFormById(id: number) {
            this.currentFormId = id
        },

        async fetchByClubId(clubId: string) {
            try {
                const { data } = await api.get<{ status: number; data: Form[] }>(
                    `/api/form/getByClubId/${clubId}`
                )

                console.log(data)

                data.status === 200
                    ? (this.formList = data.data || [])
                    : ElMessage.error('获取表单列表失败')
            } catch (error) {
                ElMessage.error('请求失败')

                throw error
            }
        },

        async saveForm(form: Form) {
            try {
                const { data } = await api.put<{ status: number }>('/api/form/update', form)
                data.status === 200
                    ? ElMessage.success('保存成功')
                    : ElMessage.error('保存失败')
                return data.status === 200
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        async deleteForm(id: Number) {
            try {
                const { data } = await api.delete<{ status: number }>(`/api/form/delete/${id}`)
                if (data.status === 200) {
                    this.formList = this.formList.filter(form => form.id !== id)
                    ElMessage.success('删除成功')
                } else {
                    ElMessage.error('删除失败')
                }
                return data.status === 200
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        async addForm(clubId: string, name: string) {
            try {
                const { data } = await api.post<{ status: number; data: Form }>(
                    '/api/form/add',
                    { clubId, name },
                    { headers: { 'Content-Type': 'application/json' } }
                )

                if (data.status === 200) {
                    this.formList.push(data.data)
                    ElMessage.success('新增成功')
                    return data.data
                }
                ElMessage.error('新增失败')
                return null
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },
        //#endregion

        //#region ----------------- Question 操作 -----------------
        async addQuestion(type: string) {
            if (!this.currentForm) return

            try {
                // 新增问题
                const newQuestion = {
                    id: -1,
                    type,
                    formId: this.currentForm.id,
                    isDeleted: false,
                    isRequired: false,
                    options: [] as Option[],
                    sortOrder: this.currentForm.questions.length,
                    questionText: `这是问题 ${this.currentForm.questions.length + 1}`,
                    questionAttachment: [] as File[],
                }


                const { data } = await api.post<{ status: number; data: Question }>(
                    '/api/form/question/add',
                    newQuestion
                )


                if (data.status === 200) {
                    this.currentForm.questions.push(data.data)
                    ElMessage.success('新增成功')
                    return data.data
                }
                ElMessage.error('新增失败')
                return null
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        updateQuestionSortOrder() {
            this.currentForm?.questions.forEach((question, index) => {
                question.sortOrder = index + 1
            })
        },

        async deleteQuestion(questionId: string) {
            if (!this.currentForm) return

            try {
                const { data } = await api.delete<{ status: number }>(
                    `/api/form/question/delete/${questionId}`
                )

                if (data.status === 200) {
                    this.currentForm.questions = this.currentForm.questions.filter(
                        q => q.id !== questionId
                    )

                    // 重新排序
                    this.currentForm.questions.forEach((question, index) => {
                        question.sortOrder = index
                    })


                    ElMessage.success('删除成功')
                } else {
                    ElMessage.error('删除失败')
                }
                return data.status === 200
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        //#endregion

        //#region ----------------- Option 操作 -----------------
        async addOption(question: Question) {
            if (!question) return

            // 新增选项
            const newOption = {
                questionId: question.id,
                optionText: `这是选项 ${question.options.length + 1}`,
                optionAttachment: [] as File[],
                sortOrder: question.options.length,
                isDeleted: false,
            }
            console.log(newOption)

            const { data } = await api.post<{ status: number; data: Option }>(
                '/api/form/option/add',
                newOption
            )

            console.log(data)

            question.options.push(data.data)
        },

        async deleteOption(question: Question, optionId: Number) {
            try {
                const { data } = await api.delete<{ status: number }>(
                    `/api/form/option/delete/${optionId}`
                )

                if (data.status === 200) {
                    question.options = question.options.filter(opt => opt.id !== optionId)

                    // 重新排序
                    question.options.forEach((option, index) => {
                        option.sortOrder = index
                    })


                    ElMessage.success('删除成功')
                } else {
                    ElMessage.error('删除失败')
                }
                return data.status === 200
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        }
        //#endregion
    }
})