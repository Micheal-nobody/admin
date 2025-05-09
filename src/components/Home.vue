<!-- 显示一个社团的信息 -->
<template>

  <el-container>
    <button @click="console.log(clubData)">show club</button>

    <el-header>

      <h1>社团信息页</h1>
      <h1 style="color: red;">TODO:修改功能</h1>
      <img :src="clubData?.coverImage" alt="社团logo">
      <span>{{ clubData?.name }}</span>
    </el-header>

    <el-main>
      <p>社团简介：{{ clubData?.description }}</p>
      <p>社团电话：{{ clubData?.coverImage }}</p>
    </el-main>
  </el-container>

</template>

<script setup>
// 引入全局变量

import { computed, onMounted } from 'vue'
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