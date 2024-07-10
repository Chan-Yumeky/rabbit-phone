<script setup>
import { getBannerAPI } from "@/apis/home.js";
import { onMounted,ref } from 'vue'

const bannerList = ref([])

const getBanner = async () => {
  const res = await getBannerAPI()
  console.log(res)
  bannerList.value = res.result
}

onMounted(() => getBanner())

</script>



<template>
  <div class="home-banner">
    <el-carousel >
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" style="height: 50vw">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 100%;
  height: 50vw;
  box-sizing: border-box;
  position: relative;
  left: 0;
  top: 0;
  z-index: 98;

  .el-carousel.el-carousel--horizontal{
    height: 50vw;
  }

  img {
    width: 99%;
    height: 50vw;
    margin-top: 0.5vw;
  }
}
</style>