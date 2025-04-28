<!-- 显示一个社团的信息 -->
<template>

  <button @click="console.log(clubData)">show club</button>
  
  <h1>社团信息页</h1>
  <h1 style="color: red;">TODO:修改功能</h1>
  <!-- 第一部分，显示logo和社团名称 -->
  <header>
    <img :src="clubData.coverImage" alt="社团logo">
    <span>{{ clubData.name }}</span>
  </header>

  <!-- 第二部分，显示社团信息 -->
  <div>
    <p>社团简介：{{ clubData.description }}</p>
    <p>社团电话：{{ clubData.coverImage }}</p>
  </div>

</template>

<script setup>
// 引入全局变量
import { computed } from 'vue'
import { useClubStore } from '@/store/club'

const clubStore = useClubStore()

// 监听社团数据变化
const clubData = computed(() => clubStore.club)
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

header img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}
</style>