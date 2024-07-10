<script setup>
import { Icon } from '@iconify/vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();
</script>

<template>
  <footer class="app_footer">
    <ul class="footer">
      <RouterLink to="/">
        <li :class="{ active: route.path === '/' }">
          <Icon icon="ph:rabbit-fill" style="width: 7vw; height: 7vw"/>
          <p>首页</p>
        </li>
      </RouterLink>
      <RouterLink to="/dynamic">
        <li :class="{ active: route.path === '/dynamic' }">
          <Icon icon="ph:hand-grabbing-duotone" style="width: 7vw; height: 7vw"/>
          <p>动态</p>
        </li>
      </RouterLink>
      <RouterLink to="/cart">
        <li :class="{ active: route.path === '/cart' }">
          <Icon icon="ph:shopping-cart-duotone" style="width: 7vw; height: 7vw"/>
          <p>购物车</p>
        </li>
      </RouterLink>
      <RouterLink to="/my-rabbit">
        <li :class="{ active: route.path === '/my-rabbit' }">
          <Icon icon="mdi:rabbit" style="width: 7vw; height: 7vw"/>
          <p>我的小兔</p>
        </li>
      </RouterLink>
    </ul>
  </footer>
</template>

<style scoped lang="scss">
.app_footer {
  width: 100%;

  .footer {
    width: 100%;
    height: 15vw;
    border-top: solid 1px #ddd;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0; /* 确保没有多余的内边距 */

    a {
      flex: 1;

      li {
        flex: 1; /* 每个 li 元素均等分配剩余空间 */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #999;
        user-select: none;
        cursor: pointer;
        text-align: center; /* 确保文本居中 */

        p {
          font-size: 3vw;
        }

        &:hover,
        &.active {
          color: $xtxColor;
          //border-bottom: 1px solid $xtxColor;
        }
      }
    }
  }
}
</style>
