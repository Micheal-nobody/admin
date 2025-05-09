interface Club {
    id: Number;
    name: string;
    leaderId: Number;
    description?: string;
    category: string;
    coverImage: string;
    isDeleted: boolean;
    createTime: string;
    updateTime: string;
}

// club.store.ts
import { defineStore } from 'pinia'
import api from '@/utils/axios'

interface ClubState {
    club: Club | null;
}

export const useClubStore = defineStore('club', {
    state: (): ClubState => ({
        club: null
    }),

    getters: {
        getId(): Number | null {
            return this.club?.id || null
        },
    },

    actions: {
        async fetchById(id: Number): Promise<void> {
            try {
                const response = await api.get < { data: Club } > (`api/club/getById/${id}`)
                this.club = response.data.data
                console.log('获取社团信息成功:', response.data.data)
            } catch (error) {
                console.error('获取社团信息失败:', error)
                throw new Error('Failed to fetch club')
            }
        }
    }
})