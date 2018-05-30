<template>
  <div id="feedback">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <van-cell-group border>
      <van-cell @click="check(item)" center border v-for="(item,index) in msgs" :key="index" :label="item.label" :title="item.title" class="feedbackmsglist">
        <img src="@/assets/images/public/checksel.png" slot="right-icon" v-if="item.isChecked" class="halfscaleelement"/>
        <img src="@/assets/images/public/checkunsel.png" slot="right-icon" v-if="!item.isChecked" class="halfscaleelement"/>
      </van-cell>
      <van-field v-model="userLink" placeholder="留下您的电话号码/QQ/邮箱" label="联系方式(选填)" class="feedbackuserLink"/>
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
    }
  },
  methods: {
    check (item) {
      item.isChecked = !item.isChecked
    },
    addQuestion () {
      this.$router.push({path: '/otherQuestion'})
    },
    post () {
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
        params.photo = this.selectImgs.toString()
      }
      // this.selectImgs = ['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']
      // params.photo = this.selectImgs.toString()
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
