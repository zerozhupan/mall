import Vue from "vue"
import Vuex from "vuex"
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//1.安装插件
Vue.use(Vuex)
const state = {
  // 数组里面放 商品1， 商品2等对象
  cartList: []
};
// 2.创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

// 3.挂载到Vue实例上
export default store