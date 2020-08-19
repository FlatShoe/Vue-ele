import vue from 'vue'
import vueRouter from 'vue-router'

vue.use(vueRouter)

const Goods = () => import('../pages/goods/goods.vue')
const Ratings = () => import('../pages/ratings/ratings.vue')
const Sellers = () => import('../pages/sellers/sellers.vue')

const routes = [
  {
    path: '',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/sellers',
    component: Sellers
  }
]

const router =  new vueRouter({
  routes,
  linkActiveClass: 'active'
})

export default router