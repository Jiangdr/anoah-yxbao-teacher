<template>
  <div id="user-info">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <div v-if="userInfo">
      <div class="item-choice van-hairline--bottom" @click="modifyIcon">
        <span>头像</span>
        <img :src="userInfo.avatar" class="avatar van-hairline--bottom-top-left-right" alt="">
      </div>
      <div class="item-choice van-hairline--bottom">
        <span>账号</span>
        <span>{{userInfo.loginnm}}</span>
      </div>
      <router-link class="item-choice van-hairline--bottom" tag="div" :to="{path:'/modifyName/' + userInfo.nicknm}">
        <span>姓名</span>
        <span><span>{{userInfo.nicknm}}</span><van-icon name="arrow" style="vertical-align:middle;top:-2px"></van-icon></span>
      </router-link>
      <div class="item-choice van-hairline--bottom">
        <span>学校</span>
        <span>{{userInfo.school_name}}</span>
      </div>
      <div class="item-choice van-hairline--bottom" @click="link(userInfo.phone)">
        <span>手机号</span>
        <span><span>{{userInfo.phone || '未绑定'}}</span><van-icon name="arrow" style="vertical-align:middle;top:-2px"></van-icon></span>
      </div>
    </div>
    <van-actionsheet v-model="showActionSheet" :actions="actions" cancel-text="取消" />
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import api from '@/module/user-center/axios/usercenter'
import {mapGetters} from 'vuex'
export default {
  name: 'Personal',
  data () {
    return {
      showActionSheet: false,
      title: '个人中心',
      hasBack: true,
      userInfo: null,
      actions: [
        {
          name: '拍照',
          callback: this.camera
        },
        {
          name: '从手机相册选择'
        }
      ]
    }
  },
  mounted () {
    api.obtainInfo({
      user_id: this.userId
    }).then(succ => {
      if (succ.avatar.indexOf('http://') === -1) {
        succ.avatar = this.config.apiDomain.old + succ.avatar
      }
      this.userInfo = succ
    })
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    })
  },
  watch: {
    userInfo (val, o) {
      console.log(val, o)
    }
  },
  methods: {
    modifyIcon () {
      this.showActionSheet = true
    },
    back () {
      this.$router.back(-1)
    },
    link (phone) {
      if (phone) {
        this.$router.push({path: `/modifyPhone/${phone}`})
      } else {
        this.$router.push({path: `/bindPhone`})
      }
    },
    camera () {
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.showActionSheet) {
      this.showActionSheet = false
      next(false)
    } else {
      next()
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
  #user-info .item-choice{
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
  }
  #user-info .item-choice .avatar{
    width: 40px;
    height: 40px;
    align-self: center;
    border-radius: 50%;
  }
</style>
