<template>
  <div id="forget-password" :style="background">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <div class="forget-pwd-title">请输入你需要找回密码的账号信息</div>
    <p class="p-username">用户名</p>
    <div style="padding: 0 30px;width: 100%">
      <img class="login-input-icon" src="@/assets/images/account/icon-user.png"/>
      <van-cell-group style="display: inline-block; width: 76%">
        <van-field
          v-model="account"
          placeholder="请输入登录账号/手机号"
          :error-message="errorMsg"
        />
      </van-cell-group>
    </div>
    <next-btn :loading="btnLoading" :disabled="btnUseable" @click="nextStep" class="btn-next" text="下一步"></next-btn>
    <span class="span-question">找回密码遇到问题？</span>
    <a is="router-link" class="a-contact" :to="{path:'/contactUs'}">联系我们</a>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import api from '@/module/account/axios/user'
import nextBtn from '@/module/account/components/yx-next-btn'
export default {
  name: 'ForgetPassword',
  data () {
    return {
      title: '找回密码',
      hasBack: true,
      account: '',
      errorMsg: '',
      btnUseable: true,
      btnLoading: false,
      background: {
        backgroundImage: "url(" + require("@/assets/images/account/pwd-bottom.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom"
      }
    }
  },
  watch: {
    account (newVal, oldVal) {
      if (newVal.length) {
        this.errorMsg = ''
        this.btnUseable = false
      } else {
        this.btnUseable = true
      }
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    nextStep () {
      this.btnLoading = true
      api.exists({
        account: this.account
      }).then(success => {
        this.btnLoading = false
        if (!success.phone) {
          this.errorMsg = '该用户还未绑定手机'
          return false
        }
        this.$router.push({path: `/newPassword/${success.phone}/${success.userid}`})
      }, error => {
        this.btnLoading = false
        this.errorMsg = error.msg
      })
      // this.$router.push({path: `/newPassword/${'15198028106'}/${'zh1234'}`})
    }
  },
  components: {
    NavBar,
    nextBtn
  }
}
</script>
<style lang="scss" scoped>
  #forget-password{
    height: 100%;
    padding: 25px 0px;
    .forget-pwd-title{
      padding:20px 0 30px 30px;line-height: 50px;
    }
    .p-username{
      padding-left: 30px;
      color: #c8c9c9;
      line-height: 30px;
    }
    .login-input-icon{
      width: 20px; position: relative;top:4px;
    }
    .span-question{
      text-align: center;
      color: #9c9ea1;
      width: 100%;
      display: inline-block;
      padding-top: 30px;
    }
    .btn-next{
      width: 80%;
      margin: 0 auto;
      padding-top: 30px;
    }
    .a-contact{
      text-align: center;
      color: #08b783;
      width: 100%;
      display: inline-block;
      padding-top: 10px;
    }
  }
</style>
