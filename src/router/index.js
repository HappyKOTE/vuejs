import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '../pages/home.vue'

Vue.use(VueRouter)

const routes = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '*',
      name: 'page404',
      component: () => import('../pages/404.vue')
    },
    {
      path: '/add/payment/:payment',
      name: 'addPayment',
      component: home
    },
    {
      path: '/add/category/:category',
      name: 'addCategory',
      component: home
    },
    {
      path: '/edit/payment/:payment',
      name: 'editPayment',
      component: home
    }
  ]
})

const titles = {
  home: 'учёт финансов',
  page404: 'страниица не найдена',
  addPayment: 'добавление записи',
  addCategory: 'добавление категории платежей',
  editPayment: 'редактирование записи'
}

routes.afterEach((to, from) => {
  document.title = titles[to.name]
})

export default routes
