<template>
  <div class="spa home">
    首页
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="chat">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      active: 0
    }
  },
  computed: {

  },
  methods: {
    change (active) {
      this.active = active
      this.$router.push({name: 'userCenter'})
    }
  }

}
</script>
<style scoped>
.ss{
  border:1px solid #ccc;
  width:375px;
}
.top-bar{
  height: 6vh;
  width: 100%;
}

</style>
