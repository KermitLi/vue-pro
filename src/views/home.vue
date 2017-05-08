<template>
  <div class="home">
    <navMenu class="navMenu" :userName='userName' :key='4'> </navMenu>
    <articleList class="articleList" :userName='userName' :key='2'></articleList>
  </div>
</template>

<script>
import navMenu from '../components/header';
import articleList from '../components/articleList';
const jwt = require('koa-jwt');
export default {
  name: 'home',
  data () {
    return {
      userName:''
    }
  },
  methods:{

  },
  created(){
    let token = sessionStorage.getItem('token');
    if(token!==null&&token!=='null'){
      this.userName = jwt.verify(token, 'Kermit').name;
    }
    else{
      this.$router.push({path:'/login'});
    }
  },
  components:{
      navMenu,articleList
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.home {
  height: 100%;
}
</style>
