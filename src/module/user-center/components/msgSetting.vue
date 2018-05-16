<template>
  <div id="msg-setting">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <van-cell-group>
      <van-switch-cell border v-model="hwMsg" title="接收作业消息"/>
      <van-switch-cell border v-model="schMsg" title="接收学校通知"/>
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
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
    NavBar
  }
}
</script>

<style scoped>
</style>
