<template>
    <div class="albums">
      <md-layout md-gutter>
        <md-layout md-flex-xsmall="100" md-flex-small="10" md-flex-medium="20" md-flex-large="25" md-flex-xlarge="25">
          md-flex-xsmall <br>
          md-flex-small="50" <br>
          md-flex-medium="33"
        </md-layout>

        <md-layout md-flex-xsmall="100" md-flex-small="80" md-flex-medium="60" md-flex-large="50" md-flex-xlarge="50" class="albums-container">
          <md-card class="md-card" md-with-hover v-for="i in 5">
            <md-card-media-cover md-text-scrim>
              <md-card-media md-ratio="1:1">
                <img src="../assets/images/logo.png" alt="Skyscraper">
              </md-card-media>

              <md-card-area>
                <md-card-header>
                  <div class="md-title">Title goes here</div>
                  <div class="md-subhead">Subtitle here</div>
                </md-card-header>

                <md-card-actions>
                  <md-button>Action</md-button>
                  <md-button>Action</md-button>
                </md-card-actions>
              </md-card-area>
            </md-card-media-cover>
          </md-card>
        </md-layout>

        <md-layout md-flex-xsmall="100" md-flex-small="10" md-flex-medium="20" md-flex-large="25" md-flex-xlarge="25">
          md-flex-xsmall <br>
          md-flex-small="50" <br>
          md-flex-medium="33"
        </md-layout>
      </md-layout>
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
    
    .md-card {
      width: 30%;
      margin-top: 3%;
      margin-left: 3%;
    }
  }
</style>