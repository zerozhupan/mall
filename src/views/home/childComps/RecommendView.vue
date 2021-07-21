<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default: [],
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
.recommend {
  display: flex;
  padding: 15px 0;
  border-bottom: 8px solid #eee;
  background-color: #fff;
}
.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 6px;
}
</style>