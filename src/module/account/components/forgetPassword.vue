<template>
  <div id="forget-password">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <div style="text-align:center;line-height:50px;">请输入你需要找回密码的账号信息</div>
    <van-cell-group>
      <van-field
        v-model="account"
        label="账号"
        placeholder="请输入登录账号/手机号"
        :error-message="errorMsg"
      />
    </van-cell-group>
    <div style="text-align:right;line-height:50px;padding-right:20px">
      <span>找回密码遇到问题,请</span>
      <router-link :to="{name:'formList'}">联系我们</router-link>
    </div>
    <div class="footer-btn van-hairline--top">
      <van-button size="large" type="primary" class="btn-next" :disabled="btnUseable" :loading="btnLoading" @click="nextStep">
        下一步
      </van-button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'ForgetPassword',
  data () {
    return {
      title: '找回密码',
      hasBack: true,
      account: '',
      errorMsg: '',
      btnUseable: true,
      btnLoading: false
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
      setTimeout(() => {
        this.btnLoading = false
        Math.random() > 0.5 ? this.error() : this.goValidate()
      }, 100)
    },
    goValidate () {
      this.$router.push({name: 'setNewPassword'})
    },
    error () {
      this.errorMsg = Math.random() > 0.5 ? '账号不存在' : '该用户还未绑定手机号'
    }
  },
  components: {
    NavBar
  }
}
</script>
<style scoped>
  .footer-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background-color: #ddd;
    display: flex;
    justify-content: center;
  }
  .btn-next{
    align-self: center;
    height: 40px;
    width: 200px;
    line-height: 40px;
  }
</style>
