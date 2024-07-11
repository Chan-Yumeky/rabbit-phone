<script setup>
import { ref, onMounted } from "vue";
import { getCheckInfoAPI, createOrderAPI } from "@/apis/checkout.js";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore.js";
import { Icon } from "@iconify/vue";
import {ElMessage} from "element-plus";
const checkInfo = ref({})  // 订单对象
const curAddress = ref({})
const router = useRouter()
const cartStore = useCartStore()
const getCheckInfo = async () => {
  const res = await getCheckInfoAPI()
  checkInfo.value = res.result
  // 适配默认地址
  // 从地址列表中筛选出来 isDefault === 0 那一项
  const item = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
  curAddress.value = item
}
onMounted(() => getCheckInfo())
// 控制弹窗打开
const showDialog = ref(false)
// 切换地址
const activeAddress = ref({})
const switchAddress = (item) => {
  activeAddress.value = item
}
const confirm = () => {
  curAddress.value = activeAddress.value
  showDialog.value = false
  activeAddress.value = {}
}
const cancel = () => {
  showDialog.value = false
  activeAddress.value = {}
}
// 创建订单
const createOrder = async () => {
  const res = await createOrderAPI({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods: checkInfo.value.goods.map(item => {
      return {
        skuId: item.skuId,
        count: item.count
      }
    }),
    addressId: curAddress.value.id
  })
  const orderId = res.result.id
  router.push({
    path:'/',
    query:{
      id: orderId
    }
  })
  ElMessage({
    message:'订单提交成功',
    type: "success"
  })
  // 更新购物车
  await cartStore.updateNewList()
}
const goBackToCart = () => {
  router.push({
    path: '/cart'
  })
}


</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title"><Icon icon="formkit:left" width="3.5vw" height="3.5vw"  style="color: black" @click="goBackToCart"/> 收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <div class="goods_box">
            <table class="goods">
              <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
<!--                <th width="170">小计</th>-->
                <th width="170">实付</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right ellipsis">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
<!--                <td>&yen;{{ i.totalPrice }}</td>-->
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large" >提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="80%" center>
    <div class="addressWrapper">
      <div class="text item" :class="{ active:activeAddress.id === item.id }" @click="switchAddress(item)" v-for="item in checkInfo.userAddresses"  :key="item.id">
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 4.65vw;
  width: 100vw;
  .container {
    width: 100vw;
    .wrapper {
      width: 100vw;
      background: #fff;
      padding: 0 4.65vw;
      .box-title {
        font-size: 3.5vw;
        font-weight: normal;
        padding-left: 2.3vw;
        line-height: 10vw;
        border-bottom: 1px solid #f5f5f5;
      }
      .box-body {
        padding: 2.4vw 0;
        .goods_box {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .goods {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          .info {
            display: flex;
            text-align: left;
            img {
              width: 16vw;
              height: 16vw;
              margin: 0 1vw;
            }
            .right {
              width: 35vw;
              line-height: 5.5vw;
              p {
                font-size: 2.8vw;
                &:last-child {
                  font-size: 2.5vw;
                  color: #999;
                }
              }
            }
          }
          tr {
            th {
              background: #f5f5f5;
              font-weight: normal;
            }
            td,
            th {
              text-align: center;
              padding: 0.8vw;
              border-bottom: 1px solid #f5f5f5;
              &:first-child {
                border-left: 1px solid #f5f5f5;
              }
              &:last-child {
                border-right: 1px solid #f5f5f5;
              }
            }
          }
        }
      }
    }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f1f1;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    >ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    >a {
      color: $xtxColor;
      width: 37.2vw;
      text-align: center;
      height: 20.925vw;
      line-height: 20.925vw;
      border-right: 0.2325vw solid #f5f5f5;
    }
  }
  .action {
    width: 100%;
    text-align: center;
    padding-bottom: 1vw;
    .btn {
      width: 32.55vw;
      height: 10.695vw;
      line-height: 10.23vw;
      font-size: 3.255vw;
      &:first-child {
        margin-right: 2.325vw;
      }
    }
  }
}
.my-btn {
  width: 190px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 11.16vw;
  margin-right: 1.1625vw;
  margin-bottom: 1.1625vw;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}
.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;
  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;
    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }
    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>