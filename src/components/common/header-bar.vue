<template>
  <div id="header-bar" class="van-hairline--bottom">
    <div class="back-btn" @click="back">
      <i class="fa fa-angle-left fa-1x"></i>
      <span>返回</span>
    </div>
    <div class="title-name">
      个人中心
    </div>
    <slot name="right-area"></slot>
  </div>
</template>
<script>
export default {
  name: 'HeaderBar',
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
#header-bar{
  width: 100%;
  height: 90px;
  line-height: 90px;
  padding: 0 30px;
  overflow: hidden;
  display: flex;
  .back-btn{
    display: inline-block;
    font-size: 30px;
    width: 100px;
    color: #4e4e4e
  }
  .title-name{
    font-size: 35px;
    width: 300px;
    text-align: center;
    margin-left: calc(50% - 130px - 150px)
  }
}
</style>
