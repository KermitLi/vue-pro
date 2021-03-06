// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $http from 'vue-resource'
import utear from 'vue-utear'
import vueSimplemde from 'vue-simplemde'
import "vue-utear/dist/vue-utear.css"
import vueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

Vue.use($http);
Vue.use(utear);
Vue.use(vueMaterial);
Vue.use(vueSimplemde);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
