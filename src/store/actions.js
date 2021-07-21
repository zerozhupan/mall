export default {
  addCart(context, payload) {
    // {state, commit} = context 
    return new Promise((resolve, reject) => {
      // payload 是新添加的商品，先看一下数组当中是否已经有了当前添加的商品
      // 已经有了：那么数量+1
      // 还没有：将该商品push到cartList当中
      // state.cartList.push(payload);
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit('addCount', oldProduct)
        resolve("当前商品数量＋1")
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit('addToCart', payload)
        resolve("成功加入购物车")
      }
    })
  }
}