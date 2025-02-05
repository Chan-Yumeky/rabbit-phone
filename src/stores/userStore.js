// 管理用户数据相关

import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi } from "@/apis/user.js";
import { useCartStore } from "@/stores/cartStore.js";
import { mergeCartAPI } from "@/apis/cart.js";

export const useUserStore = defineStore('user',() => {
    const cartStore = useCartStore()
    // 定义管理用户数据的state
    const userInfo = ref({})
    // 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginApi({ account, password })
        userInfo.value = res.result
        // 合并购物车的操作
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        await cartStore.updateNewList()

    }

    // 退出时清除用户数据
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }

    // 以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true
})
