<template>
  <div class="toast" v-show="isShow">{{ message }}</div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, duration = 1500) {
      console.log(message);
      this.message = message;
      console.log(this.message);
      this.isShow = true;
      setTimeout(() => {
        this.message = "";
        this.isShow = false;
      }, duration);
    },
  },
  components: {},
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  color: #fff;
  border-radius: 5px;
  z-index: 999;
}
</style>