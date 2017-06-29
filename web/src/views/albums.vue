<template>
  <div class="albums">
    <navMenu></navMenu>
    <albumList :userName='userName'></albumList>
  </div>
</template>
<script>
import navMenu from '../components/header.vue';
import albumList from '../components/albumList.vue';
const jwt = require('koa-jwt');
export default {
  name: "albums",
  data () {
    return {
      userName:''
    };
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
  components: {
    navMenu,albumList
  }
}
</script>
<style lang="less" scoped>
.albums {
  height: 100%;
}
</style>