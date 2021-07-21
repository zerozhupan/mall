<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="loadImage" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  methods: {
    loadImage() {
      if (!this.isLoad) {
        this.$emit("loadImage");
        this.isLoad = true;
      }
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
<style scoped>
</style>