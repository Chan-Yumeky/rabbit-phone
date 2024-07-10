<script setup>
import { getSubCategoryAPI } from "@/apis/category.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GoodsItem from "@/views/Home/components/GoodsItem.vue";
// 获取基础列表数据
const route = useRoute()
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page:Math.floor(Math.random() * 18) + 1,
  pageSize:20,
  sortField:'publishTime'
})
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  console.log(res)
  goodList.value = res.result.items
}
onMounted(() => getGoodList())


// tab切换回调
// const tabChange = () => {
//   console.log('tab切换了', reqData.value.sortField)
//   reqData.value.page = Math.floor(Math.random() * 18) + 1;
//   getGoodList()
// }

//加载更多
const load = async () => {
  console.log('加载更多数据')
  //获取下一页数据
  reqData.value.page++
  if (reqData.value.page > 18) {
    reqData.value.page = 1
  }
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value,...res.result.items]
}

</script>

<template>
  <div class="">
    <div class="sub-container">
      <div class="body" v-infinite-scroll="load">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id"></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
//.bread-container {
//  padding: 25px 0;
//  color: #666;
//}

.sub-container {
  //margin-top: 20vw;
  //padding: 20px 10px;
  background-color: #fff;

  .el-tab {
    padding: 0 2vw;
  }


  .body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #f5f5f5;
    padding: 0.5vw 1vw;
    gap: 0.5vw;
    //margin-bottom: 15px;

    .goods-item {
      width: calc(50% - 0.5vw); // 减去间隔的一半，使其总宽度为50%
      flex: 1 1 48%;
      box-sizing: border-box;
      padding: 4vw 6.5vw;
      //margin: 0 0;
      text-align: center;
      background-color: #fff;
      border-radius: 4vw;
      transition: all .5s;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }

      img {
        width: 37.2vw;
        height: 37.2vw;
      }

      p {
        padding-top: 2.325vw;
      }

      .name {
        font-size: 3.72vw;
      }

      .desc {
        color: #999;
        height: 6.7425vw;
      }

      .price {
        color: $priceColor;
        font-size: 4.65vw;
      }
    }

    .goods-item:nth-last-child(-n+2) {
      margin-bottom: 15.5vw;
    }
  }

  .pagination-container {
    //padding-bottom: 20px;
    //margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>