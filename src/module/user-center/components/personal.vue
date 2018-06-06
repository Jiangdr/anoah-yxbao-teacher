<template>
  <div id="user-info">
    <header-bar @back="back"><span slot="title-name">{{title}}</span></header-bar>
    <div v-if="userInfo">
      <div class="item-choice-heighter van-hairline--bottom" @click="modifyIcon">
        <span>头像</span>
        <div style="height:100%;display: flex; align-items: center">
          <img :src="this.$store.getters['runEnv/old'] + userInfo.avatar" class="avatar van-hairline--bottom-top-left-right" alt="">
          <van-icon name="arrow" class="cl-mark van-icon"></van-icon>
        </div>
      </div>
      <div class="item-choice van-hairline--bottom">
        <span>账号</span>
        <span class="cl-dec">{{userInfo.loginnm}}</span>
      </div>
      <router-link class="item-choice van-hairline--bottom" tag="div" :to="{path:'/modifyName/' + userInfo.nicknm}">
        <span>姓名</span>
        <span><span class="cl-dec">{{userInfo.nicknm}}</span><van-icon name="arrow" class="cl-mark van-icon"></van-icon></span>
      </router-link>
      <div class="item-choice van-hairline--bottom">
        <span>学校</span>
        <span class="cl-dec">{{userInfo.school_name}}</span>
      </div>
      <div class="item-choice van-hairline--bottom" @click="link(userInfo.phone)">
        <span>手机号</span>
        <span><span class="cl-dec">{{userInfo.phone || '未绑定'}}</span><van-icon name="arrow" style="vertical-align:middle;top:-2px" class="cl-mark van-icon"></van-icon></span>
      </div>
    </div>
    <input ref="file1" type="file">
    <input type="button" value="保存" @click="uploadFile">
    <van-actionsheet v-model="showActionSheet" :actions="actions" cancel-text="取消" />
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import api from '@/module/user-center/axios/usercenter'
import headerBar from '@/components/headerBar.vue'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Personal',
  data () {
    return {
      showActionSheet: false,
      sexActionSheet: false,
      pickerShow: false,
      title: '个人信息',
      hasBack: true,
      userInfo: null,
      avatarUrl: null,
      actions: [
        {
          name: '拍照',
          callback: this.capturePhoto
        },
        {
          name: '从手机相册选择',
          callback: this.selectImagesFromLocal
        }
      ]
    }
  },
  mounted () {
    api.obtainInfo({
      user_id: this.userId
    }).then(succ => {
      this.userInfo = succ
      Object.assign(this.uInfo, succ)
    })
  },
  computed: {
    ...mapState({
      userId: state => state.account.userInfo.userid,
      uInfo: state => state.account.userInfo
    })
  },
  methods: {
    ...mapMutations({
      setAvatar: 'account/setAvatar',
      setUserName: 'account/setUsername'
    }),
    uploadFile () {
      let formData = new FormData()
      formData.append('code', this.$refs.file1.files[0])
      let url
      api.uploadImage(
        '/api_dist/index.php?q=json/user/UserAvatar/uploadAvatar&info={"binary":"1"}&userid=' + this.userInfo.userid, formData
      ).then(succ => {
        url = succ.result
        this.modifyAvatar(url)
      })
    },
    link (phone) {
      if (phone) {
        this.$router.push({path: `/modifyPhone/${phone}`})
      } else {
        this.$router.push({path: `/bindPhone`})
      }
    },
    modifyIcon () {
      this.showActionSheet = true
    },
    back () {
      this.$router.back(-1)
    },
    capturePhoto () {
      window.appPlug.capturePhoto(this.getImagesSuc, this.getImagesFail, true, true)
    },
    selectImagesFromLocal () {
      window.appPlug.getImage(this.getImagesSuc, this.getImagesFail, true, true)
    },
    getImagesSuc (v) {
      let formData = new FormData()
      formData.append('code', v)
      alert('v=' + v)
      let url
      api.uploadImage(
        '/api_dist/index.php?q=json/user/UserAvatar/uploadAvatar&info={"binary":"1"}&userid=' + this.userInfo.userid, formData
      ).then(succ => {
        url = succ.result
        alert('succ.result=' + url)
        this.modifyAvatar(url)
      })
      this.showActionSheet = false
    },
    getImagesFail (e) {
      alert(e)
    },
    modifyAvatar (url) {
      api.modify({
        user_id: this.userId,
        data: {
          avatar: this.$store.getters['runEnv/old'] + url + '?v=' + new Date().getTime()
        }
      }).then(succ => {
        this.avatarUrl = url + '?v=' + new Date().getTime()
        this.setAvatar(this.avatarUrl)
        this.userInfo.avatar = this.avatarUrl
        alert('modifyAvatar succ')
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'modifyName' && from.meta.nickName) {
        vm.setUserName(from.meta.nickName)
        to.meta.nickName = from.meta.nickName
        from.meta.nickName = null
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.showActionSheet) {
      this.showActionSheet = false
      next(false)
    } else {
      if (this.avatarUrl) {
        this.$route.meta.avatarUrl = this.avatarUrl
      }
      next()
    }
  },
  components: {
    NavBar,
    headerBar
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
  #user-info .item-choice-heighter
  {
    display: flex;
    justify-content: space-between;
    height: 70px;
    line-height: 70px;
    padding: 0 15px;
  }

  #user-info .item-choice .avatar,#user-info .item-choice-heighter .avatar{
    width: 60px;
    height: 60px;
    align-self: center;
    border-radius: 50%;
  }

  .time-picker{
    position: fixed;
    z-index: 2;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .model{
    width: 100%;
    z-index: 1;
    /*height: calc(100% - 260px);*/
    height: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(0,0,0,.3)
  }
  .item-choice,.item-choice-heighter{
    margin:auto;
    width: 86%;
  }
  .van-icon{
    vertical-align:middle;
    top:-2px;
    margin-left: 10px;
  }
</style>
