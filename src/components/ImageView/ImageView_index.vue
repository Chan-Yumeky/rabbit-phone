<script setup>
import {ref} from "vue";
// props适配图片列表
defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
})
// 当前活动的图片索引
const activeIndex = ref(0)
// 切换图片时更新当前活动图片索引
const enterhandler = (i) => {
  activeIndex.value = i
}
</script>

<template>
  <div class="goods-image">
    <el-carousel :autoplay="false" :initial-index="activeIndex" indicator-position="none" :model-value="activeIndex" @change="enterhandler">
      <el-carousel-item v-for="i in imageList" :key="i">
        <img :src="imageList[activeIndex]" alt=""/>
      </el-carousel-item>
    </el-carousel>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @click="enterhandler(i)" :class="{ active:i === activeIndex }">
        <img :src="img" alt=""/>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;

  .el-carousel {
    width: 100%;
    height: 100vw;
    background: #f5f5f5;

    ::v-deep .el-carousel__container {
      position: relative;
      height: 100vw;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .small {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    li {
      width: 15.81vw;
      height: 15.81vw;
      margin-left: 2.79vw;
      margin-bottom: 3.49vw;
      cursor: pointer;

      &:hover,
      &.active {
        border: 0.47vw solid $xtxColor;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
