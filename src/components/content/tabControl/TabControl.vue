<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      @click="itemClick(index)"
    >
      <span :class="{ active: index === currentIndex }">{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      console.log(index);
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
  components: {},
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 3px;
}
.active {
  border-bottom: 2px solid rgb(255, 87, 119);
  color: rgb(255, 87, 119);
}
</style>