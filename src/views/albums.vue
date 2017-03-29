<template>
  <div class="albums">
    <navMenu></navMenu>
    <albumList></albumList>
  </div>
</template>
<script>
import navMenu from '../components/header.vue';
import albumList from '../components/albumList.vue';
export default {
  name: "albums",
  data () {
    return {
    };
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