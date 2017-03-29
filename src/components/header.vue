<template lang="html">
  <div class="navMenu">
        <ut-row>
          <ut-col :span=1 :offset=1>
              <span class='title'>Kermit</span>
          </ut-col>
          <ut-col :span="5" :offset="15">
              <ut-nav mode='horizontal' active='n2'>
                  <ut-nav-item index="n1"><router-link to='/'>首页</router-link></ut-nav-item>
                  <ut-nav-item index="n2"><router-link to='/albums'>相册</router-link></ut-nav-item>
                  <ut-nav-item index="n3"><router-link to='/articles'>笔记</router-link></ut-nav-item>
              </ut-nav>
          </ut-col>
        </ut-row>
  </div>
</template>

<script>
export default {
  name:'header'
}
</script>

<style lang="less" scoped>
  .navMenu {
    background-color:#20a0ff;
    width: 100%;
    height: 6.7%;
  }

  .title {
    color: white;
    line-height: 2rem;
    font-size:0.9rem;
    font-weight:bold;
  }

  .utear-menu {
      background-color: #20a0ff!important;
     .utear-menu-item {
         color: #fff!important;
         font-size:0.6rem;
     }
     .is-active {
         color: #000!important;
     }
  }

  .utear-menu,.utear-submenu,.utear-submenu__title{
      height: 1.1rem!important;
  }
</style>
