// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../store'
import $http from 'vue-resource'
import utear from 'vue-utear'
import "vue-utear/dist/vue-utear.css"
import vueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use($http)
Vue.use(utear)
Vue.use(vueMaterial)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  template: '<App/>',
  components: { App }
})
