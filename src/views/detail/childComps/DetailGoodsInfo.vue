<template>
  <div class="detail-goods">
    <div class="info-desc">
      <div class="begin"></div>
      <p>{{ detailInfo.desc }}</p>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        alt=""
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {},
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    imgLoad() {
      // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    },
  },
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.detail-goods {
  padding: 25px 0;
}
.info-desc,
.info-key {
  padding: 0 15px;
}
.begin,
.end {
  width: 100px;
  height: 1px;
  background-color: #333;
  position: relative;
}
.begin {
  float: left;
}
.end {
  float: right;
}
.begin::before,
.end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.end::after {
  right: 0;
}
.info-desc p {
  display: inline-block;
  padding: 20px 0;
  font-size: 14px;
}
.info-key {
  color: #333;
  padding-bottom: 10px;
}
.info-list img {
  width: 100%;
}
</style>