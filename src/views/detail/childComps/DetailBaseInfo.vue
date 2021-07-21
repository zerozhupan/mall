<template>
  <div class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="price">{{ goods.price }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-services">
      <span
        class="info-services-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>
<style scoped>
.base-info {
  padding: 15px;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  /* padding: 15px; */
  color: #222;
  overflow: hidden;
  height: 2.4em;
  line-height: 1.2em;
}
.info-price {
  padding-top: 15px;
}
.price {
  color: var(--color-high-text);
  font-size: 24px;
}
.old-price {
  padding-left: 5px;
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}
.info-price .discount {
  position: relative;
  top: -10px;
  padding: 2px 5px;
  margin-left: 5px;
  background-color: var(--color-high-text);
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  text-align: center;
}
.info-other {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #999;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-services {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-top: 20px;
}
.info-services img {
  width: 14px;
  height: 14px;
}
.info-services span {
  font-size: 3.46667vw;
}
</style>