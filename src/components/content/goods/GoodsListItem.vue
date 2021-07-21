<template>
  <div class="item" @click="goodItemClick">
    <img v-lazy="showImage" alt="" @load="loadMore" />
    <div class="item-info">
      <p>{{ listItem.title }}</p>
      <span class="price">{{ listItem.price }}</span>
      <span class="collect">{{ listItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    listItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    loadMore() {
      this.$bus.$emit("itemImageLoad");
    },
    goodItemClick() {
      this.$router.push("/detail/" + this.listItem.iid);
    },
  },
  computed: {
    showImage() {
      return this.listItem.img || this.listItem.image || this.listItem.show.img;
    },
  },
  components: {},
};
</script>
<style scoped>
.item {
  padding-bottom: 40px;
  position: relative;
  width: 45%;
}
.item img {
  width: 100%;
  border-radius: 5px;
}
.item .item-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.item .item-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.item .price {
  font-size: 14px;
  margin-right: 20px;
  color: rgb(255, 87, 119);
}
.item-info .collect {
  position: relative;
}
.item-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>