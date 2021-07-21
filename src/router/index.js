import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>
  import ('../views/home/Home')
const Category = () =>
  import ('../views/category/Category')
const Cart = () =>
  import ('../views/cart/Cart')
const Profile = () =>
  import ('../views/profile/Profile')
const Detail = () =>
  import ('../views/detail/Detail.vue')
Vue.use(VueRouter)
  // 2.创建router
const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
    routes,
    // mode: 'history'
  })
  //   // 避免重复点击报错
  // const VueRouterPush = VueRouter.prototype.push
  // VueRouter.prototype.push = function push(to) {
  //   return VueRouterPush.call(this, to).catch(err => err)
  // }

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

export default router