<script setup>
import LayoutHeader_Phone from "@/views/Layout/components/LayoutHeader_Phone.vue";
import LayoutFooter_Phone from "@/views/Layout/components/LayoutFooter_Phone.vue";
import BackToTop from "@/components/BackToTop/BackToTop_index.vue";
// 出发获取导航列表的action
import { useCategoryStore } from '@/stores/categoryStore.js'
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const categoryStore = useCategoryStore()
const route = useRoute();

onMounted(() => categoryStore.getCategory())

const showHeader = computed(() => {
  const path = route.path;
  return !(path === '/dynamic' || path === '/cart' || path === '/my-rabbit');
});
</script>

<template>
<!--  路由出口-->
  <LayoutHeader_Phone v-if="showHeader"/>
  <RouterView />
  <LayoutFooter_Phone />
  <BackToTop />
</template>