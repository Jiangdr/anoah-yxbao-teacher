<template>
<div class="schoolList">
  <div class="title van-hairline--bottom">
    <van-row>
      <van-col span="4">
        <span class="back" @click="goBack">
          <van-icon name="arrow-left" class="top2px"></van-icon>
          <span>返回</span>
        </span>
      </van-col>
      <van-col span="16">
        <p>学校通知</p>
      </van-col>
      <van-col span="4">
        <span></span>
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
           <van-col span="19">
             <span class="text">这里是通知标题这里是通知标题这里是通知标题这里是通知标题这里是通知标题这里是通知标题这里是通知标题这里是通知标题这里是通知标题</span>
           </van-col>
           <van-col span="3">
             <span class="godetail">查看  <van-icon name="arrow" class="top2px"></van-icon></span>
           </van-col>
         </van-row>
        </p>
        <div class="content">
          <p>这里是通知正文这里是通知正文这里是通知正文这里是通知正文这里是通知正文这里是通知正文这里是通知正文这里是通知正文这里是通知正文这里是通知正文这里是通知正文</p>
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
import headerBar from '@/components/headerBar.vue'

export default {
  name: 'schoolList',
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
.schoolList>.title {
  text-align: center;
  padding-bottom: 5px;
  height: 50px;
  line-height: 50px;
}

.schoolList>.title p {
  font-weight: bold;
}

.schoolList>.title .back{
  display: inline-block;
  width:100%;
  text-align: left;
}

.schoolList .container>.wrapper {
  overflow: scroll;
  height: calc(100vh - 60px);
  padding-top:16px;
  box-sizing: border-box;
}

.schoolList .container>.wrapper>.date {
  text-align: center;
}

.schoolList .container>.wrapper>.item {
  margin: 10px;
}
.schoolList .container>.wrapper>.item .godetail{
  display: inline-block;
  width:100%;
  font-size: 12px;
  color:#999;
  text-align: right;
}
.schoolList .container>.wrapper>.item>.title{
  padding:10px 10px 0px;

}
.schoolList .container>.wrapper>.item>.title .text{
  display: inline-block;
  width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.schoolList .container>.wrapper>.item>.content {
  padding: 10px;
}

.schoolList .container>.wrapper>.item>.content {
  text-align: center;
}

.schoolList .container>.wrapper>.item>.content>p {
  text-align: left;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:2;
}
.schoolList .top2px{
  top:2px;
}
.schoolList .container>.wrapper>.item.van-hairline--surround::after{
  border-radius: 10px;
}
</style>
