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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  font-family: 'Open Sans', sans-serif;
}

* {
  margin: 0;
  padding: 0;
}

.layout {
    background-color: white!important;
}

a {
    text-decoration: none;
    color: #20a0ff;
    font-size: 0.5rem;
}

@media screen and (max-width: 320px) {
  html {font-size: 12px;}
}

@media screen and (max-width: 360px) {
  html {font-size: 14px;}

}

@media screen and (min-width: 400px) {
  html {font-size: 16px;}

}

@media screen and (min-width: 440px) {
  html {font-size: 20px;}
}

@media screen and (min-width: 480px) {
  html {font-size: 22px;}
}

@media screen and (min-width: 640px) {
  html {font-size: 28px;}
}

@media screen and (min-width: 768px) {
  html {font-size: 30px;}
}


</style>
