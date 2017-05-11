<template>
  <div class="photos">
    <md-layout md-gutter>
      <md-layout md-hide-xsmall md-flex-small='10' md-flex-medium="20" md-flex-large="25" md-flex-xlarge="25">
        <md-button class="md-icon-button" md-size='large' @click.native='back'>
          <md-icon>arrow_back</md-icon>
        </md-button>
      </md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="80" md-flex-medium="60" md-flex-large="50" md-flex-xlarge="50" class="albums-container">
        <div class="album-Info">
          <h3 class="md-title">{{album.name}}</h3>
          <span class="desc">{{album.desc}}</span>
        </div>
        <md-card md-with-hover v-for="(item,index) in photos" @click.native='view(index)'>
          <md-card-media-cover md-solid @mouseenter.native='toggleAction(index)' @mouseleave.native='toggleAction(index)'>
            <img :src='item.url'>
            <md-card-area v-if='item.action'>
              <md-button id='delete' class="md-icon-button md-densed" @click.native.stop="deletePhoto(index)">
                <md-icon>delete</md-icon>
              </md-button>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </md-layout>
      <md-layout md-hide-xsmall md-flex-small='10' md-flex-medium="20" md-flex-large="25" md-flex-xlarge="25">
      </md-layout>
    </md-layout>
    <md-button id='upload' class="md-fab add" @click.native="openDialog('dialog1')">
      <md-icon>add_a_photo</md-icon>
    </md-button>
    <md-dialog md-open-from="#upload" md-close-to="#upload" ref="dialog1" class="uploadPhoto" @open='onOpen'>
      <md-dialog-title>上传新图片</md-dialog-title>
  
      <md-dialog-content>
        <ut-upload action="/api/uploadPhoto" name='test' multiple type='drag' accept='image/jpeg,image/png' class='upload' upload-list @success='onSuccess'>
          <i class='utear-icon-cloud utear-icon'></i>
          <p>将图片拖到此处，或
            <em>点击上传</em>
          </p>
        </ut-upload>
      </md-dialog-content>
  
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog1')">取消</md-button>
        <md-button class="md-primary" @click.native="upload" :disabled='uploadDisabled'>上传</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog-confirm md-title="删除照片" md-content-html="删除后不可恢复，确定删除？" md-ok-text="仍要删除" md-cancel-text="取消" @close="onClose" ref="dialog2">
    </md-dialog-confirm>
    <div class="photoView" v-if='photoView'>
      <div class="mask"></div>
      <img :src='photos[currentPic].url' alt="" class="photo">
      <md-button class="md-icon-button pre" @click.native='pre'>
        <md-icon>navigate_before</md-icon>
      </md-button>
      <md-button class="md-icon-button next" @click.native='next'>
        <md-icon>navigate_next</md-icon>
      </md-button>
      <md-button class="md-icon-button close" @click.native='photoView=false'>
        <md-icon>close</md-icon>
      </md-button>
    </div>
  </div>
</template>
<script>
import header from './header.vue';
export default {
    name: "photoList",
    data () {
      return {
        urls:[],
        photos:[],
        album:{},
        currentPic:0,
        photoView:false
      };
    },
    props:['userName','albumId'],
    computed:{
      uploadDisabled(){
        return this.urls.length===0;
      }
    },
    created(){
      this.getPhotos();
      this.getAlbumInfo();
    },
    methods:{
    back(){
          this.$router.go(-1);
    },
    view(index){
      this.currentPic = index;
      this.photoView = true;
    },
    pre(){
      if(this.currentPic>0){
        this.currentPic--;
      }
    },
    next(){
      if(this.currentPic<this.photos.length-1){
        this.currentPic++;
      }
    },
    openDialog(ref) {
    this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen(){
      this.urls=[];
    },
    onClose(type){
      if('ok'==type){
        let photo = this.photos[this.currentPic];
        let album = photo.album;
        let url = photo.url;
        let userName = this.userName;
        this.$http.delete('/api/photo',{params:{url,userName,album}}).then((res)=>{
          if(res.data){
            this.photos.splice(this.currentPic,1);
            this.$message.success('删除成功');
          }
          else{
            this.$message.error('删除失败');
          }
        },()=>{
          this.$message.error('服务器错误');
        });
      }
    },
    onSuccess(res,file,fileList){
      this.urls.push(res.url);
    },
    toggleAction(index) {
      this.photos[index].action = !this.photos[index].action;
    },
    deletePhoto(index){
      this.openDialog('dialog2');
      this.currentPic = index;
    },
    upload(){
        let successCount=0
        let failedCount = 0;
        let album = this.albumId;
        if(album){
            this.urls.forEach((item,index)=>{
              let url = item;
              let userName = this.userName;
              let photo = {url,album,userName};
              this.$http.post('/api/upload',photo).then((res)=>{
                if(res.data.state){
                  successCount++;
                  this.photos.push(res.data.result);
                   this.$set(this.photos[this.photos.length-1], 'action', false);
                }
                else{
                  failedCount++;
                }
                if(index===this.urls.length-1){
                  this.$message(`上传完成，成功${successCount}个，失败${failedCount}个。`);
                }
              },()=>{
                this.$message.error('服务器错误');
                failedCount++;
                if(index===this.urls.length-1){
                  this.$message(`上传完成，成功${successCount}个，失败${failedCount}个。`);
                }
              });
            });
        }
        else{
          this.$message.error('进入相册失败，请返回重新进入');
        }
        this.closeDialog('dialog1');
      },
      getPhotos(){
        let userName = this.userName;
        let album = this.albumId;
        if(album){
          this.$http.get('/api/photos',{params:{userName,album}}).then((res)=>{
            this.photos = res.data;
            this.photos.forEach((item, index) => {
              this.$set(this.photos[index], 'action', false);
            });
          },()=>{
            this.$message.error('服务器错误');
          });
        }
      },
      getAlbumInfo(){
        let userName = this.userName;
        let id = this.albumId;
        this.$http.get('/api/getAlbums',{params:{userName,id}}).then((res)=>{
          this.album = res.data[0];
        },()=>{
          this.$message.error('获取相册信息失败');
        });
      }
    }
  }
</script>
<style lang="less" scoped>
.photos {
  height: 93.3%;
  border: 1px solid;
  overflow: auto;

  .album-Info {
    width: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
    text-align: center;

    .md-title {
      font-size: 1rem;
      line-height: 1.5;
    }

    .md-title,
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .albums-container {
    padding-top: 1%;
    .md-card {
      width: 30%;
      margin-top: 3%;
      margin-left: 3%;

      .md-card-area {
        height: 100%;

        .md-button {
          margin-top: 40%;
          margin-left: 40%;
        }
      }

      .md-card-header {
        padding: 0.14rem;
      }

      .md-title {
        font-size: 0.55rem;
        line-height: 1.2;
        text-align: center;
      }
    }
  }

  .add {
    position: fixed;
    bottom: 7%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .photoView {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;

    .mask {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);
      position: absolute;
      left: 0;
      top: 0;
    }

    .photo {
      width: 55%;
      position: absolute;
      left: 22.5%;
      top: 50%;
      transform: translateY(-50%);
    }

    .md-button {
      position: absolute;
      color: white;

      .md-icon {
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
      }
    }

    .pre,
    .next {
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      width: 2.5rem;
      height: 2.5rem;
    }

    .pre {
      left: 5%;
    }

    .next {
      right: 5%;
    }

    .close {
      width: 2.3rem;
      height: 2.3rem;
      top: 2%;
      right: 2%;
    }
  }
}

.upload {
  width: 100%;
  color: #99a9bf;
  overflow: auto;
  .utear-icon-cloud {
    line-height: 110px;
    font-size: 80px;
  }
  p {
    font-size: 13px;
    em {
      color: #20a0ff;
      font-style: normal;
    }
  }
}
</style>