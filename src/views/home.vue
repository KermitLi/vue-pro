<template>
  <div class="home">
     <navMenu> </navMenu>
     <articleList></articleList>
     <footer></footer>
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
<style scoped>
  .home {
    min-height:100%;
  }
</style>
