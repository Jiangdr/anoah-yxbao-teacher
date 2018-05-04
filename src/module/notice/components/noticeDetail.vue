<template>
  <div class="noticeDetail">
      <div class="title van-hairline--bottom">
        <span class="back" @click="goBack">
          <van-icon name="arrow-left"></van-icon>
          <span>返回</span>
        </span>
        <p>通知详情</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'noticeDetail',
  data () {
    return {}
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.noticeDetail>.title {
  text-align: center;
  padding-bottom: 5px;
}
.noticeDetail>.title p {
  font-weight: bold;
}
.noticeDetail>.title>span {
  float: left;
}
.noticeDetail>.title span i {
  top: 2px;
}
</style>
