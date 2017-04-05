<template lang="html">
  <div class="navMenu">
    <md-toolbar md-theme="blue" style='color:white'>
        <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">Default</h2>

        <md-button class="md-icon-button">
            <md-icon>favorite</md-icon>
        </md-button>
    </md-toolbar>
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
