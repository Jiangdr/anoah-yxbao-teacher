<template>
  <div id="setting">
    <div style="background-color: #fff;flex:0;">
      <header-bar @back="back"><span slot="title-name">{{title}}</span></header-bar>
      <van-cell-group>
        <van-cell class="aboutus-van-cell" title="清除缓存" is-link value="20Mb" center />
        <van-cell class="aboutus-van-cell" title="修改密码" is-link @click="linkTo('password')"/>
        <van-cell class="aboutus-van-cell" title="消息设置" is-link @click="linkTo('setting')"/>
        <van-cell class="aboutus-van-cell" is-link value="v1.0.0">
          <template slot="title">
            <div class="item-choice">检查更新<img src="@/assets/images/usercenter/new.png" class="halfscaleelement"/> </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <bottom-button-area :disabled="false" @click="showActionSheet = true" buttonText="退出" color="red"></bottom-button-area>
    <van-actionsheet v-model="showActionSheet" :actions="actions" cancel-text="取消" />
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import headerBar from '@/components/headerBar.vue'
import BottomButtonArea from '@/module/user-center/components/common/bottomButtonArea'
import storage from '@/store/stroage.js'
export default {
  name: 'Setting',
  data () {
    return {
      title: '设置',
      hasBack: true,
      showActionSheet: false,
      actions: [
        {
          name: '退出登录',
          callback: this.loginOut,
          className: 'warning'
        }
      ]
    }
  },
  methods: {
    linkTo (param) {
      if (param === 'password') {
        this.$router.push({path: '/modifyPassword'})
      } else {
        this.$router.push({path: '/msgSetting'})
      }
    },
    back () {
      this.$router.back(-1)
    },
    loginOut () {
      this.showActionSheet = false
      // localStorage.clear();
      if (window.bus.mqtt.client && window.bus.mqtt.client.isConnected()) {
        window.bus.mqtt.client.disconnect()
      }
      localStorage.clear()
      this.$router.push({path: '/login?redirect=/'})
    }
  },
  components: {
    NavBar,
    headerBar,
    BottomButtonArea
  }
}
</script>

<style scoped>
  #setting
  {
    height: 100%;
    background-color: #F6F7F9;
    display: flex;
    flex-direction: column;
  }
  .aboutus-van-cell
  {
    width: 97%;
  }
  div.item-choice
  {
    display: flex;
    align-items: center;
    height: 30px;
  }
</style>
