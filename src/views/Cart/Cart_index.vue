<script setup>
import { Icon } from "@iconify/vue";
import { useCartStore } from "@/stores/cartStore.js";
import { useUserStore } from "@/stores/userStore.js";
import GoodsList from "@/components/GoodsList/GoodsList_index.vue";
import BackToTop from "@/components/BackToTop/BackToTop_index.vue";
import { useRouter } from "vue-router";
import {ElMessage} from "element-plus";


const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter()

// 单选回调
const singleCheck = ( i, selected ) => {
  console.log( i, selected )
  cartStore.singleCheck(i.skuId, selected)
}

const allCheck = (selected) => {
  cartStore.allCheck(selected)
}

const goToPay = () => {
  if (userStore.userInfo.token){
    router.push('/checkout')
  }else {
    ElMessage({
      message:'用户未登录',
      type: 'warning',
    })
    router.push('/my-rabbit')
  }
}

</script>

<template>
  <div class="wrapper">
    <!-- 顶部标题栏   -->
    <div class="head_title">
      <div class="title">
        <h3>购物车</h3>
        <p v-if="cartStore.cartList.length !== 0">({{ cartStore.cartList.length }})</p>
      </div>
      <div class="address">
        <p><Icon icon="weui:location-outlined" width="3vw" height="3vw"  style="color: black" />云南大学呈贡校区楠苑  <Icon icon="formkit:right" width="2.8vw" height="2.8vw"  style="color: black" /></p>
      </div>
    </div>

    <!-- 购物车列表  -->
    <div class="layer">
      <template v-if="cartStore.cartList.length === 0">
        <div class="empty">
          <img src="@/assets/images/shopping-venture-1026511_640.jpg" alt="">
          <p>购物车竟然是空的</p>
          <small>再忙，也要记得买点什么犒赏自己~</small>
        </div>
        <div class="like">
          <p>-· <Icon icon="line-md:heart-twotone" width="4vw" height="4vw"  style="color: #d13f00" />你可能还喜欢 ·-</p>
        </div>
        <GoodsList />
      </template>

      <template v-else>
        <!--  购物车标题    -->
        <div class="layer_head">
          <div class="layer_checkbox">
            <el-checkbox :model-value="cartStore.isAll" @change="allCheck" />
          </div>
          <p>高仿品牌旗舰店<Icon icon="formkit:right" width="3vw" height="3vw"  style="color: black" /></p>
        </div>

        <!--  购物车列表信息    -->
        <div class="list">
          <div class="item" v-for="i in cartStore.cartList" :key="i">
            <div class="item_checkbox">
              <!--
              为了在它默认参数(selected)的基础上再增加一个额外的参数(skuId)
              将事件绑定采用回调函数的方式
                           -->
              <el-checkbox :model-value="i.selected" @change="(selected) => singleCheck(i, selected)" />
            </div>
            <RouterLink to="">
              <img :src="i.picture" alt="" />
              <div class="center">
                <p class="name ellipsis-2">
                  {{ i.name }}
                </p>
                <p class="attr ellipsis">{{ i.attrsText }}</p>
                <p class="discount">每300减30 · 假一赔四 · 极速退款</p>
                <p class="price">&yen;{{ i.price }}</p>
              </div>
              <div class="right">
                <p class="count">x{{ i.count }}</p>
              </div>
            </RouterLink>
            <i class="iconfont icon-close-new" @click="cartStore.delCart(i.skuId)"></i>
          </div>
        </div>
      </template>

      <BackToTop />


    </div>

  </div>

  <!-- 底部结算栏   -->
  <div class="pay">
    <div class="pay_checkbox">
      <el-checkbox size="large" v-if="cartStore.cartList.length !== 0" :model-value="cartStore.isAll" @change="allCheck"/>
      <p v-if="cartStore.cartList.length !== 0">全选</p>
    </div>
    <div class="calculate_and_pay">
      <div class="calculate">
        <p v-if="cartStore.selectedCount !== 0">已选{{ cartStore.selectedCount }}件，</p>
        <h4>合计:</h4>
        <small class="price">
          <Icon icon="streamline:yuan" width="2.5vw" height="2.5vw"  style="color: #d56001" />
          {{ cartStore.selectedPrice.toFixed(2) }}
        </small>
      </div>
      <div class="pay_button">
        <el-button style="border-radius: 4.65vw; width: 25vw; height: 9.3vw" size="large" type="warning" @click="goToPay">结算</el-button>
      </div>
    </div>
  </div>


</template>

<style scoped lang="scss">
.wrapper {
  width: 100vw;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30vw;


  .head_title {
    width: 100%;
    height: 10vw;
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: #fff;
    margin: 1vw 1vw;
    padding: 0 2vw;


    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 2vw;

      h3 {
        font-size: 4.5vw;
      }

      p {
        font-size: 2.5vw;

      }
    }

    .address{
      width: 40vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: clip;
      display: flex;
      align-items: center;
    }
  }

  .layer {
    width: 96%;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    border-radius: 4vw;
    margin: 2vw 2vw;
    //justify-content: left;
    //align-items: center;


    .empty {
      height: 120vw;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #fff;

      img {
        width: 25vw;
        height: 25vw;
        border: none;
        border-radius: 12.5vw;
        margin: 5vw 0;
      }

      p {
        margin-bottom: 2.5vw;
      }

      small {
        color: #999;
      }
    }

    .like {
      padding: 1vw 1vw;
      margin-bottom: 0.5vw;
      width: 100%;
      height: 6vw;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;

      p {
        color: #e14e0c;
        font-size: 4vw;
      }
    }

    .layer_head {
      width: 100%;
      height: 10vw;

      display: flex;
      justify-content: left;
      align-items: center;

      .layer_checkbox {
        width: 10vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      p {
        font-size: 3vw;
      }

    }
    .list {
      //height: 310px;
      overflow: auto;
      //padding: 0 10px;

      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #f8f8f8;
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: #eee;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #ccc;
      }

      .item {
        border-bottom: 1px solid #f5f5f5;
        padding: 2vw 0;
        position: relative;
        display: flex;


        .item_checkbox {
          width: 10vw;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        i {
          position: absolute;
          bottom: 11vw;
          right: 4vw;
          opacity: 0;
          color: #666;
          transition: all 0.5s;
        }

        &:hover {
          i {
            opacity: 1;
            cursor: pointer;
          }
        }

        a {
          display: flex;
          align-items: center;

          img {
            height: 80px;
            width: 80px;
          }

          .center {
            padding: 0 10px;
            width: 42vw;

            .name {
              font-size: 3vw;
            }

            .attr {
              color: #999;
              padding-top: 1.2vw;
              font-size: 2.8vw;
            }

            .discount {
              color: orange;
              font-size: 2.5vw;
              padding-top: 1vw;
            }

            .price {
              font-size: 3.72vw;
              color: $priceColor;
              padding-top: 1vw;
            }
          }

          .right {
            width: 20vw;
            //padding-right: 20px;
            text-align: center;



            .count {
              color: #999;
              margin-top: 5px;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}

.pay {
  width: 100vw;
  height: 12vw;
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 15vw;
  z-index: 100;

  .pay_checkbox {
    width: 15vw;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin-left: 1vw;
      font-size: 2.8vw;
    }
  }

  .calculate_and_pay {
    width: 70vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .calculate {
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;

      h4 {
        font-size: 2.8vw;
      }

      .price {
        font-size: 4.2vw;
        color: $priceColor;
      }
    }

    .pay_button {
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4vw;

      .el-button>span {
          font-size: 3.2vw;
          font-weight: 600;
        }


    }

  }

}

</style>