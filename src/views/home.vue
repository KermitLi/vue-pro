<template>
  <div class="home">
     <navMenu class="navMenu"> </navMenu>
     <articleList class="articleList"></articleList>
  </div>
</template>

<script>
import navMenu from '../components/header';
import articleList from '../components/articleList';
export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods:{

  },
  created(){

  },
  components:{
      navMenu,articleList
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .home {
    height:100%;
  }
</style>
