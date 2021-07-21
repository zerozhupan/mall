<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <detail-nav ref="nav" v-for="(item, index) in title">
          <div
            @click="titleClick(index)"
            :class="{ active: currentIndex == index }"
          >
            {{ item }}
          </div>
        </detail-nav>
      </div>
    </nav-bar>
    <scroll
      ref="scroll"
      class="content"
      @scroll="contentScroll"
      :pull-up-load="true"
      :probe-type="2"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad">
      </detail-goods-info>
      <detail-goods-params
        ref="params"
        :goods-param="goodsParam"
      ></detail-goods-params>
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <detail-bottom @addToCart="addToCart"></detail-bottom>
    <back-top v-show="isShowTop" @click.native="backTopClick"></back-top>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import DetailNav from "./childComps/DetailNav.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import {
  getDetail,
  getRecommend,
  GoodsInfo,
  ShopInfo,
  GoodsParam,
} from "network/detail.js";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailGoodsParams from "./childComps/DetailGoodsParams.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import { itemListenerMixin, bsckTopMixin } from "common/mixin.js";
import DetailBottom from "./childComps/DetailBottom.vue";
import { mapActions } from "vuex";
// import Toast from "../../components/common/totast/Toast.vue";

export default {
  name: "Detail",
  mixins: [itemListenerMixin, bsckTopMixin],
  data() {
    return {
      iid: null,
      title: ["商品", "参数", "评论", "精选"],
      currentIndex: 0,
      topImages: [],
      goods: {
        columns: [],
        services: [(name = "")],
      },
      shop: {},
      detailInfo: {
        detailImage: [""],
      },
      goodsParam: {
        sizes: [],
        infos: [],
      },
      commentInfo: {},
      recommend: [],
      detailTopYs: [],
      getOffsetTop: null,
    };
  },
  components: {
    NavBar,
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    GoodsList,
    DetailBottom,
    // Toast,
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;
    // 2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
      // console.log(this.topImages);
      // console.log(res.result.shopInfo);
      this.goods = new GoodsInfo(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      this.shop = new ShopInfo(res.result.shopInfo);

      this.detailInfo = res.result.detailInfo;

      this.goodsParam = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      );
      if (res.result.rate.list) {
        this.commentInfo = res.result.rate.list[0];
      }
    });

    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });

    // 获取offsetTop，添加防抖
    this.getOffsetTop = this.debounce(() => {
      this.detailTopYs[0] = 0;
      this.detailTopYs.push(this.$refs.params.$el.offsetTop);
      this.detailTopYs.push(this.$refs.comment.$el.offsetTop);
      this.detailTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.detailTopYs.push(Number.MAX_VALUE);
      // console.log(this.detailTopYs);
    }, 500);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.imgLoadListener);
  },
  methods: {
    backClick() {
      this.$router.back();
    },
    titleClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.detailTopYs[index], 300);
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getOffsetTop();
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.detailTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.detailTopYs[i] &&
          positionY < this.detailTopYs[i + 1]
        ) {
          this.currentIndex = i;
        }
      }
      this.isShowTop = -position.y > 700;
    },
    debounce(func, wait) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, wait);
      };
    },
    ...mapActions(["addCart"]),
    // 加入购物车事件
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.realPrice = this.goods.oldPrice;
      product.iid = this.goods.iid;
      // 2.将商品添加到购物车
      // this.$store.cartList.push(product) 不要这样写，修改任何数据最好进过mutations
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      this.addCart(product).then((res) => {
        console.log(res);
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
img {
  margin-top: 10px;
}
.title {
  display: flex;
}
.active {
  color: rgb(255, 81, 119);
}
.content {
  overflow: hidden;
  position: absolute;
  /* 这里上下左右都要写，特别是上下，否则就是高度不固定 */
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>