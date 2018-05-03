<template>
  <div id="user-info">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <div class="item-choice van-hairline--bottom" @click="modifyIcon">
      <span>头像</span>
      <img :src="userInfo.avatar" class="avatar van-hairline--bottom-top-left-right" alt="">
    </div>
    <div class="item-choice van-hairline--bottom">
      <span>账号</span>
      <span>{{userInfo.username}}</span>
    </div>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{name:'modifyName'}">
      <span>姓名</span>
      <span><span>{{userInfo.real_name}}</span><van-icon name="arrow" style="vertical-align:middle;top:-2px"></van-icon></span>
    </router-link>
    <div class="item-choice van-hairline--bottom">
      <span>学校</span>
      <span>{{userInfo.school_name}}</span>
    </div>
    <router-link class="item-choice van-hairline--bottom" tag="div" :to="{name:'modifyPhone'}">
      <span>手机号</span>
      <span><span>{{userInfo.phone || '请绑定'}}</span><van-icon name="arrow" style="vertical-align:middle;top:-2px"></van-icon></span>
    </router-link>
    <van-actionsheet v-model="showActionSheet" :actions="actions" cancel-text="取消" />
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import {mapGetters} from 'vuex'
export default {
  name: 'Personal',
  data () {
    return {
      showActionSheet: false,
      title: '个人中心',
      hasBack: true,
      actions: [
        {
          name: '拍照'
        },
        {
          name: '从手机相册选择'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userCenter/userInfo'
    })
  },
  methods: {
    modifyIcon () {
      this.showActionSheet = true
    },
    back () {
      this.$router.back(-1)
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
