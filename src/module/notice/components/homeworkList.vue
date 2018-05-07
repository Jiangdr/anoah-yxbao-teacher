<template>
<div class="homeworkList">
  <div class="title van-hairline--bottom">
    <span class="back" @click="goBack">
<van-icon name="arrow-left"></van-icon>
<span>返回</span>
    </span>
    <p>作业通知</p>
  </div>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="container">
      <div class="wrapper">
        <div class="date">
          2018-05-03 13:55
        </div>
        <!-- 作业报告通知 v-if="type==1"-->
        <div class="item van-hairline--surround">
          <p class="title van-hairline--bottom">作业报告</p>
          <div class="content">
            <p>作业：一次函数的解析式（五年级1班）已经全部提交啦，您可以去作业报告中查看班级作业详情。</p>
            <p>已批改：<b>0/35</b></p>
            <van-button type="primary" size="small" @click="goDetail">立即查看</van-button>
          </div>
        </div>
        <!-- 批改作业通知 v-if="type==2"-->
        <div class="item van-hairline--surround">
          <p class="title van-hairline--bottom">作业批改</p>
          <div class="content">
            <p>作业：一次函数的解析式（五年级1班）已经全部提交，您还有同学作业未批改哟</p>
            <p>已提交：<b>0/35</b></p>
            <p>已批改：<b>0/35</b></p>
            <p>您可以去作业报告查看当前详情,不要忘记批改作业哟~</p>
            <van-button type="primary" size="small" @click="goDetail">立即查看</van-button>
          </div>
        </div>
        <div class="item van-hairline--surround">
          <p class="title van-hairline--bottom">作业批改</p>
          <div class="content">
            <p>作业：一次函数的解析式（五年级1班）已经全部提交，您还有同学作业未批改哟</p>
            <p>已提交：<b>0/35</b></p>
            <p>已批改：<b>0/35</b></p>
            <p>您可以去作业报告查看当前详情,不要忘记批改作业哟~</p>
            <van-button type="primary" size="small" @click="goDetail">立即查看</van-button>
          </div>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</div>
</template>

<script>
export default {
  name: 'homeworkList',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goDetail () {
      this.$router.push({
        name: 'noticeDetail'
      })
    },
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
        console.log('刷新')
      }, 500)
    }
  }
}
</script>

<style scoped>
.homeworkList>.title {
  text-align: center;
  padding-bottom: 5px;
  height: 50px;
}

.homeworkList>.title p {
  font-weight: bold;
}

.homeworkList>.title>span {
  float: left;
}

.homeworkList>.title span i {
  top: 2px;
}

.homeworkList .container>.wrapper {
  overflow: scroll;
  height: calc(100vh - 60px);
}

.homeworkList .container>.wrapper>.date {
  text-align: center;
}

.homeworkList .container>.wrapper>.item {
  margin: 10px;
}

.homeworkList .container>.wrapper>.item>.title,
.homeworkList .container>.wrapper>.item>.content {
  padding: 10px;
}

.homeworkList .container>.wrapper>.item>.content {
  text-align: center;
}

.homeworkList .container>.wrapper>.item>.content>p {
  text-align: left;
}
</style>
