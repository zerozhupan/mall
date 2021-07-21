export default {
  // mutations唯一的目的就是修改state的状态，所以每个方法最好尽可能完成单一的事件，复杂的逻辑放到actions中。
  addCount(state, payload) {
    payload.count++;
  },
  addToCart(state, payload) {
    payload.checked = false;
    state.cartList.push(payload);
  }
}