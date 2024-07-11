<script setup>
import { Icon } from '@iconify/vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import {useUserStore} from "@/stores/userStore.js";
const userStore = useUserStore()
const confirm = () => {
  console.log('用户退出')
  // 退出登录逻辑
  // 清除用户信息 触发action
  userStore.clearUserInfo()
}
const open = () => {
  ElMessageBox.confirm(
      '确认退出吗?',
      '真的要离开吗TAT',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '用户已退出',
        });
        confirm()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '操作取消',
        })
      })
}
</script>

<template>
  <div class="wrapper">
    <!-- 顶部用户信息 -->
    <div class="top">
      <div class="left_side">
        <div class="head_portrait"></div>
        <div class="name">
          <h3>{{ userStore.userInfo.nickname }}</h3>
          <small>
            <Icon icon="weui:location-outlined" width="3vw" height="3vw"/> 收货地址  |  <Icon icon="lets-icons:shop-light" width="3vw" height="3vw"/> 关注店铺
          </small>
        </div>
      </div>
      <div class="right_side">
        <div class="customer_service">
          <Icon icon="mdi:customer-service" width="5vw" height="5vw" />
          <p>官方客服</p>
        </div>
        <div class="set">
          <Icon icon="iconamoon:settings-thin" width="5vw" height="5vw" />
          <p>设置</p>
        </div>
      </div>
    </div>
    <!-- 订单信息框 -->
    <div class="my_order">
      <div class="order_head">
        <h4>我的订单</h4>
        <p>全部<Icon icon="formkit:right" width="2.75vw" height="2.75vw" /></p>
      </div>
      <div class="order_list">
        <div class="orders">
          <Icon icon="system-uicons:wallet" width="7vw" height="7vw" />
          <p>待付款</p>
        </div>
        <div class="orders">
          <Icon icon="hugeicons:delivery-box-01" width="7vw" height="7vw" />
          <p>待发货</p>
        </div>
        <div class="orders">
          <Icon icon="circum:delivery-truck" width="7vw" height="7vw" />
          <p>待收货</p>
        </div>
        <div class="orders">
          <Icon icon="la:comment-dots-solid" width="7vw" height="7vw" />
          <p>待评价</p>
        </div>
        <div class="orders">
          <Icon icon="mingcute:refund-cny-line" width="7vw" height="7vw" />
          <p>退款/售后</p>
        </div>
      </div>
    </div>

    <!-- 杂项 -->
    <div class="other_things">
      <div class="post">
        <div class="o_head">
          <h4>快递<Icon icon="icon-park-twotone:right-c" width="3vw" height="3vw" style="margin-left: 1vw"/></h4>
          <small>查看快递信息</small>
        </div>
        <div class="post_detail">
          <div class="post_put">
            <Icon icon="mdi:package-variant-closed-delivered" width="5vw" height="5vw" style="margin-right: 1vw"/>
            查取件
          </div>
          <div class="post_put">
            <Icon icon="fa-regular:paper-plane" width="5vw" height="5vw" style="margin-right: 1vw"/>
            查寄件
          </div>
        </div>
      </div>
      <div class="collection">
        <div class="o_head">
          <h4>收藏<Icon icon="icon-park-twotone:right-c" width="3vw" height="3vw" style="margin-left: 1vw"/></h4>
          <small>查看最近收藏</small>
        </div>
        <div class="collection_detail">
          <img src="@/assets/images/fashion-1283863_640.jpg" alt="">
          <p><Icon icon="tdesign:ticket" width="3vw" height="3vw" style="margin: 0.2vw 0.5vw 0 0"/>有优惠</p>
          <p style="color: #ff581e">1000+收藏</p>
        </div>
      </div>
      <div class="footprint">
        <div class="o_head">
          <h4>足迹<Icon icon="icon-park-twotone:right-c" width="3vw" height="3vw" style="margin-left: 1vw"/></h4>
          <small>看过的商品和频道</small>
        </div>
        <div class="footprint_list">
          <div class="footprint_detail">
            <div class="footprint_icon" style="background-color: #fc9d1a">
              <Icon icon="game-icons:footprint" width="4.5vw" height="4.5vw" style="color: white" />
            </div>
            <p>我的足迹</p>
          </div>
          <div class="footprint_detail">
            <div class="footprint_icon" style="background-color: #1f92f1">
              <Icon icon="solar:airbuds-case-charge-linear" width="5vw" height="5vw" style="color: white" />
            </div>
            <p>充值中心</p>
          </div>
          <div class="footprint_detail">
            <div class="footprint_icon" style="background-color: #fa3a72">
              <Icon icon="line-md:calendar" width="5vw" height="5vw"  style="color: white" />
            </div>
            <p>活动日历</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="log_out">
    <el-button style="width: 99%; height: 100%; border-radius: 2vw" plain @click="open">退出登录</el-button>
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
  margin-top: 1vw;
  .top {
    display: flex;
    justify-content: space-between;
    width: 95%;
    height: 20vw;
    .left_side {
      display: flex;
      .head_portrait {
        width: 15vw;
        height: 15vw;
        margin: 2.5vw 2vw;
        border-radius: 7.5vw;
        border: solid 0.5vw #27ba9b;
      }
      .name {
        margin: 5vw 0;
        h3 {
          font-size: 3.8vw;
        }
        small {
          font-size: 2.75vw;
        }
      }
    }
    .right_side {
      display: flex;
      .customer_service {
        right: 0;
        width: 11vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 4vw;
        p {
          font-size: 2.5vw;
          line-height: 4vw;
        }
      }
      .set {
        right: 0;
        width: 10vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 4vw;
        p {
          font-size: 2.5vw;
          line-height: 4vw;
        }
      }
    }
  }
  .my_order {
    width: 95%;
    height: 20vw;
    background-color: #f1f1f1;
    margin-top: 1vw;
    border-radius: 2vw;
    .order_head {
      height: 6vw;
      display: flex;
      justify-content: space-between;
      h4 {
        margin-left: 3vw;
        font-size: 3vw;
        font-weight: 600;
        display: flex;
        align-items: center;
      }
      p {
        font-size: 2.75vw;
        margin-right: 2vw;
        display: flex;
        align-items: center;
      }
    }
    .order_list {
      height: 14vw;
      display: flex;
      flex: 1;
      .orders {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          font-size: 2.8vw;
          line-height: 5vw;
        }
      }
    }
  }
  .other_things {
    width: 95%;
    height: 40vw;
    background-color: #f1f1f1;
    margin-top: 3vw;
    border-radius: 2vw;
    display: flex;
    .post {
      width: 33.3%;
      height: 100%;
      padding: 1vw 0;
      .o_head{
        height: 30%;
        display: flex;
        flex-direction: column;
        margin-top: 1vw;
        h4 {
          height: 50%;
          margin-left: 3vw;
          font-size: 3vw;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        small {
          height: 50%;
          font-size: 2.5vw;
          line-height: 4vw;
          margin-left: 3vw;
        }
      }
      .post_detail {
        height: 70%;
        display: flex;
        flex-direction: column;
        .post_put {
          height: 50%;
          margin: 0 2vw 2vw;
          border-radius: 2vw;
          background-color: #dedede;
          font-weight: 600;
          color: rgba(0, 69, 110, 0.92);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .collection {
      width: 33.4%;
      height: 100%;
      padding: 1vw 0;
      border-left: solid 0.1vw;
      border-right: solid 0.1vw;
      border-image: linear-gradient(to bottom, #f1f1f1, #c7c7c7, #f1f1f1) 1;
      .o_head{
        height: 30%;
        display: flex;
        flex-direction: column;
        margin-top: 1vw;
        h4 {
          height: 50%;
          margin-left: 3vw;
          font-size: 3vw;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        small {
          height: 50%;
          font-size: 2.5vw;
          line-height: 4vw;
          margin-left: 3vw;
        }
      }
      .collection_detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 15vw;
          height: 15vw;
          margin: 1vw 1vw;
        }
        p {
          display: flex;
          text-align: center;
          margin-top: 0.5vw;
          font-size: 2.5vw;
        }
      }
    }
    .footprint {
      width: 33.3%;
      height: 100%;
      padding: 1vw 0;
      .o_head{
        height: 30%;
        display: flex;
        flex-direction: column;
        margin-top: 1vw;
        h4 {
          height: 50%;
          margin-left: 3vw;
          font-size: 3vw;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        small {
          height: 50%;
          font-size: 2.5vw;
          line-height: 4vw;
          margin-left: 3vw;
        }
      }
      .footprint_list {
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .footprint_detail {
          width: 100%;
          height: 33.3%;
          display: flex;
          align-items: center;
          .footprint_icon {
            width: 7vw;
            height: 7vw;
            border-radius: 3.5vw;
            margin-left: 4vw;
            margin-right: 1.5vw;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          p {
            font-size: 2.8vw;
          }
        }
      }
    }
  }
}
.log_out {
  width: 100vw;
  height: 12vw;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20vw;
}
</style>