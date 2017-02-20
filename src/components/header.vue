<template lang="html">
  <ut-header class="ut-header">
    <ut-row>
      <ut-col :span=1 :offset=1>
          <h3 class='title'>Kermit</h3>
      </ut-col>
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
    background-color: rgba(0,153,229,.7);
  }

  .title {
    color: white;
  }
</style>
