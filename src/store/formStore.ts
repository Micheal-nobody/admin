//导入各个接口
import { Form, Question, Option } from '@/model/form'



import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import api from '@/utils/axios'

interface FormState {
    formList: Form[];
    currentFormId: string | null;
    newQuestion: Omit<Question, 'id' | 'formId'> & { id: number };
}


// 感觉Pinia还是选项式用的舒服
export const useFormStore = defineStore('form', {
    state: (): FormState => ({
        formList: [],
        currentFormId: null,
        newQuestion: {
            id: -1,
            isDeleted: false,
            isRequired: false,
            options: [],
            sortOrder: 0,
            questionText: '',
            questionAttachment: { id: -1, fileName: '', fileData: '', mimeType: '', tableType: '', createTime: '', sortOrder: 0 },
            type: '',
        }
    }),

    getters: {
        currentForm(state): Form | null {
            if (!state.currentFormId) return null
            return state.formList.find(form => form.id === state.currentFormId) || null
        }
    },

    actions: {
        // 设置当前表单
        setCurrentFormById(id: string) {
            this.currentFormId = id
        },
        

        //#region Form 相关操作
        async fetchByClubId(clubId: string) {
            console.log("fetchByClubId clubId", clubId)

            try {
                const response = await api.get<{ status: number; data: Form[] }>(
                    `/api/form/getByClubId/${clubId}`
                )

                if (response.data.status === 200) {
                    this.formList = response.data.data || []
                } else {
                    ElMessage.error('获取表单列表失败')
                }
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        async saveForm(form: Form) {
            console.log("saveForm form", form)

            try {
                const response = await api.put<{ status: number }>('/api/form/update', form)

                if (response.data.status === 200) {
                    ElMessage.success('保存成功')
                    return true
                }

                ElMessage.error('保存失败')
                return false
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        async deleteForm(id: string) {
            try {
                const response = await api.delete<{ status: number }>(`/api/form/delete/${id}`)

                if (response.data.status === 200) {
                    this.formList = this.formList.filter(form => form.id !== id)
                    ElMessage.success('删除成功')
                    return true
                }

                ElMessage.error('删除失败')
                return false
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        async addForm(clubId: string, name: string) {
            const params = { clubId, name }
            console.log("addForm params", params)

            try {
                const response = await api.post<{ status: number; data: Form }>(
                    '/api/form/add',
                    params,
                    { headers: { 'Content-Type': 'application/json' } }
                )

                if (response.data.status === 200) {
                    this.formList.push(response.data.data)
                    ElMessage.success('新增成功')
                    return response.data.data
                }

                ElMessage.error('新增失败')
                return null
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        //#endregion

        //#region Question 相关操作
        generateNewOption(questionId: string | number, sortOrder: number): Omit<Option, 'id'> {
            return {
                questionId,
                optionText: '',
                optionAttachment: { id: -1, fileName: '', fileData: '', mimeType: '', tableType: '', createTime: '', sortOrder: 0 },
                sortOrder: sortOrder,
                isDeleted: false,
            }
        },

        async addQuestion(formId: string, type: string) {
            if (!this.currentForm) return

            const questionData = {
                ...this.newQuestion,
                formId,
                type,
                sortOrder: this.currentForm.questions.length + 1
            }

            try {
                const response = await api.post<{ status: number; data: Question }>(
                    '/api/form/question/add',
                    questionData
                )

                if (response.data.status === 200) {
                    this.currentForm.questions.push(response.data.data)
                    ElMessage.success('新增成功')
                    return response.data.data
                }

                ElMessage.error('新增失败')
                return null
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        updateQuestionSortOrder() {
            if (!this.currentForm) return

            this.currentForm.questions.forEach((question, index) => {
                question.sortOrder = index + 1
            })
        },

        async deleteQuestion(questionId: string) {
            if (!this.currentForm) return

            try {
                const response = await api.delete<{ status: number }>(
                    `/api/form/question/delete/${questionId}`
                )

                if (response.data.status === 200) {
                    this.currentForm.questions = this.currentForm.questions.filter(
                        q => q.id !== questionId
                    )
                    this.updateQuestionSortOrder()
                    ElMessage.success('删除成功')
                    return true
                }

                ElMessage.error('删除失败')
                return false
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        },

        //#endregion

        //#region Option 相关操作
        async addOption(question: Question) {
            console.log("addOption question", question)

            const newOption = this.generateNewOption(
                question.id,
                question.options.length + 1
            )
            question.options.push(newOption)

            // try {
            //     const response = await api.post<{ status: number; data: Option }>(
            //         '/api/form/option/add',
            //         newOption
            //     )

            //     if (response.data.status === 200) {
            //         question.options.push(response.data.data)
            //         ElMessage.success('新增成功')
            //         return response.data.data
            //     }

            //     ElMessage.error('新增失败')
            //     return null
            // } catch (error) {
            //     ElMessage.error('请求失败')
            //     throw error
            // }
        },

        async deleteOption(question: Question, optionId: string) {
            try {
                const response = await api.delete<{ status: number }>(
                    `/api/form/option/delete/${optionId}`
                )

                if (response.data.status === 200) {
                    question.options = question.options.filter(opt => opt.id !== optionId)
                    ElMessage.success('删除成功')
                    return true
                }

                ElMessage.error('删除失败')
                return false
            } catch (error) {
                ElMessage.error('请求失败')
                throw error
            }
        }

        //#endregion
    }
})