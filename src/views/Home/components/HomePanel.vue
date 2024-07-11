<script setup>
defineProps({
  title:{
    type:String
  },
  subTitle:{
    type:String
  }
})
</script>

<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <!-- 主标题和副标题 -->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <slot />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;
  width: 50%;
  height: 52.5vw;
  .container {
    width: 100%;
    height: 52.5vw;
    .head {
      width: 100%;
      margin-top: 0.5vw;
      padding: 3.5vw 0;
      border-radius: 4vw 4vw 0 0;
      display: flex;
      align-items: flex-end;
      background: #f0f9f4;
      h3 {
        flex: 1;
        font-size: 5vw;
        font-weight: normal;
        margin-left: 1.1vw;
        height: 6.56vw;
        line-height: 6.56vw;
        small {
          font-size: 2.5vw;
          color: #999;
          margin-left: 4vw;
        }
      }
    }
  }
}
</style>