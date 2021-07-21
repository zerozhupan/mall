<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物天堂</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      :class="{ tabsticky: isSticky }"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isSticky"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="2"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @loadImage="loadImage"></home-swiper>
      <!-- 一定要:绑定属性，要不然传过去的就是字符串 -->
      <recommend-view
        :recommends="recommends"
        class="recommends"
      ></recommend-view>
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top v-show="isShowTop" @click.native="backTopClick"></back-top>
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
import { itemListenerMixin, bsckTopMixin } from "common/mixin.js";

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
    // BackTop,
  },
  mixins: [itemListenerMixin, bsckTopMixin],
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
      // isShowTop: false,
      tabOffsetTop: 0,
      isSticky: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.cunrrentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
    this.$bus.$off("itemImageLoad", this.imgLoadListener);
  },
  // 什么时候发送网络请求？在组件创建完成之后就马上发送。用到生命周期函数
  created() {
    this.getHomeData();
    this.getHomeGood("pop");
    this.getHomeGood("new");
    this.getHomeGood("sell");
  },
  mounted() {
    // 监听item中图片是否加载完成
    // 就算这里没写延时时间，也还是有防抖动的效果。因为setTimeOut里面的回调函数是异步函数，放在最后执行的
    // this.$bus.$on("itemImageLoad", () => {
    //   // this.$refs.scroll.refresh();
    //   // 这里报错的原因可能是：
    //   // 1.图片加载太快，但是scroll组件还没挂载，此时没有scroll对象，自然也没有refresh()--->在scroll组件中做一个判断
    //   // 2. 之前的监听图片是写在created里的，但这个是不合理的。因为很有可能拿不到this.$refs, 最好还是写在mounted里面
    //   // this.$refs.scroll.refresh();
    //   refresh();
    // });
  },
  methods: {
    /**
     * 事件监听相关方法
     */

    // 防抖函数
    /**
     *降频函数
     *这个 debounce 函数在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率。
     *调用:	debounce(function() {}, 250)
     * @param {*} func回调函数
     * @param {*} wait等待时间,推荐250
     * @param {*} immediate
     * @returns
     */
    debounce(func, wait) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, wait);
      };
    },
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 组件不能直接监听点击事件, @click.native="backClick"
    // backClick() {
    //   // this.$refs.scroll拿到的是本页面的scroll组件（一定要绑定ref属性aaaa），后面的scroll是该组件的属性，再后面是该属性的方法，不过为了清晰，可以换一种写法（该方法需要在scroll组件中封装scrollTo方法）
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },

    contentScroll(position) {
      // 1. 判断BackTop是否显示
      this.isShowTop = -position.y > 700;
      // 2. 决定tabControl是否吸顶效果（position：fixed）
      this.isSticky = -position.y >= this.tabOffsetTop;
    },

    loadMore() {
      this.getHomeGood(this.cunrrentType);
      this.$refs.scroll.finishPullUp();
    },
    loadImage() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;*/
}
.tab-control {
  background-color: #fff;
  /* position: sticky; */
}
.tabsticky {
  position: relative;
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
