<script setup>
import GoodsItem from '../Home/components/GoodsItem.vue'
import { useCategory } from "@/views/Category/composables/useCategory.js";
const { categoryData } = useCategory()
</script>

<template>
  <div class="top-category">
    <div class="sub-list">
      <ul>
        <li v-for="i in categoryData.children" :key="i.id">
          <RouterLink :to="`/category/sub/${i.id}`">
            <img :src="i.picture"  alt=""/>
            <p>{{ i.name }}</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="">
            <img src="@/assets/images/foam-7640940_640.jpg"  alt=""/>
            <p>洗浴卫生</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="">
            <img src="@/assets/images/ornaments-1885470_640.png"  alt=""/>
            <p>居家装饰</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="">
            <img src="@/assets/images/groceries-6984523_640.png"  alt=""/>
            <p>更多</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
      <div class="body">
        <GoodsItem v-for="good in item.goods.slice(0,2)" :goods="good" :key="good.id" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  .sub-list {
    margin-top: 20vw;
    background-color: #fff;
    ul {
      width: 100%;
      height: 30%;
      display: flex;
      padding-top: 2vw;
      flex-wrap: wrap;
      li {
        flex: 1 1 20%;
        max-width: 20%;
        box-sizing: border-box;
        text-align: center;
        padding: 1vw;
        a {
          text-align: center;
          display: block;
          font-size: 2.5vw;
          img {
            width: 15.3vw;
            height: 15.3vw;
            border-radius: 4vw;
          }
          p {
            font-size: 2.5vw;
            line-height: 5vw;
          }
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 1vw;
    position: relative;
    .body {
      width: 100%;
      height: 69.65vw;
      display: flex;
      background-color: #f5f5f5;
      padding: 0 0.5vw;
      .goods-item {
        width: 50%;
        flex: 1 1 50%;
        background-color: #fff;
        box-sizing: border-box;
        text-align: center;
        border-radius: 4vw;
        margin: 0 0.5vw;
        .name {
          font-size: 3vw;
        }
      }
    }
  }
  .ref-goods:last-child {
    //margin-bottom: 15vw;
    padding-bottom: 15vw;
  }
}
</style>