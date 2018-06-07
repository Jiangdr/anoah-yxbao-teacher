<template>
  <div id="modify-phone" style="height: 100%">
    <header-bar @back="back"><span slot="title-name">{{title}}</span></header-bar>
    <div class="topDiv">
      <div class="personinfodiv">
        <img :src="avatar" alt="..." class="avatar">
        <span>{{userInfo.nicknm}}</span>
        <div class="cl-mark">{{$route.params.phone}}</div>
      </div>
      <div style="width: 100%">
        <div class="van-hairline--bottom" style="width: 95%; margin-bottom: 10px">
          <div class="cl-mark2 ft14" style="padding-left: 15px">验证码</div>
          <van-field center v-model="sms" placeholder="请输入验证码" icon="clear" @click-icon="sms = ''" :error-message="validsms" style="width: 100%">
            <van-button slot="button" size="small" type="primary" :disabled="smsUseable" @click="sendsms" style="background-color:#09B784;border:none;border-radius: 9px">{{content}}</van-button>
          </van-field>
        </div>
        <span style="align-self: flex-start; padding-left: 26px" class="cl-yellow ft14">如果需要修改手机,请先进行验证</span>
      </div>
    </div>
    <bottom-button-area :disabled="isNext" @click="next" buttonText="下一步"></bottom-button-area>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import api from '@/module/user-center/axios/usercenter'
import headerBar from '@/components/headerBar.vue'
import BottomButtonArea from '@/module/user-center/components/common/bottomButtonArea'
import {mapGetters, mapState} from 'vuex'
import {Toast} from 'vant'
export default {
  name: 'ModifyPhone',
  data () {
    return {
      title: '修改手机',
      hasBack: true,
      sms: '',
      validsms: '',
      content: '获取验证码',
      smsUseable: false,
      timeLen: 60,
      isNext: true,
      timer: null
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    }),
    ...mapState({
      userInfo(state) {
        return state.account.userInfo
      }
    }),
    avatar () {
      return this.$store.getters['runEnv/old'] + this.userInfo.avatar
    }
  },
  watch: {
    sms (value) {
      if (value) {
        this.isNext = false
        this.validsms = ''
      } else {
        this.isNext = true
        this.validsms = '验证码不能为空'
      }
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
        phone: this.$route.params.phone
      }).then(succ => {
        if (succ.id) {
          Toast({position: 'bottom', message: '验证码发送成功'})
        }
      })
    },
    next () {
      api.valid({
        user_id: this.userId,
        phone: this.$route.params.phone,
        captcha: this.sms
      }).then(succ => {
        this.$router.push({path: '/bindPhone'})
      }, err => {
        console.log(err)
        this.validsms = '手机校验码输入有误'
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  components: {
    NavBar,
    headerBar,
    BottomButtonArea
  }
}
</script>

<style scoped>
  .avatar{
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border: 2px solid #ffffff;
    display: inline-block;
    margin-bottom: 10px;
  }
  div.topDiv
  {
    display: flex;
    height: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  div.personinfodiv{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
  .van-button--disabled
  {
    color: #ffffff;
  }
</style>
