<template>
  <div id="msg-setting">
    <header-bar @back="back"><span slot="title-name">{{title}}</span></header-bar>
    <van-cell-group>
      <van-switch-cell class="msgSettingVanSwitch" border v-model="hwMsg" title="接收作业消息"/>
      <van-switch-cell class="msgSettingVanSwitch" border v-model="schMsg" title="接收学校通知"/>
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import headerBar from '@/components/headerBar.vue'
export default {
  name: 'MsgSetting',
  data () {
    return {
      title: '消息设置',
      hasBack: true
    }
  },
  created () {
    let notice = JSON.parse(localStorage.getItem('notice'))
    if (!notice) {
      localStorage.setItem('notice', JSON.stringify({hwMsg: true, schMsg: true}))
    }
  },
  computed: {
    hwMsg: {
      get () {
        return this.$store.state.userCenter.hwMsg
      },
      set (value) {
        this.setInfo('hwMsg', value)
      }
    },
    schMsg: {
      get () {
        return this.$store.state.userCenter.schMsg
      },
      set (value) {
        this.setInfo('schMsg', value)
      }
    }
  },
  methods: {
    setInfo (key, val) {
      let notice = JSON.parse(localStorage.getItem('notice'))
      notice[key] = val
      localStorage.setItem('notice', JSON.stringify(notice))
      this.$store.commit({
        type: `userCenter/set${key}`,
        val: val
      })
    },
    back () {
      this.$router.back(-1)
    }
  },
  components: {
    NavBar,
    headerBar
  }
}
</script>

<style scoped>
  .van-switch{
    background-color: #a21d1d;
  }
</style>
