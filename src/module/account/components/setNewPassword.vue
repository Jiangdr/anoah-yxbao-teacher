<template>
  <div id="new-password">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
      <van-field-group name="password">
        <van-field label="手机号86" v-model="phoneNum" disabled />
        <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''">
          <van-button slot="button" size="small" type="primary" :disabled="smsUseable" @click="sendsms">{{content}}</van-button>
        </van-field>
        <van-field v-model="password" type="password" label="新密码" placeholder="请输入密码" :error-message="errorMsg"/>
        <van-field v-model="password2" type="password" label="确认新密码" placeholder="再次输入密码"/>
      </van-field-group>
      <van-button size="large" type="primary" :disabled="setBtnUseable">设置密码</van-button>
  </div>
</template>
<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'NewPassword',
  data () {
    return {
      title: '找回密码',
      hasBack: true,
      phoneNum: '18681254569',
      sms: '',
      password: '',
      password2: '',
      setBtnUseable: true,
      errorMsg: '密码需要由6-20位英文字母、数字或符号组成',
      timer: null,
      content: '发送验证码',
      timeLen: 10,
      smsUseable: false
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    sendsms () {
      this.smsUseable = true
      this.timer = setInterval(() => {
        if (this.timeLen < 0) {
          clearInterval(this.timer)
          this.content = '发送验证码'
          this.smsUseable = false
          this.timeLen = 10
          return false
        }
        this.content = `${this.timeLen}s`
        this.timeLen--
      }, 1000)
    }
  },
  watch: {
    password (newVal) {
      if (newVal.length >= 6) {
        this.errorMsg = ''
      } else {
        this.errorMsg = `密码需要由6-20位英文字母、数字或符号组成`
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  components: {
    NavBar
  }
}
</script>
<style scoped>
</style>
