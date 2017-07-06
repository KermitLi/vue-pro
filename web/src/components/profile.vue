<template>
  <div class="profile" utear-loading-style='bars' v-loading='loading'>
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
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      editable: false,
      newAvatar_url: '/photos/logo.jpg',
      newEmail: '',
      newSignature: '',
      loading: false
    }
  },
  props: ['userName'],
  computed: {
    editBtnVisible () {
      return !this.editable ? { visibility: 'visible' } : { visibility: 'hidden' }
    },
    saveBtnCancelVisible () {
      return this.editable ? { visibility: 'visible' } : { visibility: 'hidden' }
    },
    ...mapGetters('user', ['avatar_url', 'email', 'signature'])
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    validate () {
      if (this.newEmail.trim().length === 0) {
        this.$message.error('电子邮箱不能为空')
        return false
      } else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.newEmail.trim())) {
        this.$message.error('非法的电子邮箱')
        return false
      } else if (this.newSignature.trim().length === 0) {
        this.newSignature = this.signature
        return false
      } else {
        return true
      }
    },
    updateUserinfo () {
      if (this.avatar_url === this.newAvatar_url && this.email === this.newEmail.trim() && this.signature === this.newSignature) {
        this.$message.success('保存成功')
      }
      if (this.validate()) {
        this.loading = true
        let name = this.userName
        /* eslint-disable camelcase */
        let avatar_url = this.newAvatar_url
        let email = this.newEmail
        let signature = this.newSignature
        this.$store.dispatch('user/update', { name, avatar_url, email, signature }).then(result => {
          console.log(result)
          this.loading = false
          this.editable = false
          this.$message.success(result.message)
        }, err => {
          console.log(err)
          this.loading = false
          this.editable = false
          this.$message.error(err.message)
        })
      }
    },
    onUploadSuccess (res) {
      this.newAvatar_url = res.url
    }
  },
  created () {
    this.newAvatar_url = this.avatar_url
    this.newEmail = this.email
    this.newSignature = this.signature
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
    margin-left: 25%;
  }

  .save {
    margin-left: 20%;
  }
}
</style>