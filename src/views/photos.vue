<template>
  <div class="albums">
    <navMenu></navMenu>
    <photoList :userName='userName' :albumId='albumId'></photoList>
  </div>
</template>
<script>
import navMenu from '../components/header.vue';
import photoList from '../components/photoList.vue';
const jwt = require('koa-jwt');
export default {
  name: "albums",
  data () {
    return {
      userName:'',albumId:''
    };
  },
  created(){
    let token = sessionStorage.getItem('token');
    if(token!==null&&token!=='null'){
      this.userName = jwt.verify(token, 'Kermit').name;
      this.albumId = this.$route.params.albumId;
    }
    else{
      this.$router.push({path:'/login'});
    }
  },
  components: {
    navMenu,photoList
  }
}
</script>
<style lang="less" scoped>
.albums {
  height: 100%;
}
</style>