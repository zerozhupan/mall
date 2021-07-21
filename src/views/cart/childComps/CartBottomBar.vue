<template>
  <div class="bottom-bar">
    <check-button
      class="check-button"
      :is-checked="isAll"
      @click.native="bottomClick"
    ></check-button>
    <span>全选</span>
    <span class="total-price">合计：￥{{ totalPrice }}</span>
    <div class="checked-count" @click="checkClick">
      去结算({{ checkedCount }})
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {
      selectAll: false,
    };
  },
  computed: {
    ...mapGetters(["cartList", "cartLength"]),
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((pre, item) => {
          return pre + item.realPrice.slice(1) * item.count;
        }, 0)
        .toFixed(2);
    },
    checkedCount() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isAll() {
      if (this.cartList.filter((item) => item.checked).length == 0) {
        return false;
      } else {
        return (
          this.cartList.filter((item) => item.checked).length ===
          this.cartList.length
        );
      }
    },
  },
  methods: {
    bottomClick() {
      if (this.isAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    checkClick() {
      if (this.checkedCount == 0) {
        this.$toast.show("当前没有选中的商品");
      }
    },
  },
  components: {
    CheckButton,
  },
};
</script>
<style scoped>
.bottom-bar {
  display: flex;
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 49px;
  padding: 10px;
  background-color: #eee;
  font-size: 14px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.total-price {
  flex: 1;
  text-align: center;
}
.checked-count {
  position: relative;
  height: 40px;
  width: 100px;
  bottom: 10px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: var(--color-tint);
}
</style>