<template>
  <div id="new-password">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
      <van-field-group name="password">
        <van-field label="手机号86" v-model="phoneNum" disabled />
        <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''" @blur="valid" :error-message="validsms">
          <van-button slot="button" size="small" type="primary" :disabled="smsUseable" @click="sendsms">{{content}}</van-button>
        </van-field>
        <van-field v-model.trim="password" type="password" label="新密码" placeholder="请输入密码" :error-message="errorMsg" @blur="validpassword"/>
        <van-field v-model.trim="password2" type="password" label="确认新密码" placeholder="再次输入密码" :error-message="errorMsg2" @blur="validpassword2"/>
      </van-field-group>
      <van-button size="large" type="primary" :disabled="setBtnUseable" @click="set">设置密码</van-button>
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
      hasValidSms: false
    }
  },
  computed: {
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
          this.validsms = ''
          this.hasValidSms = true
        }, err => {
          console.log(err)
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
    NavBar
  }
}
</script>
<style scoped>
</style>
