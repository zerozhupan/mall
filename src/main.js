import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast/index.js'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.prototype.$bus = new Vue();
Vue.use(toast) // 相当于执行了toast.install
  // 解决移动端300ms延迟
FastClick.attach(document.body)
  // 使用懒加载
Vue.use(VueLazyLoad)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')