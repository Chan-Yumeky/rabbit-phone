<script setup>
import HomePanel from "@/views/Home/components/HomePanel.vue";
import { findNewAPI } from "@/apis/home.js"
import { onMounted, ref } from "vue";

//获取数据
const newList = ref([])

const getNewList = async () => {
  const res = await findNewAPI()
  newList.value = res.result
}
// let fpage = Math.floor(Math.random() * 3);
// let lpage = (fpage + 2) % 4;
onMounted(() => getNewList())
console.log(newList.value)
</script>

<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <ul class="goods-list">
      <li v-for="item in newList.slice(1,3)" :key="item.id">
        <RouterLink :to="`/detail/${item.id}`">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  width: 100%;
  li {
    width: 50%;
    background: #f0f9f4;
    transition: all .5s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }
    img {
      width: 99.5%;
    }
    p {
      font-size: 3vw;
      padding: 2vw 1vw 0 1vw;
      text-align: center;
      text-overflow: clip;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      color: $priceColor;
    }
  }
  li:first-child {
    border-radius: 0 0 0 4vw;
  }
  li:last-child {
    border-radius: 0 0 4vw 0;
  }
}
</style>