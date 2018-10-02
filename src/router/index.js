import Vue from 'vue'
import Router from 'vue-router'
import GoodLists from '@/views/GoodLists'
import Cart from "../views/Cart.vue"
import Address from "../views/Address.vue"
import orderConfirm from "../views/OrderConfirm.vue"
import orderSuccess from "../views/OrderSuccess.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodLists',
      component: GoodLists
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    }
  ]
})
