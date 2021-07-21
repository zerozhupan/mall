<template>
  <div id="titleItem">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DetailNav",
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>
<style scoped>
#titleItem {
  flex: 1;
  font-size: 14px;
}
</style>