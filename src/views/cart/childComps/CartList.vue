<template>
  <!-- 直接写scroll，不要再加一层了 -->
  <scroll class="content" ref="scroll" :pull-up-load="true" :probe-type="2">
    <cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :product="item"
    ></cart-list-item>
    <!-- <cart-list-item /> -->
  </scroll>
</template>
<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  data() {
    return {};
  },
  activated() {
    // 离开购物车页面然后再进入，better-scroll并不会自己计算高度，要做一次刷新。
    this.$refs.scroll.refresh();
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  methods: {},
  components: {
    Scroll,
    CartListItem,
  },
};
</script>
<style scoped>
.content {
  overflow: hidden;
  position: absolute;
  /* 这里上下左右都要写，特别是上下，否则就是高度不固定 */
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
}
</style>