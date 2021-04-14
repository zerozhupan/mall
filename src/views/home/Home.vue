<template>
  <div>
    <nav-bar class="hone-nav"><div slot="center">购物天堂</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <!-- 一定要绑定属性，要不然传过去的就是字符串 -->
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView.vue";

import { getHomeMultidata } from "network/home";

// import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "Home",
  components: {
    NavBar,
    // Swiper,
    // SwiperItem,
    HomeSwiper,
    RecommendView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  // 什么时候发送网络请求？在组件创建完成之后就马上发送。用到生命周期函数
  created() {
    // 1.请求多个数据(是一个异步操作)
    getHomeMultidata().then((res) => {
      // res是临时变量，等函数调用结束就会被释放,所以需要变量banners,recommends用来保存res。res包含很多的数据
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
.hone-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
</style>
