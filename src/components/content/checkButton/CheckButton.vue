<template>
  <div class="button" :class="{ checked: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
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
.button {
  border-radius: 50%;
  border: 1px solid #aaa;
}
.checked {
  background-color: var(--color-tint);
  border: 1px solid var(--color-tint);
}
</style>