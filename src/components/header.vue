<template lang="html">
  <ut-header class="ut-header">
    <ut-row>
      <ut-col :span=1 :offset=1>
          <h3 class='title'>Kermit</h3>
      </ut-col>
      ul
    </ut-row>
  </ut-header>
</template>

<script>
export default {
  name:'header'
}
</script>

<style lang="css" scoped>
  .ut-header {
    background-color:'#556a7f';
  }

  .title {
    color: white;
  }
</style>
