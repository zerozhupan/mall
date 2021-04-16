<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      scroll: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    scrollTo(x, y, time = 300) {
      // console.log("调用回到顶部方法");
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
  },
  created() {},
  // 注意这里不要写munted，写在update里面 updated()
  //------------分割线----------------------
  // 但是写在updated里面就无法使用返回顶部的功能。写在munted里面 然后加一个延时就可以了
  mounted() {
    setTimeout(() => {
      // 通过document.queryselector拿标签的话，会取出项目当中所有符合名字的标签，这个时候要用ref来取
      // 如果给组件绑定了ref属性，那么this.$refs.name 拿到的是组件
      // 如果是普通标签绑定了ref属性，那么this.$refs.name 拿到的是标签
      //------------分割线----------------------
      // 1. 创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });
      // 2. 监听滚动位置
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });

      // 3.监听上拉事件
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载更多");
        this.$emit("pullingUp");
      });
    }, 1000);
  },
};
</script>
<style scoped>
</style>