import Vue from 'vue'
import vueResouce from 'vue-resource';
import Router from 'vue-router'
import home from '../views/home'
import login from '../views/login'
import register from '../views/register'
import uploadPhoto from '../components/uploadPhoto.vue';
import post from '../views/post';
import albums from '../views/albums.vue';

Vue.use(Router);
Vue.use(vueResouce);

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path:'/login',
      name:'login',
      component:login
  },
  {
      path:'/register',
      name:'register',
      component:register
  },
  {
      path:'/article/post',
      name:'post',
      component:post
  }
  ,
  {
      path:'/photo/upload',
      name:'uploadPhoto',
      component:uploadPhoto
  },
  {
      path:'/albums',
      name:"/albums",
      component:albums
  }
  ]
});
router.beforeEach(function(to,from,next){
    let token = sessionStorage.getItem('token');
    if(to.path=='/login'||to.path=='/register'){
        next();
    }
    else{

        if(token!=null&&token!='null'){
            Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
            next();
        }
        else {
            next('/login');
        }
    }
});

export default router;
