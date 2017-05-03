<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang='less'>
@import './assets/css/material-icons.css';
@font-face {
  font-family: 'Source Sans Pro';
  src: url('./assets/fonts/SourceSansPro-Regular.ttf');
  font-weight: 400;
}


#app {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  font-size: 0.5rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
}

.layout {
  background-color: white!important;
  overflow: visible!important;
}

a {
  text-decoration: none;
  color: #20a0ff;
  font-size: 0.5rem;
  display: block;
}

img {
  display: block;
}

@media screen and (max-width: 320px) {
  html {
    font-size: 12px;
  }
}

@media screen and (max-width: 360px) {
  html {
    font-size: 14px;
  }
}

@media screen and (min-width: 400px) {
  html {
    font-size: 16px;
  }
}

@media screen and (min-width: 440px) {
  html {
    font-size: 20px;
  }
}

@media screen and (min-width: 480px) {
  html {
    font-size: 22px;
  }
}

@media screen and (min-width: 640px) {
  html {
    font-size: 28px;
  }
}

@media screen and (min-width: 768px) {
  html {
    font-size: 30px;
  }
}

.clearFix:after {
  content: '.';
  width: 0;
  height: 0;
  display: block;
  clear: both;
  visibility: hidden;
  overflow: hidden;
}

.avatar {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}
</style>
