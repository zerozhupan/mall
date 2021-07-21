import BackTop from "components/content/backTop/BackTop.vue";
export const itemListenerMixin = {
  data() {
    return {
      imgLoadListener: null,
    }
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    this.imgLoadListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.imgLoadListener);
  }
}

export const bsckTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowTop: false,
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
      console.log(this.$refs);
    },
  }
}