<template>
  <div class="albums">
    <md-layout md-gutter>
      <md-layout md-hide-xsmall md-flex-small='10' md-flex-medium="20" md-flex-large="25" md-flex-xlarge="25">
        <md-button class="md-icon-button" md-size='large' @click.native='back'>
          <md-icon>arrow_back</md-icon>
        </md-button>
      </md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="80" md-flex-medium="60" md-flex-large="50" md-flex-xlarge="50" class="albums-container">
        <md-card md-with-hover v-for="(item,index) in albums" @click.native='toPhotos(item)'>
          <md-card-media-cover md-solid @mouseenter.native='toggleAction(index)' @mouseleave.native='toggleAction(index)'>
            <img :src='item.cover' alt="albumCover">
            <md-card-area v-if='item.action'>
              <md-button class="md-icon-button md-densed" @click.native.stop='edit(index,"dialog2")'>
                <md-icon>edit</md-icon>
              </md-button>
              <md-button class="md-icon-button md-densed" @click.native.stop="deleteAlbum(index)">
                <md-icon>delete</md-icon>
              </md-button>
            </md-card-area>
          </md-card-media-cover>
          <md-card-header>
            <div class="md-title">{{item.name}}</div>
          </md-card-header>
        </md-card>
      </md-layout>
      <md-layout md-hide-xsmall md-flex-small='10' md-flex-medium="20" md-flex-large="25" md-flex-xlarge="25">
      </md-layout>
    </md-layout>
    <router-link to='#'>
      <md-button id='fab' class="md-fab add" @click.native="openDialog('dialog2')">
        <md-icon>add_to_photos</md-icon>
      </md-button>
    </router-link>
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2" @open='onOpen' @close='onClose'>
      <md-dialog-title v-if='mode=="create"'>创建新相册</md-dialog-title>
      <md-dialog-title v-else>更改相册信息</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-input-container>
            <label>相册名称</label>
            <md-input v-model="newAlbumName" maxlength='16' required></md-input>
          </md-input-container>
          <md-input-container>
            <label>相册描述</label>
            <md-textarea v-model="newAlbumDesc" maxlength='30' required></md-textarea>
          </md-input-container>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog2')">取消</md-button>
        <md-button class="md-primary" @click.native="createAlbum('dialog2')" v-if='mode=="create"'>创建</md-button>
        <md-button class="md-primary" @click.native="updateAlbum('dialog2')" v-else>更改</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog-confirm md-title="删除相册" md-content-html="删除后相册中的所有照片也会被删除且不可恢复，确定删除？" md-ok-text="仍要删除" md-cancel-text="取消" @close="onCloseDeleteDialog" ref="dialog3">
    </md-dialog-confirm>
  </div>
</template>
<script>
import header from './header.vue';
export default {
  name: "albumList",
  data() {
    return {
      newAlbumName: '',
      newAlbumDesc: '',
      oldAlbumName: '',
      oldAlbumDesc: '',
      currentAlbum: -1,
      albums: [],
      mode: 'create',
      albumCover: '/photos/logo.jpg'
    };
  },
  props: ['userName'],
  computed: {
  },
  created() {
    this.getAlbums();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {

    },
    onClose(type) {
      this.newAlbumName = '';
      this.newAlbumDesc = '';
    },
    onCloseDeleteDialog(type) {
      if ('ok' == type) {
        let album = this.albums[this.currentAlbum];
        let userName = album.userName;
        let name = album.name;
        let id = album.id;
        this.$http.delete('/api/album', { params: { userName, name } }).then((res) => {
          if (res.data) {
            this.$message.success('相册删除成功');
            this.albums.splice(this.currentAlbum, 1);
            this.$http.delete('/api/photo', { params: { userName, album: id } }).then((res) => {
              if (res.data) {
                this.$message.success('照片删除成功');
              }
              else {
                this.$message.error('照片删除失败');
              }
            }, () => {
              this.$message.error('服务器错误,照片删除失败');
            });
          }
          else {
            this.$message.error('相册删除失败');
          }
        }, () => {
          this.$message.error('服务器错误，相册删除失败');
        });
      }
    },
    deleteAlbum(index) {
      this.openDialog('dialog3');
      this.currentAlbum = index;
    },
    toggleAction(index) {
      this.albums[index].action = !this.albums[index].action;
    },
    toPhotos(item) {
      this.$router.push({
        path: '/albums/' + item.id
      });
    },
    validate() {
      if (0 === this.newAlbumName.trim().length) {
        this.$message.error('相册名称不能为空');
        return false;
      }
      else if (0 === this.newAlbumDesc.trim().length) {
        this.$message.error('相册名称不能为空');
        return false;
      }
      else {
        return true;
      }
    },
    createAlbum(ref) {
      if (this.validate()) {
        let userName = this.userName;
        let name = this.newAlbumName;
        let desc = this.newAlbumDesc;
        let album = { userName, name, desc };
        this.$http.post('/api/createAlbum', album).then((res) => {
          if (res.data.state) {
            this.$message.success('创建成功');
            this.albums.push(res.data.result);
            this.closeDialog(ref);
          }
          else if (0 === +res.data.error_code) {
            this.$message.error('相册已存在');
          }
          else {
            this.$message.error('创建失败');
          }
        }, () => {
          this.$message.error('服务器错误');
        });
      }
    },
    getAlbums() {
      let userName = this.userName;
      this.$http.get('/api/getAlbums', { params: { userName } }).then((res) => {
        this.albums = res.data;
        this.albums.forEach((item, index) => {
          this.$set(this.albums[index], 'action', false);
          this.$set(this.albums[index], 'cover', '/photos/logo.jpg');
          this.getAlbumcover(index);
        });
      }, () => {
        this.$message.error('服务器错误')
      });
    },
    edit(index, ref) {
      this.currentAlbum = index;
      this.mode = 'edit';
      let name = this.albums[index].name;
      let desc = this.albums[index].desc;
      this.newAlbumName = name;
      this.newAlbumDesc = desc;
      this.oldAlbumName = name;
      this.oldAlbumDesc = desc;
      this.openDialog(ref);
    },
    updateAlbum(ref) {
      if (this.validate()) {
        let userName = this.userName;
        let name = this.newAlbumName;
        let desc = this.newAlbumDesc;
        let oldName = this.oldAlbumName;
        let oldDesc = this.oldAlbumDesc
        let album = { userName, name, desc, oldName, oldDesc };
        this.$http.post('/api/updateAlbum', album).then((res) => {
          if (res.data.state) {
            this.$message.success('更改成功');
            this.albums[this.currentAlbum].name = album.name;
            this.albums[this.currentAlbum].desc = album.desc;
            this.closeDialog(ref);
          }
          else if (0 === +res.data.error_code) {
            this.$message.error('相册已存在');
          }
          else {
            this.$message.error('更改失败');
          }
        }, () => {
          this.$message.error('服务器错误');
        });
      }
    },
    getAlbumcover(index) {
      let id = this.albums[index].id;
      let userName = this.userName;
      this.$http.get('/api/photos', { params: { album: id, userName } }).then((res) => {
        if (res.data.length > 0) {
          this.$set(this.albums[index], 'cover', res.data[0].url);
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
.albums {
  height: 92%;
  border: 1px solid;
  overflow: auto;

  .md-card {
    width: 30%;
    margin-top: 3%;
    margin-left: 3%;

    .md-card-area {
      height: 100%;

      .md-button {
        margin-top: 40%;
        margin-left: 20%;
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

  .add {
    position: fixed;
    bottom: 7%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>