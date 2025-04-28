import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import api from '@/utils/axios'


export const useClubStore = defineStore('club', () => {
    const club = ref([])

    const fetchById = async (id) => {
        console.log("Fetching club by id")
        const response = await api.get(`api/club/getById/${id}`)
        console.log(response)
        
        club.value = response.data.data
    }

    const getQuestions = computed(() => club.value.forms[0].questions)

    const getId = computed(() => club.value.id)
    const getFormList = computed(() => club.value.forms)
    const getcurrentForm = computed(() => getFormList()[0])
    const getquestions = computed(() => getcurrentForm().questions)


    return {
        club,
        fetchById,
        getId,
        getFormList,
        getcurrentForm,
        getquestions
    }
}
)
