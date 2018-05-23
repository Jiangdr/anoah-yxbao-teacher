<template>
  <div id="header-bar" class="van-hairline--bottom">
    <div class="back-btn" @click="back">
      <i class="fa fa-angle-left fa-1x"></i>
      <span>返回</span>
    </div>
    <div class="title-name">
      <slot name="title-name">
        标题
      </slot>
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
  height: 45px;
  line-height: 45px;
  padding: 0 13px;
  overflow: hidden;
  display: flex;
  .back-btn{
    display: inline-block;
    font-size: 15px;
    width: 50px;
    color: #4e4e4e
  }
  .title-name{
    font-size: 18px;
    width: 150px;
    text-align: center;
    margin-left: calc(50% - 65px - 75px)
  }
}
</style>
