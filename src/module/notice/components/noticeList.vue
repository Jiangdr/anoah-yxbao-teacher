<template>
  <div class="notice">
      <div class="title">
        <span class="back" @click="goBack">
          <van-icon name="arrow-left"></van-icon>
          <span>返回</span>
        </span>
        <p>通知中心</p>
      </div>
      <van-cell-group class="items">
        <van-cell title="作业消息" value="" is-link to="homeworkList">
          <b class="redIcon" v-show="isNewWorkMsg"></b>
        </van-cell>
        <router-view></router-view>
        <van-cell title="学校消息" value="" is-link to="schoolList">
           <b class="redIcon" v-show="isNewSchoolMsg"></b>
        </van-cell>
        <router-view></router-view>
      </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'noticeList',
  data () {
    return {
      isNewWorkMsg: true,
      isNewSchoolMsg: true
    }
  },
  created () {},
  computed: {},
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.notice .title {
  text-align: center;
}
.notice .title p {
  font-weight: bold;
}
.notice .title>span {
  float: left;
}
.notice .title span i {
  top: 2px;
}
.notice .items b.redIcon{
  display: inline-block;
  width:6px;
  height: 6px;
  border-radius: 50%;
  background-color: red;
}
</style>
