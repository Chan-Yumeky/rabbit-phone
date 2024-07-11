<script setup>
import { getDetail } from "@/apis/detail.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { useCartStore } from "@/stores/cartStore.js";
// import ImageView from "@/components/ImageView/ImageView_index.vue";
// import XtxSku from "@/components/XtxSku/index.vue";
const cartStore = useCartStore()
const goods = ref({})
const route = useRoute()
const getGoods =async () => {
  const res = await getDetail( route.params.id )
  goods.value = res.result
}
onMounted(() => getGoods())

// sku规格被操作时
let skuObj = {}
const skuChange = (sku) => {
  console.log(sku)
  skuObj = sku
}

// count
const count = ref(1)
const countChange = (count) => {
  console.log(count)
}

// 添加购物车
const addCart = () => {
  if (skuObj.skuId) {
    // 规格已经选择 触发action
    cartStore.addCart({
      id: goods.value.id, // 商品id
      name: goods.value.name, // 商品名称
      picture: goods.value.mainPictures[0], // 图片
      price: goods.value.price, // 最新价格
      count: count.value, // 商品数量
      skuId: skuObj.skuId, // skuId
      attrsText: skuObj.specsText, // 商品规格文本
      selected: true // 商品是否选中
    })
  } else {
    // 规格没有选择 提示用户
    ElMessage.warning('请选择规格')
  }
}
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods.details">
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <!-- 经过全局注册通用组件XtxImageView，无需再次引入ImageView组件 -->
              <XtxImageView :image-list="goods.mainPictures"/>

              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p> {{ goods.salesCount }} </p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ goods.commentCount }}</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ goods.collectCount }}</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <!--<p>{{ goods.brand.name }}</p>-->
                  <p>高仿品牌</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>

            <!-- 商品信息区 -->
            <div class="spec">
              <p class="g-name"> {{ goods.name }} </p>
              <p class="g-desc"> {{ goods.desc }} </p>
              <p class="g-price">
                <span> {{ goods.oldPrice }} </span>
                <span> {{ goods.price }} </span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>

              <!-- sku组件 -->
              <!-- 经过全局注册通用组件XtxSku，无需再次引入XtxSku组件 -->
              <XtxSku :goods="goods" @change="skuChange" />
              <div class="add_count">
               <!-- 数据组件 -->
                <el-input-number class="counter" v-model="count" :min="1" @change="countChange" />
               <!-- 按钮组件 -->
                <el-button size="large" class="btn" @click="addCart">
                  加入购物车
                </el-button>
              </div>
            </div>
          </div>

          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="img in goods.details.pictures" :src="img" :key="img" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
* {
  box-sizing: border-box;
}

.xtx-goods-page {
  margin-top: 20vw;
  width: 100vw;
  .container{
    width: 100vw;
  }
  .goods-info {
    width: 100%;
    background: #fff;
    .media {
      width: 100%;
      overflow: hidden;
      img{
        max-width: 100%;
        height: auto;
      }
    }
    .spec {
      flex: 1;
      padding: 6.98vw 6.98vw;
      .add_count {
        display: flex;
        align-items: center;
        justify-content: center;
        .counter {
          margin: 0 2vw;
        }
      }
    }
  }
  .goods-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 4.65vw;
    .goods-article {
      width: 100%;
      margin-right: 4.65vw;
    }
  }
  .goods-tabs {
    background: #fff;
  }
  .goods-warn {
    background: #fff;
    margin-top: 4.65vw;
  }
  .number-box {
    display: flex;
    align-items: center;
    .label {
      width: 13.95vw;
      color: #999;
      padding-left: 2.33vw;
    }
  }
  .g-name {
    font-size: 5.12vw;
  }
  .g-desc {
    color: #999;
    margin-top: 2.33vw;
  }
  .g-price {
    margin-top: 2.33vw;
    span {
      &::before {
        content: "¥";
        font-size: 3.26vw;
      }
      &:first-child {
        color: $priceColor;
        margin-right: 2.33vw;
        font-size: 5.12vw;
      }
      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 3.72vw;
      }
    }
  }
  .g-service {
    background: #f5f5f5;
    width: 100%;
    padding: 4.65vw 2.33vw 0 2.33vw;
    margin-top: 2.33vw;
    dl {
      padding-bottom: 4.65vw;
      display: flex;
      align-items: center;
      dt {
        width: 11.63vw;
        color: #999;
      }
      dd {
        color: #666;
        &:last-child {
          span {
            margin-right: 2.33vw;
            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 0.47vw;
            }
          }
          a {
            color: $xtxColor;
          }
        }
      }
    }
  }
  .goods-sales {
    display: flex;
    width: 100vw;
    align-items: center;
    text-align: center;
    height: 32.56vw;
    li {
      flex: 1;
      position: relative;
      ~li::after {
        position: absolute;
        top: 2.33vw;
        left: 0;
        height: 13.95vw;
        border-left: 0.23vw solid #e4e4e4;
        content: "";
      }
      p {
        &:first-child {
          color: #999;
        }
        &:nth-child(2) {
          color: $priceColor;
          margin-top: 2.33vw;
        }
        &:last-child {
          color: #666;
          margin-top: 2.33vw;
          i {
            color: $xtxColor;
            font-size: 3.26vw;
            margin-right: 0.47vw;
          }
          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.goods-tabs {
  background: #fff;
  nav {
    height: 16.28vw;
    line-height: 16.28vw;
    display: flex;
    border-bottom: 0.23vw solid #f5f5f5;
    a {
      padding: 0 5vw;
      font-size: 4.19vw;
      position: relative;
      > span {
        color: $priceColor;
        font-size: 3.72vw;
        margin-left: 2.33vw;
      }
    }
  }
}

.goods-detail {
  margin-bottom: 34.88vw;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 6.98vw;
    img {
      width: 93.02vw;
      height: auto;
    }
    li {
      display: flex;
      flex: 1 50%;
      margin-bottom: 2.33vw;
      margin-left: 5vw;
      width: 11.63vw;
      .dt {
        width: 15vw;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
.btn {
  margin: 0 2vw;
}
.bread-container {
  padding: 5.81vw 0;
}
</style>