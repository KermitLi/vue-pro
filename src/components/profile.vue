<template>
  <div class="profile">
    <md-layout md-gutter>
      <md-layout md-hide-xsmall md-flex-small='20' md-flex-medium="25" md-flex-large="30" md-flex-xlarge="25">
        <md-button class="md-icon-button" md-size='large' @click.native='back'>
          <md-icon>arrow_back</md-icon>
        </md-button>
      </md-layout>
      <md-layout md-flex-xsmall="100" md-flex-small="60" md-flex-medium="50" md-flex-large="40" md-flex-xlarge="40">
  
        <ut-upload action="/api/uploadPhoto" name='test' multiple type='select' @success='onUploadSuccess' accept='image/jpeg,image/png' style='margin-top:6%;margin-left:50%;transform:translateX(-50%);position:relative;'>
          <md-avatar class="md-large">
            <img :src="newAvatar_url" alt="">
          </md-avatar>
          <md-tooltip md-direction="bottom">点击上传新头像</md-tooltip>
        </ut-upload>
        <md-input-container>
          <label>Name</label>
          <md-input disabled v-model="userName" maxlength='16'></md-input>
        </md-input-container>
        <md-input-container>
          <label>Signature</label>
          <md-input :disabled='!editable' v-model="newSignature" maxlength='40'></md-input>
        </md-input-container>
        <md-input-container>
          <label>Email</label>
          <md-input :disabled='!editable' v-model="newEmail"></md-input>
        </md-input-container>
        <ut-button size=‘large’ type='danger' class="cancel" :style='saveBtnCancelVisible' @click.native='editable=false'>取消</ut-button>
        <ut-button size=‘large’ type='primary' class="edit" :style='editBtnVisible' @click.native='editable=true'>编辑</ut-button>
        <ut-button size=‘large’ type='success' class='save' :style='saveBtnCancelVisible' @click.native='updateUserinfo'>保存</ut-button>
      </md-layout>
      <md-layout md-hide-xsmall md-flex-small='20' md-flex-medium="25" md-flex-large="30" md-flex-xlarge="30">
      </md-layout>
    </md-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editable: false,
      avatar_url: '',
      email: '',
      signature: '',
      newAvatar_url: '/photos/logo.jpg',
      newEmail: '',
      newSignature: ''
    };
  },
  props: ['userName'],
  computed: {
    editBtnVisible() {
      return !this.editable ? { visibility: 'visible' } : { visibility: 'hidden' };
    },
    saveBtnCancelVisible() {
      return this.editable ? { visibility: 'visible' } : { visibility: 'hidden' };
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getUserInfo() {
      let name = this.userName;
      this.$http.get('/api/userInfo', { params: { name } }).then((res) => {
        let user = res.data;
        if (user) {
          this.newEmail = this.email = user.email;
          this.newAvatar_url = this.avatar_url = user.avatar_url;
          this.newSignature = this.signature = user.signature;
        }
      }, () => {
        this.$message.error('服务器错误，获取用户信息失败');
      });
    },
    validate() {
      if (0 === this.newEmail.trim().length) {
        this.$message.error('电子邮箱不能为空');
        return false;
      }
      else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.newEmail.trim())) {
        this.$message.error('非法的电子邮箱');
        return false;
      }
      else if (0 === this.newSignature.trim()) {
        this.newSignature = this.signature;
        return true;
      }
      else {
        return true;
      }
    },
    updateUserinfo() {
      if (this.avatar_url === this.newAvatar_url && this.email === this.newEmail.trim() && this.signature === this.newSignature) {
        this.$message.success('保存成功')
      }
      if (this.validate()) {
        let name = this.userName;
        let avatar_url = this.newAvatar_url;
        let email = this.newEmail;
        let signature = this.newSignature;

        this.$http.get('/api/updateUserInfo', { params: { name, avatar_url, email, signature } }).then((res) => {
          if (res.data) {
            this.$message.success('保存成功');
            this.editable = false;
          }
        }, () => {
          this.$message.error('服务器错误');
        });
      }
    },
    onUploadSuccess(res) {
      this.newAvatar_url = res.url;
    }
  },
  created() {
    this.getUserInfo();
  }
}
</script>
<style lang="less" scoped>
.profile {
  position: relative;
  .md-avatar {
    margin-top: 8%;
  }
  .md-large {
    width: 3rem;
    height: 3rem;
  }

  .md-input-container {
    margin-top: 5%;
  }

  .utear-button {
    margin-top: 12%;
  }

  .cancel {
    margin-left: 8%;
  }

  .edit {
    margin-left: 20%;
  }

  .save {
    margin-left: 20%;
  }
}
</style>