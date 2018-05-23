<template>
<div class="homeworkList">
  <div class="title van-hairline--bottom">
    <span class="back" @click="goBack">
<van-icon name="arrow-left"></van-icon>
<span>返回</span>
    </span>
    <p>作业通知</p>
  </div>
    <div class="container">
      <div class="wrapper">
        <!-- <div class="date">
          2018-05-03 13:55
        </div> -->
      <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <!-- <div class="item van-hairline--surround" v-for="item in list" :key="item" >
            <p class="title van-hairline--bottom">作业报告</p>
            <div class="content">
              <p>作业：一次函数的解析式（五年级1班）已经全部提交啦，您可以去作业报告中查看班级作业详情。</p>
              <p>已批改：<b>0/35</b></p>
              <van-button type="primary" size="small" @click="goDetail">立即查看</van-button>
            </div>
          </div> -->
          <div v-for="item in list" :key="item">{{item}}</div>
        </van-list>
      </van-pull-refresh>
        <!-- 作业报告通知 v-if="type==1"-->
        <!-- <div class="item van-hairline--surround">
          <p class="title van-hairline--bottom">作业报告</p>
          <div class="content">
            <p>作业：一次函数的解析式（五年级1班）已经全部提交啦，您可以去作业报告中查看班级作业详情。</p>
            <p>已批改：<b>0/35</b></p>
            <van-button type="primary" size="small" @click="goDetail">立即查看</van-button>
          </div>
        </div> -->
        <!-- 批改作业通知 v-if="type==2"-->
        <!-- <div class="item van-hairline--surround">
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
        </div> -->
      </div>
    </div>
</div>
</template>

<script>
import notice from '../axios/notice.js'
export default {
  name: 'homeworkList',
  data () {
    return {
      loading: false,
      refreshLoading: false,
      finished: false,
      params: {
        type: 2, //  作业列表
        page: 1, // 页码
        per_page: 10, // 每页显示条数
        role: 'teacher',
        user_id: JSON.parse(localStorage.userinfo).userid
      },
      list: [],
      totalPage: 0
    }
  },
  activated() {
    console.log(notice)
    this.getNoticelist();
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
    getNoticelist () {
      notice.getList(this.params).then((r) => {
        this.totalPage = r.totalPage
        this.list = r.list
      })
    },
    onRefresh () {
      this.params.page = 1
      this.getNoticelist()
      setTimeout(() => {
        this.refreshLoading = false
      }, 500)
    },
    onLoad () {
      if (this.params.page >= this.totalPage) {
        this.loading = false
        this.finished = true
      } else {
        this.params.page++
        this.getNoticelist();
      }
    }
  }
}
</script>

<style scoped>
.homeworkList>.title {
  text-align: center;
  padding-bottom: 5px;
  height: 50px;
  line-height: 50px;
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
  padding-top:16px;
  box-sizing: border-box;
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
