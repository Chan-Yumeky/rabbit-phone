<script setup>
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeBanner_Phone from "@/views/Home/components/HomeBanner_Phone.vue";
import GoodsList from "@/components/GoodsList/GoodsList_index.vue";
</script>

<template>
  <div class="container">
    <HomeBanner_Phone />
  </div>
  <div class="new-and-hot">
      <HomeNew />
      <HomeHot />
  </div>
  <GoodsList />
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 50vw;
  position: relative;
  margin-top: 20vw;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.new-and-hot {
  width: 100%;
  height: 52.5vw;
  display: flex;
}
</style>
