<template>
  <div class="cube-page cube-view button-view">

    <header class="header">
      <h1>批量评价</h1>
      <i class="cubeic-back" @click="goHomework">
        <i class="fa fa-angle-left back-up-arrow"></i><span class="back-up-text">返回</span>
      </i>
    </header>

    <!-- <div class="select-container">
      <span class="select-span">
        <div class="select-span-div" @click="clickTime">时间</div>
      </span>
      <span class="select-span">
        <div class="select-span-div" @click="clickStatus">状态</div>
      </span>
      <span class="select-span">
        <div class="select-span-div" @click="clickClass">班级</div>
      </span>
    </div> -->

    <div style="height: 40px;line-height: 40px;background-color: #fff;border-bottom: 1px solid #ededf0;">
        <div style="display: inline-block;">正确率：</div>
        <div style="display: inline-block;">全部</div>
        <div style="display: inline-block;">100%</div>
        <div style="display: inline-block;">90-99%</div>
    </div>

    <div style="height: 40px;line-height: 40px;background-color: #fff;border-bottom: 1px solid #ededf0;">
        <div style="display: inline-block;">评价：</div>
        <div style="display: inline-block;">待评价</div>
        <div style="display: inline-block;">已评价</div>
        <div style="display: inline-block;">待批改</div>
      <!-- 共{{totalCountNum}}个作业&nbsp;&nbsp;<span style="color: red;">{{countNum}}</span>个待批改 -->
    </div>

    <div>
        <span @click="clickStudent">张三</span>
        <span @click="clickStudent">张三</span>
        <span @click="clickStudent">张三</span>
    </div>

    <div class="yxban-tabbar--fixed van-tabbar">
      <div class="van-tabbar-item">
        <div class="van-tabbar-item__icon">
          <i class="fa fa-location-arrow"></i>
        </div>
        <div class="van-tabbar-item__text">
          <span>退回作业</span>
        </div>
      </div>
      <div class="van-tabbar-item">
        <div class="van-tabbar-item__icon">
          <i class="fa fa-location-arrow"></i>
        </div>
        <div class="van-tabbar-item__text">
          <span>给表扬</span>
        </div>
      </div>
      <div class="van-tabbar-item">
        <div class="van-tabbar-item__icon">
          <i class="fa fa-location-arrow"></i>
        </div>
        <div class="van-tabbar-item__text">
          <span>写评语</span>
        </div>
      </div>
    </div>

    <!-- <div class="listContainer" v-bind:style="listContainerStyle">
      <van-pull-refresh v-model="pullRefresIsLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="loadMore" :offset="300" :immediate-check="false">
          <div @click="goHomeworkDetail(item)" class="homework_list" v-for="(item, index) in homeworkListArray" :key="index" v-if="homeworkListArray.length > 0">
            <div class="listContainerLeft">
              <div class="homework_list_inline_list"><span style="font-size:18px;font-weight:700;">{{item.title}}</span>&nbsp;&nbsp;<span class="font-color">{{item.resource_count}}份</span></div>
              <div class="homework_list_inline_list font-color">{{item.edu_subject_name}}&nbsp;&nbsp;&nbsp;{{item.class_name}}</div>
              <div class="homework_list_inline_list"><span class="font-color">完成：</span><span style="color:#2ec2a9;font-size:22px;">{{item.finished_counter}}</span><span class="font-color">/{{item.student_counter}}人</span></div>
              <div class="homework_list_inline_list font-color" style="font-size: 14px;"><span class="font-color">截止：</span>{{item.deadline}}</div>
            </div>
            <div class="listContainerRight">
              正确率:&nbsp;&nbsp;&nbsp;
                <span class="font-color" style="font-size:28px;color: #2ec2a9">{{item.right_rate >= 0 ? item.right_rate*100 : '--'}}</span>
                <span v-if="item.right_rate > 0" style="font-size:16px;color: #2ec2a9">%</span>
                <i class="fa fa-angle-right arrow-right"></i>
            </div>
            <div style="clear:both;"></div>
          </div>
        </van-list>

        <div v-if="homeworkListArray.length === 0" style="height: 200px;line-height: 200px;text-align: center;">
          没有数据
        </div>
      </van-pull-refresh>
    </div> -->

    <!-- <div class="publishHomeworkBtnDiv" @click="goChooseTextbook">
      <div class="publishHomeworkBtn">
        <div>布置<br/>作业</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import api from "@/axios/publishHomeWork.js";

export default {
  name: "Homework",
  data() {
    return {
      homeworkListArray: [],
      listContainerStyle: {
        height: window.innerHeight - 90 + "px"
      },
      list: [],
      loading: false,
      finished: false,
      pullRefresIsLoading: false,
      currentPage: 1,
      totalPage: 1,
      countNum: 0,
      totalCountNum: 0,
      active: 0
    };
  },
  mounted: function() {
    this.userInfo = this.$store.state.account.userInfo;
  },
  methods: {
    goHomework () {
      this.$router.push({
        path: "/homework"
      });
    },
    clickStudent() {}
  }
};
</script>

<style scoped>
.homework_list {
  margin-top: 1.33333vw;
  padding: 1.86667vw;
  background: #fff;
  width: 91%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
}
.listContainerLeft {
  width: 58%;
  display: inline-block;
}
.listContainerRight {
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 40%;
}
.select-span {
  width: 60px;
  display: inline-block;
}
.select-span-div {
  padding: 10px;
  border-radius: 2px;
  font-size: 14px;
  line-height: 1.429;
  position: relative;
  box-sizing: border-box;
}
.publishHomeworkBtn {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.publishHomeworkBtnDiv {
  width: 50px;
  height: 50px;
  background-color: #2ec2a9;
  border-radius: 25px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #ffffff;
}
.select-container {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #ededf0;
}
.homework_list_inline_list {
  line-height: 25px;
}
.listContainer {
  overflow-y: auto;
}
.font-color {
  color: #989ca0;
}
.arrow-right {
  font-size: 36px;
  float: right;
  color: #989ca0;
}
.yxban-tabbar--fixed {
  left: 0;
  bottom: 0;
  position: fixed;
}
.van-tabbar {
  width: 100%;
  height: 13.33333vw;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-color: #fff;
}
.van-tabbar-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: #666;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  line-height: 1;
  font-size: 3.2vw;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.van-tabbar-item--active {
  color: #2ec2a9;
}
.van-tabbar-item__icon {
    font-size: 4.8vw;
    margin-bottom: 1.33333vw;
    position: relative;
}
</style>
