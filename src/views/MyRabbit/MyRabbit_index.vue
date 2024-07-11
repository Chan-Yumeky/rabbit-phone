<script setup >
import Login from "@/views/Login/Login_index.vue";
import RabbitPage from "@/views/MyRabbit/components/RabbitPage.vue";
import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore()

</script>

<template>
  <template v-if="userStore.userInfo.token">
    <RabbitPage />
  </template>
  <template v-else>
    <Login />
  </template>
</template>

<style scoped lang="scss">

</style>