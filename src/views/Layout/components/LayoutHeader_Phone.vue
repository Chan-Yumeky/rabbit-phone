<script setup>
import { useCategoryStore } from "@/stores/categoryStore.js";
import { Search } from "@element-plus/icons-vue";
import { Icon } from '@iconify/vue'
import { ref } from "vue";
const text = ref('');

const categoryStore = useCategoryStore();
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="search">
        <el-button
            class="search-button"
            round
            plain
            style="border-radius: 4.5vw 0 0 4.5vw"
            type="info"
        >
          <Icon icon="tabler:scan" style="height: 5vw;width: 5vw"/>
        </el-button>
        <el-input
            class="search-input"
            v-model="text"
            placeholder="搜一搜"
            :prefix-icon="Search"
        >
        </el-input>
        <el-button
            class="search-button"
            round
            style="border-radius: 0 4.5vw 4.5vw 0; font-size: 3vw"
            type="success"
        >搜索</el-button>
      </div>

      <div class="app-header-nav_box">
        <el-scrollbar class="scrollbar-horizontal">
          <ul class="app-header-nav">
            <li class="home">
              <RouterLink to="/">推荐</RouterLink>
            </li>
            <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
              <RouterLink active-class="active" :to="`/category/${item.id}`">
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #666;
  z-index: 999;

  .container {
    width: 100%;
    height: 20vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    .search {
      width: 90%;
      justify-content: center;
      align-items: center;
      border-radius: 4.5vw;
      margin: 1vw auto;

      .search-button {
        width: 11%;
        height: 9vw;
        font-size: 3.5vw;
        border: none;
      }

      .search-input {
        width: 78%;
        height: 9vw;
        font-size: 3vw;
        border: none;
      }
    }

    .app-header-nav_box {
      width: 100%;
      height: 9vw;

      .scrollbar-horizontal {
        width: 100%;
        white-space: nowrap; // 确保内容不换行
        overflow-x: auto; // 启用横向滚动条

        ::-webkit-scrollbar {
          display: none;
        }
      }

      .app-header-nav {
        height: 9vw;
        display: inline-flex; // 确保 ul 内部的 li 水平排列
        padding-left: 2vw;
        padding-right: 2vw;
        position: relative;
        z-index: 998;

        li {
          margin: 3vw;
          text-align: center;
          justify-content: center;
          align-items: center;

          a {
            font-size: 3vw;
            color: #cccccc;


            &:hover {
              color: $xtxColor;
              border-bottom: 1px solid $xtxColor;
            }
          }

          .active {
            color: $xtxColor;
            border-bottom: 1px solid $xtxColor;
          }
        }
      }
    }
  }
}
</style>
