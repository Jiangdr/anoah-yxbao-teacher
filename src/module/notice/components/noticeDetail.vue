<template>
<div class="noticeDetail">
  <div class="title van-hairline--bottom">
    <van-row>
      <van-col span="4">
        <span class="back" @click="goBack">
          <van-icon name="arrow-left"></van-icon>
          <span>返回</span>
        </span>
      </van-col>
      <van-col span="16">
        <p>通知详情</p>
      </van-col>
      <van-col span="4"></van-col>
    </van-row>
  </div>
</div>
</template>

<script>
import headerBar from '@/components/headerBar.vue'

export default {
  name: 'noticeDetail',
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.noticeDetail>.title {
  text-align: center;
  padding-bottom: 5px;
  height: 50px;
  line-height: 50px;
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
