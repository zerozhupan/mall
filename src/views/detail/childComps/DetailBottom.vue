<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="bar-icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="bar-icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="bar-icon collect"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBottom.vue",
  data() {
    return {};
  },
  methods: {
    addToCart() {
      this.$emit("addToCart");
    },
  },
  components: {},
};
</script>
<style scoped>
.bottom-bar {
  width: 100%;
  height: 49px;
  position: fixed;
  z-index: 100;
  bottom: 0;
  background-color: #fff;
  display: flex;
  text-align: center;
  color: #333;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
.bar-left {
  font-size: 14px;
}
.bar-left .bar-icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
/* 上面写了.bar-left， 下面也要写，否则权重没人家高，改不了位置 */
.bar-left .service {
  background-position: 0 -54px;
}
.bar-left .shop {
  background-position: 0 -98px;
}
.bar-right {
  line-height: 49px;
}
.bar-right .cart {
  background-color: rgb(255, 223, 16);
  color: #333;
}
.bar-right .buy {
  background-color: var(--color-high-text);
  color: #fff;
}
</style>