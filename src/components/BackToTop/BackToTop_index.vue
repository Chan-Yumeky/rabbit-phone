<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from "@iconify/vue";

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div :class="['scroll-to-top', { show: isVisible }]" @click="scrollToTop">
    <Icon icon="gg:push-up" width="4vw" height="4vw"  style="color: #878787" />
  </div>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 30vw;
  right: 20px;
  width: 10vw;
  height: 10vw;
  background-color: #fff;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(100px);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  z-index: 9999;
}
.scroll-to-top.show {
  opacity: 1;
  transform: translateY(0);
}
</style>
