import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const moment = require('moment')
require('moment/locale/ru')
Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
