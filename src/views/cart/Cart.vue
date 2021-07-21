<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 这么写getters确实没有必要，要封装getters还要导入。
    // cartLenght() {
    //   return this.$store.getters.cartLength;
    // },
    // 有更好的方法 mapGetters 辅助函数
    // 用法1：数组
    // ...mapGetters(["cartLength", "cartList"]),
    // 用法2：对象
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
</style>
