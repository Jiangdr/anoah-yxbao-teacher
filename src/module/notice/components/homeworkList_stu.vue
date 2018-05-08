<template>
<div class="homeworkList">
  <div class="title van-hairline--bottom">
    <van-row>
      <van-col span="6">
        <span class="back" @click="goBack">
          <van-icon name="arrow-left" class="top2px"></van-icon>
          <span>返回</span>
        </span>
      </van-col>
      <van-col span="12">
        <p>作业通知</p>
      </van-col>
      <van-col span="6">
        <span class="clear">清空</span>
      </van-col>
    </van-row>

  </div>
  <div class="container">
    <div class="wrapper">
      <div class="date">
        2018-05-03 13:55
      </div>
      <!--作业订正提醒v-if="type==1"-->
      <div class="item van-hairline--surround" @click="goDetail">
        <p class="title">
         <van-row>
           <van-col span="2">
             <van-icon name="warn"></van-icon>
           </van-col>
           <van-col span="18">
             <span>老师提醒错题订正</span>
           </van-col>
           <van-col span="4">
             <span class="godetail">查看  <van-icon name="arrow" class="top2px"></van-icon></span>
           </van-col>
         </van-row>
        </p>
        <div class="content">
          <p>陈乐乐老师：请抓紧时间完成暑假作业哦！</p>
        </div>
      </div>
      <!-- 及时交作业提醒 v-if="type==2"-->
      <div class="item van-hairline--surround">
        <p class="title">
         <van-row>
           <van-col span="2">
             <van-icon name="warn"></van-icon>
           </van-col>
           <van-col span="18">
             <span>老师提醒及时交卷</span>
           </van-col>
           <van-col span="4">
             <span class="godetail">查看  <van-icon name="arrow" class="top2px"></van-icon></span>
           </van-col>
         </van-row>
        </p>
        <div class="content">
          <p>陈乐乐老师：请抓紧时间完成暑假作业哦！</p>
        </div>
      </div>
      <!--  新的作业提醒 -->
      <div class="item van-hairline--surround">
        <p class="title">
         <van-row>
           <van-col span="2">
             <van-icon name="warn"></van-icon>
           </van-col>
           <van-col span="18">
             <span>新的作业</span>
           </van-col>
           <van-col span="4">
             <span class="godetail">查看  <van-icon name="arrow" class="top2px"></van-icon></span>
           </van-col>
         </van-row>
        </p>
        <div class="content">
          <p>陈乐乐老师：请抓紧时间完成暑假作业哦！</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'homeworkListStu',
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goDetail() {
      this.$router.push({
        name: 'noticeDetail'
      })
    },
    onRefresh() {
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
  line-height: 50px;
}

.homeworkList>.title p {
  font-weight: bold;
}

.homeworkList>.title .back, .homeworkList>.title .clear {
  display: inline-block;
  width:100%;
  text-align: left;
}
.homeworkList>.title .clear{
   text-align: right;
    width:calc(100% - 10px);
   margin-right: 10px;
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
.homeworkList .container>.wrapper>.item .godetail{
  display: inline-block;
  width:100%;
  font-size: 12px;
  color:#999;
  text-align: right;
}
.homeworkList .container>.wrapper>.item>.title{
  padding:10px 10px 0px;

}
.homeworkList .container>.wrapper>.item>.content {
  padding: 10px;
}

.homeworkList .container>.wrapper>.item>.content {
  text-align: center;
}

.homeworkList .container>.wrapper>.item>.content>p {
  text-align: left;
}
.homeworkList .top2px{
  top:2px;
}
.homeworkList .container>.wrapper>.item.van-hairline--surround::after{
  border-radius: 10px;
}
</style>
