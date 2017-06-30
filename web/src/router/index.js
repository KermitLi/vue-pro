import Vue from 'vue'
import vueResouce from 'vue-resource';
import Router from 'vue-router'

import home from '../views/home';

import login from '../views/login';
import register from '../views/register';
import forgetPwd from '../views/forgetPwd';
import myProfile from '../views/myProfile';

import albums from '../views/albums.vue';
import photos from '../views/photos.vue';

import article from '../views/article.vue';
import post from '../views/post';

import news from '../views/news.vue';

Vue.use(Router);
Vue.use(vueResouce);

var router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/articles/:userName',
    name: 'myArticles',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/forgetPwd',
    name: 'forgetPwd',
    component: forgetPwd
  },
  {
    path: '/article/post',
    name: 'post',
    component: post
  },
  {
    path: '/article/edit/:id',
    name: 'edit',
    component: post
  },
  {
    path: '/article/:id',
    name: 'articleDetails',
    component: article
  },
  {
    path: '/albums/:albumId',
    name: 'photos',
    component: photos
  },
  {
    path: '/albums',
    name: "albums",
    component: albums
  },
  {
    path: '/myProfile',
    name: 'myProfile',
    component: myProfile
  },
  {
    path: '/news',
    name: 'news',
    component: news
  }
  ]
});
router.beforeEach(function (to, from, next) {
  let token = sessionStorage.getItem('token');
  if (to.path == '/login' || to.path == '/register' || to.path == '/forgetPwd') {
    next();
  } else {

    if (token != null && token != 'null') {
      Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
      next();
    } else {
      next('/login')
    }
  }
});

export default router;
