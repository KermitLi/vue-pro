<template>
  <div class="myProfile">
    <navMenu :userName='userName'></navMenu>
    <profile :userName='userName'></profile>
  </div>
</template>
<script>
import navMenu from '../components/header.vue';
import profile from '../components/profile.vue';
import jwt from 'koa-jwt';
export default {
  name: "myProfile",
  data() {
    return {
      userName: ''
    };
  },
  components: {
    navMenu, profile
  },
  created() {
    let token = sessionStorage.getItem('token');
    if (token !== null && token !== 'null') {
      this.userName = jwt.verify(token, 'Kermit').name;
    }
    else {
      this.$router.push({ path: '/login' });
    }
  }
}
</script>
<style lang="less" scoped>

</style>