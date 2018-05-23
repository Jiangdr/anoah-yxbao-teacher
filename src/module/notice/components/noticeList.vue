<template>
  <div class="notice">
      <div class="title">
        <van-row>
          <van-col span="4">
            <span class="back" @click="goBack">
              <van-icon name="arrow-left"></van-icon>
              <span>返回</span>
            </span>
          </van-col>
          <van-col span="16">
             <p>通知中心</p>
          </van-col>
          <van-col span="4"></van-col>
        </van-row>
      </div>
      <van-cell-group class="items">
        <van-cell title="作业消息" value="" is-link :to="identity=='teacher'?'homeworkList':'homeworkList_stu'">
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
      isNewSchoolMsg: true,
      identity: 'teacher'
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
  line-height: 50px;
  height: 50px;
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
