<template>
  <div id="bing-phone">
    <van-field center v-model.trim="phone" label="手机号" placeholder="请输入手机号" icon="clear" @click-icon="phone = ''" :error-message="validPhone">
      <van-button slot="button" size="small" type="primary" :disabled="smsUseable" @click="sendsms">{{content}}</van-button>
    </van-field>
    <van-field center v-model.trim="sms" :disabled="isInput" label="手机验证码" placeholder="请输入验证码" icon="clear" @click-icon="sms = ''" :error-message="validsms"></van-field>
    <van-button type="primary" size="large" :disabled="isDisabled" @click="bind">绑定手机</van-button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import api from '@/module/user-center/axios/usercenter'
import {Toast} from 'vant'
export default {
  name: 'BindPhone',
  data () {
    return {
      phone: '',
      sms: '',
      validPhone: '',
      smsUseable: true,
      content: '获取验证码',
      validsms: '',
      timer: null,
      timeLen: 60,
      isInput: true,
      isDisabled: true
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    })
  },
  watch: {
    phone (value) {
      if (value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/)) {
        this.smsUseable = false
      } else {
        this.smsUseable = true
      }
    },
    sms (value) {
      if (value && this.phone && !this.isInput) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  },
  methods: {
    sendsms () {
      this.smsUseable = true
      this.captcha()
      this.timer = setInterval(() => {
        if (this.timeLen < 0) {
          clearInterval(this.timer)
          this.content = '发送验证码'
          this.smsUseable = false
          this.timeLen = 60
          return false
        }
        this.content = `${this.timeLen}s`
        this.timeLen--
      }, 1000)
    },
    captcha () {
      api.captcha({
        user_id: this.userId,
        phone: this.phone
      }).then(succ => {
        if (succ.id) {
          this.isInput = false
          Toast({position: 'bottom', message: '验证码发送成功'})
        }
      })
    },
    bind () {
      api.bind({
        user_id: this.userId,
        phone: this.phone,
        captcha: this.sms
      }).then(succ => {
        console.log(succ)
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
</style>
