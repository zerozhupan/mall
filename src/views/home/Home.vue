<template>
  <div id="home">
    <nav-bar class="hone-nav"><div slot="center">购物天堂</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="2"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <!-- 一定要:绑定属性，要不然传过去的就是字符串 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top v-show="isShowTop" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

// import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "Home",
  components: {
    NavBar,
    // Swiper,
    // SwiperItem,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      cunrrentType: "pop",
      isShowTop: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.cunrrentType].list;
    },
  },
  // 什么时候发送网络请求？在组件创建完成之后就马上发送。用到生命周期函数
  created() {
    this.getHomeData();
    this.getHomeGood("pop");
    this.getHomeGood("new");
    this.getHomeGood("sell");
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.cunrrentType = "pop";
          break;
        case 1:
          this.cunrrentType = "new";
          break;
        case 2:
          this.cunrrentType = "sell";
          break;
      }
    },
    // 组件不能直接监听点击事件, @click.native="backClick"
    backClick() {
      // this.$refs.scroll拿到的是本页面的scroll组件（一定要绑定ref属性aaaa），后面的scroll是该组件的属性，再后面是该属性的方法，不过为了清晰，可以换一种写法（该方法需要在scroll组件中封装scrollTo方法）
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    contentScroll(position) {
      // console.log(-position.y > 1000);
      this.isShowTop = -position.y > 700;
    },

    loadMore() {
      this.getHomeGood(this.cunrrentType);
      this.$refs.scroll.finishPullUp();
      this.$refs.scroll.scroll.refresh();
    },
    /**
     * 网络请求相关方法
     */
    getHomeData() {
      // 1.请求多个数据(是一个异步操作)
      getHomeMultidata().then((res) => {
        // res是临时变量，等函数调用结束就会被释放,所以需要变量banners,recommends用来保存res。res包含很多的数据
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGood(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res.data.list);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.hone-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  background-color: #fff;
  position: sticky;
  top: 44px;
  z-index: 9;
}
/* .content {
  height: 300px;
  overflow: hidden;
  height: calc(100% - 49px);
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
