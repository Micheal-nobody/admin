<template>
    <el-container style="height: 100vh;">

        <el-aside style="background-color: #f5f5f5;">
            <AsideComponent />
        </el-aside>

        <el-main>
            <router-view />
        </el-main>

    </el-container>

</template>

<script setup>
import { onMounted } from 'vue';
import { useFormStore } from '@/store/formStore';
import { useClubStore } from '@/store/club.ts';

import AsideComponent from '@/components/Aside.vue';

onMounted(async () => {
    const formStore = useFormStore()
    const clubStore = useClubStore()
    try {
        await clubStore.fetchById(1)

        const clubId = clubStore.getId

        formStore.fetchByClubId(clubId)
    } catch (error) {
        console.log(error)
    }
})
</script>