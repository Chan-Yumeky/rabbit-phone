//createRouter: 创建router实例对象
//createWebHistory: 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/Login_index.vue'
import Layout from '@/views/Layout/Layout_index.vue'
import Home from '@/views/Home/Home_index.vue'
import Category from '@/views/Category/Category_index.vue'
import SubCategory from "@/views/SubCategory/SubCategory_index.vue";
import Detail from "@/views/Detail/Detail_index.vue";
import Checkout from "@/views/Checkout/Checkout_index.vue";
import Pay from "@/views/Pay/Pay_index.vue";
import Dynamic from '@/views/Dynamic/Dynamic_index.vue'; // 新增动态页面
import Cart from '@/views/Cart/Cart_index.vue'; // 新增购物车页面
import MyRabbit from '@/views/MyRabbit/MyRabbit_index.vue'; // 新增我的小兔页面

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component对应关系的位置
  routes: [
    {
      path:'/',
      component: Layout,
      children:[
        {
          path:'',
          component:Home
        },
        {
          path:'category/:id',
          component:Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path:'detail/:id',
          component: Detail
        },
        {
          path: 'dynamic',
          component: Dynamic // 新增动态路由
        },
        {
          path: 'cart',
          component: Cart // 新增购物车路由
        },
        {
          path: 'my-rabbit',
          component: MyRabbit // 新增我的小兔路由
        }
      ]
    },
    {
      path:'/login',
      component: Login
    },
    {
      path:'/checkout',
      component: Checkout
    },
    {
      path: '/Pay',
      component: Pay
    },
  ],
  // 路由滚动行为
  scrollBehavior() {
    return{
      top:0
    }
  }
})

export default router
