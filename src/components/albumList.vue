<template>
    <div class="albums">
        <ut-row class='contents'>
            <ut-col :span='4'></ut-col>
            <ut-col :span='16' class="albumList">
                <div class="album" v-for='i in 20'>
                  <router-link to="#" class="cover">
                    <img src="../assets//images/logo.jpg" alt="">
                  </router-link>
                  <router-link class="name" to='#'>相册</router-link>
                </div>
            </ut-col>
            <ut-col :span='4'></ut-col>
        </ut-row>
    </div>
</template>
<script>
import header from './header.vue';
export default {
    name: "albumList",
    data () {
      return {
      };
    }
  }
</script>
<style lang="less" scoped>
  .albums {
    height: 93.3%;
    border: 1px solid;
    .contents {
      width: 100%;
      height: 100%;
      overflow: auto;

      .utear-col {
        height: 100%;  
      }

      .albumList {

          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          
          .album {
            width: 4rem;
            height: 4rem;
            margin-top: 1rem;
            border: 1px solid;
            text-align: center;

            .cover {
              width: 100%;
              height: 100%;
              display: block;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .name {
              font-size:0.45rem;
              line-height: 2;
              color: #039BE5;
              display: inline-block;
            }

          }
            
        }
    }
  }
</style>