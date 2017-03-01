<template lang="html">
  <div class="navMenu">
        <ut-row>
          <ut-col :span=1 :offset=1>
              <h4 class='title'>Kermit</h4>
          </ut-col>
          <ut-col :span="5" :offset="15">
              <ut-nav mode='horizontal' active='n2'>
                  <ut-nav-item index="n1">首页</ut-nav-item>
                  <ut-nav-item index="n2">相册</ut-nav-item>
                  <ut-nav-item index="n3">笔记</ut-nav-item>
              </ut-nav>
          </ut-col>
          <ut-col :span="2">
              <ut-nav>
                  <ut-nav-sub title="kermit" index='1-1'>
                      <ut-nav-item index='2-1'>001</ut-nav-item>
                      <ut-nav-item index='2-2'>002</ut-nav-item>
                      <ut-nav-item index='2-3'>003</ut-nav-item>
                   </ut-nav-sub>
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
  }

  .title {
    color: white;
    line-height: 2rem;
  }

  .utear-menu {
      background-color: #20a0ff!important;
     .utear-menu-item {
         color: #fff!important;
     }
     .is-active {
         color: #000!important;
     }
  }

  .utear-menu,.utear-submenu,.utear-submenu__title{
      height: 64px!important;
  }
</style>
