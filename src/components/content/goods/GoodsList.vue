<template>
  <div class="goods-list">
    <goods-list-item
      v-for="item in goods"
      :listItem="item"
      class="goods-list-item"
    />
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
  components: { GoodsListItem },
};
</script>
<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>