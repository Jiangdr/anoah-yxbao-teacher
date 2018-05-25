<template>
  <div id="new-password">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <p class="title">请设置新密码</p>
    <div class="div-cell">
      <p class="cell-title">手机号</p>
      <van-cell center>
        <img slot="icon" class="img-cell" src="@/assets/images/account/phone.png" alt="">
        <span>+86</span>
        <span>|</span>
        <span >{{phoneNum}}</span>
      </van-cell>
    </div>
    <div class="div-cell">
      <p class="cell-title">验证码</p>
      <van-cell center :border="false">
        <img slot="icon" class="img-cell img-margin-top" src="@/assets/images/account/verification.png" alt="">
        <van-field center style="padding-bottom: 0" v-model="sms" placeholder="请输入验证码" icon="clear" @click-icon="sms = ''" @blur="valid" :error-message="validsms">
          <van-button slot="button" size="small" type="primary" :disabled="smsUseable" @click="sendsms">{{content}}</van-button>
        </van-field>
      </van-cell>
    </div>
    <div class="div-cell">
      <p class="cell-title">新密码</p>
      <van-cell center :border="false">
        <img slot="icon" class="img-cell img-margin-top" src="@/assets/images/account/icon-pwd.png" alt="">
        <van-field style="padding-bottom: 0" v-model.trim="password" type="password" placeholder="请输入密码" @blur="validpassword"/>
      </van-cell>
    </div>
    <p class="pwd-prompt" v-html="newPasswordPrompt"></p>
    <div class="div-cell">
      <p class="cell-title">确认密码</p>
      <van-cell center :border="false">
        <img slot="icon" class="img-cell img-margin-top" src="@/assets/images/account/icon-pwd.png" alt="">
        <van-field style="padding-bottom: 0" v-model.trim="password2" type="password" placeholder="再次输入密码" :error-message="errorMsg2" @blur="validpassword2"/>
      </van-cell>
    </div>
    <next-btn @click="set" :disabled="setBtnDisenabled" class="btn-next" text="设置新密码"></next-btn>
  </div>
</template>
<script>
/**
   * 发送验证码验证成功后，密码输入框可输入
   * 密码输入时，再次输入清空
   * 修改验证码后，验证成功后才可以设置
   */
import NavBar from '@/module/user-center/components/common/navbar'
import api from '@/module/account/axios/user'
import ErrorMsg from '@/module/account/components/error-msg'
import NextBtn from '@/module/account/components/yx-next-btn'
import { Toast } from 'vant'
export default {
  name: 'NewPassword',
  data () {
    return {
      title: '找回密码',
      hasBack: true,
      phoneNum: this.$route.params.phone,
      sms: '',
      password: '',
      password2: '',
      setBtnUseable: true,
      errorMsg: '密码需要由6-20位英文字母、数字或符号组成',
      errorMsg2: '',
      validsms: '',
      timer: null,
      content: '发送验证码',
      timeLen: 120,
      smsUseable: false,
      hasValidSms: false,
      newPasswordPrompt: `<span>密码需要由</span><span style="color: #ff5266;">6-20</span><span>位英文字母、数字或符号组成</span>`
    }
  },
  computed: {
    setBtnDisenabled() {
      let bool = true;
      if (this.password !== '' && this.password === this.password2 &&
          this.errorMsg === '' && this.errorMsg2 === '' &&
          this.sms !== '' && this.validsms === '') {
        bool = false;
      }
      return bool;
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    sendsms () {
      this.smsUseable = true
      this.captcha()
      this.timer = setInterval(() => {
        if (this.timeLen < 0) {
          clearInterval(this.timer)
          this.content = '发送验证码'
          this.smsUseable = false
          this.timeLen = 120
          return false
        }
        this.content = `${this.timeLen}s`
        this.timeLen--
      }, 1000)
    },
    captcha () {
      api.captcha({
        user_id: this.$route.params.userId,
        phone: this.$route.params.phone
      }).then(succ => {
        if (succ.id) {
          Toast({position: 'bottom', message: '验证码发送成功'})
        }
      })
    },
    valid () {
      if (!this.hasValidSms) {
        if (!this.sms) {
          this.validsms = '验证码不能为空'
          return false
        }
        api.valid({
          user_id: this.$route.params.userId,
          phone: this.$route.params.phone,
          captcha: this.sms
        }).then(succ => {
          console.log(succ);
          Toast('修改成功');
          this.validsms = ''
          this.hasValidSms = true
        }, err => {
          console.log(err)
          Toast('修改失败');
          this.validsms = '手机校验码输入有误'
        })
      }
    },
    validpassword () {
      if (!this.password.match(/^[\x21-\x7E]{6,20}$/)) {
        this.errorMsg = '密码需要由6-20位英文字母、数字或符号组成'
      } else {
        this.errorMsg = ''
      }
    },
    validpassword2 () {
      if (this.password === this.password2) {
        this.setBtnUseable = false
      }
    },
    set () {
      api.reset({
        user_id: this.$route.params.userId,
        phone: this.$route.params.phone,
        captcha: this.sms,
        password: this.password
      }).then(succ => {
        console.log(succ)
      }, err => {
        console.log(err)
      })
    }
  },
  watch: {
    password (newVal) {
      if (newVal.length >= 6) {
        this.errorMsg = ''
      } else {
        this.errorMsg = `密码需要由6-20位英文字母、数字或符号组成`
      }
    },
    password2 (password2) {
      if (password2.length >= this.password.length && password2 !== this.password) {
        this.errorMsg2 = '两次输入的密码不一值'
        this.setBtnUseable = true
      } else {
        this.errorMsg2 = ''
        if (password2 === this.password) {
          this.setBtnUseable = false
        }
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  components: {
    NavBar,
    ErrorMsg,
    NextBtn
  }
}
</script>
<style lang="scss" scoped>
  #new-password{
    height: 100%;
    background: url("/static/img/account/pwd-bottom.png") no-repeat bottom;
    padding-left: 16px;
    padding-right: 16px;
    .title{
      padding-left: 14px;
      font-size: 20px;
      line-height: 60px;
    }
    .img-cell{
      height: 26px;
    }
    .img-margin-top{
      margin-top: 6px;
    }
    .cell-title{
      color: #d2d2d2;
      padding-left: 16px;
    }
    .div-cell {
      margin-bottom: 10px;
      color: #666666;
      border-bottom: 1px solid #e8e8e8;
      & * {
        padding-right: 10px;
      }
    }
    .line{
      border-top:0px solid #deded9;
      overflow: hidden;
    }
    .pwd-prompt{
      color: #b8b8b8;
      font-size: 14px;
      margin-top: -6px;
      padding-left: 14px;
      padding-bottom: 20px;
    }
    .btn-next{
      width: 80%;
      margin: 0 auto;
      padding-top: 50px;
    }
  }
</style>
