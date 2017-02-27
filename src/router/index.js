import Vue from 'vue'
import vueResouce from 'vue-resource';
import Router from 'vue-router'
import Hello from 'components/Hello'
import login from '../views/login'
import register from '../views/register'

Vue.use(Router);
Vue.use(vueResouce);

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
  }
  ]
});

router.beforeEach(function(to,from,next){
    let token = sessionStorage.getItem('token');
    console.log(token);
    if(to.path=='/login'){
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
