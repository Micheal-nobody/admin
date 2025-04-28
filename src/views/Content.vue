<template>
    <AsideComponent />

    <div class="main-container">
        <button @click="console.log(clubStore.club)">show clubData</button>
        <router-view />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFormStore } from '@/store/form';
import { useClubStore } from '@/store/club';

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


<style scoped>
.aside-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 15%;
    height: 100%;
    background-color: #f5f5f5;
}

.main-container {
    margin-left: 15%;
    width: 85%;
    padding: 20px;
    height: 100%;
}
</style>