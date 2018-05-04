<template>
  <div class="schoolList">
      <div class="title van-hairline--bottom">
        <span class="back" @click="goBack">
          <van-icon name="arrow-left"></van-icon>
          <span>返回</span>
        </span>
        <p>学校通知</p>
      </div>
  </div>
</template>
<script>
export default {
  name: 'schoolList',
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
.schoolList>.title {
  text-align: center;
  padding-bottom: 5px;
}
.schoolList>.title p {
  font-weight: bold;
}
.schoolList>.title>span {
  float: left;
}
.schoolList>.title span i {
  top: 2px;
}
</style>
