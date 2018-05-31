<template>
  <div id="feedback">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <van-cell-group border>
      <van-cell @click="check(item)" center border v-for="(item,index) in msgs" :key="index" :label="item.label" :title="item.title" class="feedbackmsglist">
        <img src="@/assets/images/public/checksel.png" slot="right-icon" v-if="item.isChecked" class="halfscaleelement"/>
        <img src="@/assets/images/public/checkunsel.png" slot="right-icon" v-if="!item.isChecked" class="halfscaleelement"/>
      </van-cell>
      <van-field v-model="userLink" placeholder="留下您的电话号码/QQ/邮箱" label="联系方式(选填)" class="feedbackuserLink" :error-message="phoneFormatMsg"/>
      <van-cell title="其他问题" :value="other" is-link @click="addQuestion" class="feedbackotherquestion">
        <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon"></van-icon>
      </van-cell>
    </van-cell-group>
    <bottom-button-area :disabled="disabled" @click="post" buttonText="提 交"></bottom-button-area>
  </div>
</template>
<script>

import api from '@/module/user-center/axios/usercenter'
import NavBar from '@/module/user-center/components/common/navbar'
import YxLoginBtn from '@/module/account/components/yx-login-btn.vue'
import BottomButtonArea from '@/module/user-center/components/common/bottomButtonArea'
import {Toast} from 'vant'
const phonereg = /^[1][3,4,5,7,8,9][0-9]{9}$/
const emailreg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
export default {
  name: 'Feedback',
  data () {
    return {
      title: '意见反馈',
      hasBack: true,
      msgs: [
        {
          title: '软件太难操作',
          label: '',
          isChecked: false
        },
        {
          title: '软件风格不太喜欢',
          label: '',
          isChecked: false
        },
        {
          title: '功能太少不实用',
          label: '',
          isChecked: false
        },
        {
          title: '太卡,流畅度不好',
          label: '',
          isChecked: false
        },
        {
          title: '资源利用率低',
          label: '资源陈旧,相关度不高,数量太少,质量不高等',
          isChecked: false
        }
      ],
      feedbackOptions: [],
      other: '请添加问题描述或截图',
      otherMsg: '',
      selectImgs: [],
      userLink: '',
      isDisabled: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'otherQuestion') {
        vm.otherMsg = from.meta.msg
        vm.selectImgs = from.meta.selectImgs
        if (vm.otherMsg !== '' || vm.selectImgs.length > 0) {
          vm.other = '已添加'
        } else {
          vm.other = '请添加问题描述或问题截图'
        }
      }
    })
  },
  computed: {
    disabled () {
      for (let i = 0; i < this.msgs.length; i++) {
        if (this.msgs[i].isChecked) {
          return false
        }
      }
      if (this.otherMsg !== '' || this.selectImgs.length > 0) {
        return false
      }
      return true
    },
    phoneFormatMsg() {
      if (this.userLink !== '') {
        if (phonereg.test(this.userLink) || emailreg.test(this.userLink)) {
          return ''
        }
        return '请输入正确的手机号或邮箱'
      }
      return ''
    }
  },
  methods: {
    check (item) {
      item.isChecked = !item.isChecked
    },
    addQuestion () {
      this.$router.push({path: '/otherQuestion'})
    },
    uploadImg (feedbackParams) {
      let userid = this.$store.state.account.userInfo.userid
      let jwt = this.$store.state.account.jwt.jwt
      let getGrant = this.$store.getters['runEnv/yxp_apis2'] + '/feedback/getGrant'
      let param = [userid, jwt, getGrant, JSON.stringify(this.selectImgs)]
      window.appPlug.aliUpLoad(param, succ => {
        // alert('succ: ' + succ.toString())
        let res = JSON.parse(succ)
        let photos = []
        let len = res.length
        for (let i = 0; i < len; i++) {
          photos.push(res[i].host_oss + res[i].path_physical)
        }
        feedbackParams.photo = photos.toString()
        this.feedback(feedbackParams)
      }, fail => {
        // alert('fail: ' + fail.toString())
      })
    },
    post () {
      if (this.phoneFormatMsg !== '') {
        Toast({position: 'bottom', message: '请输入正确的手机号或邮箱'})
        return
      }
      this.feedbackOptions = []
      for (let i = 0; i < this.msgs.length; i++) {
        if (this.msgs[i].isChecked) {
          this.feedbackOptions.push(Number(i + 1))
        }
      }
      let params = {}
      params.userId = this.$store.state.account.userInfo.userid
      if (this.feedbackOptions.length > 0) {
        params.feedbackContent = this.feedbackOptions.toString()
      }
      if (this.userLink !== '') {
        params.contact = this.userLink
      }
      if (this.otherMsg !== '') {
        params.content = this.otherMsg
      }
      if (this.selectImgs.length > 0) {
        this.uploadImg(params)
      } else {
        this.feedback(params)
      }
    },
    feedback (params) {
      api.feedback(params).then(res => {
        for (let i = 0; i < this.msgs.length; i++) {
          this.msgs[i].isChecked = false
        }
        this.userLink = ''
        Toast({position: 'bottom', message: '感谢您的反馈，我们会做得更好'})

        let len = this.$router.options.routes.length
        for (let i = 0; i < len; i++) {
          if (this.$router.options.routes[i].name === 'otherQuestion') {
            this.$router.options.routes[i].meta.isclear = true
            this.$router.options.routes[i].meta.msg = ''
            this.$router.options.routes[i].meta.selectImgs = []
            break
          }
        }
        this.back()
      })
    },
    back () {
      this.$router.back(-1)
    }
  },
  components: {
    NavBar,
    YxLoginBtn,
    BottomButtonArea
  }
}
</script>

<style lang="scss" scoped>
</style>
<style>
  #feedback .van-cell__value{flex: 2;}
</style>
