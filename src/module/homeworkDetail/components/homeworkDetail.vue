<template>
<div class="detail">
  <div class="wrapper">
    <!-- 作业名称 开始时间 结束时间 -->
    <div class="info">
      <p class="name">
        {{homeworkInfo.title}}
        <span style="float:right">共<b>{{resourceList.length}}</b>份</span>
      </p>
      <p class="times">
        截止时间：{{homeworkInfo.deadline}}
      </p>
    </div>
    <!-- 平均正确率 -->
    <div class="correct">
      <i class="icon"  @click="toggleTips"></i>
      <div>
        <correct-circle
          :r="55"
          :startColor="'#75bdff'"
          :middleColor="'#86c2ff'"
          :stopColor="'#3ea2ff'"
          :stroke="14"
          :strokeColor="'#e8ecef'"
          :correct="correct>=0?correct*100:0"
          :domid="'process'"
          :text="`<div style='font-size:16px;font-weight:bold'>${classCorrect}</div><div style='font-size:12px;color:#c8c9c9;'>平均正确率</div>`"
        >
        </correct-circle>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 作业作答情况 学生完成情况tab -->
      <div class="btns van-hairline--surround">
        <van-row>
          <van-col span="12" :class="{'active':activeBtn=='homework'}">
            <span @click="toggleContent('homework')">作业作答情况</span>
            </van-col>
            <van-col span="12" class="student" :class="{'active':activeBtn=='student'}">
              <span @click="toggleContent('student')">学生完成情况</span>
            </van-col>
        </van-row>
      </div>
      <!-- 作业作答情况内容 -->
      <div class="homework-content" v-if="activeBtn=='homework'">
        <div class="total">
          <!-- <span>共{{resourceList.length}}题</span> -->
          <span>只看待批阅</span>
          <span class="right">
            <i class="checkbox icon" :class="{'checked':notcorrect}" @click="check"></i>
          </span>
        </div>
        <!-- 作业资源列表 -->
          <div class="lists">
            <div class="item" v-for='(ques,index) in resourceList' :key="index" v-show="!(notcorrect&&ques.pigai_status==3)">
              <div class="iteminfo" @click="changeCollapse(index)" :class="{'no-border':ques.isShow}">
                <div class="left">{{index+1}}、</div>
                <div class="right">
                  <p>[{{ques.icom_name | questionName(ques)}}]
                    <span class="resource-name" v-html="ques.resource_name"></span>
                    <span v-if="ques.pigai_status!=3" class="no-correct"> 待批阅</span>
                  </p>
                  <p style="position:relative">
                    已完成：{{ques.finished_counter}}/{{homeworkInfo.student_counter}}人 正确率：{{itemCorrect(ques.average_rate)}}
                   <i class="icon arrow" :class="{'down':ques.isShow}"></i>
                  </p>
                </div>
          </div>
          <div class="itemdetail" :class="{hide:!ques.isShow}" v-if="ques.resource_type=='qti_exam'||isCompound(ques.qti_question_type_id,ques.resource_type)">
            <p v-for="(mini,key) in miniResource[index]" :key="key" @click="goTongji(mini,index,key)" :class="{'no-margin':key>0&&(key+1)%5==0}">
                <span v-if="mini.status===1" style="background:#ff8d13;">待批阅</span>
                <span v-if="mini.status===0" style="background:#9c9ea1;">未提交</span>
                <span v-else-if="mini.status==3&&mini.marked==1" style="background:#3ea2ff;">阅</span>
                <span v-else :class="{right: mini.correct_rate>= 0.6,wrong:mini.correct_rate<0.6}">{{itemCorrect(mini.correct_rate)}}</span>
              <span class="ques-num">{{(index+1)+'-'+(key+1)}}</span>
            </p>
          </div>
          </div>
        </div>
      </div>
      <!-- 学生完成情况 -->
      <div class="student-content" v-if="activeBtn=='student'">
        <!-- 完成人数大于0 显示列表 -->
          <div class="status">
            <van-row class="item">
              <van-col span="9">
                <i class="icon unfinish"></i>未完成
              </van-col>
              <van-col span="9">{{homeworkInfo.unfinished_counter}}人</van-col>
              <van-col span="6" class="btn" v-if="isUrge">
                <p @click="toggleUrge" :class="{disable:finishCounter===0}">催交作业</p>
              </van-col>
              <van-col span="6" class="btn" v-if="!isUrge">
                <p class="disable">今日已提醒</p>
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="9">
                <i class="icon revising"></i>未订正
              </van-col>
              <van-col span="9">{{homeworkInfo.unretyr_counter}}人</van-col>
              <van-col span="6" class="btn" v-if="isRemind">
                <p @click="toggleRemind" :class="{disable:finishCounter===0}">提醒订正</p>
              </van-col>
              <van-col span="6" class="btn" v-if="!isRemind">
                <p class="disable">今日已提醒</p>
              </van-col>
            </van-row>
          </div>
          <div class="title">学生成绩</div>
        <template v-if="finishCounter>0">
          <!-- 学生列表 -->
          <student-list :studentList="studentList"></student-list>
        </template>
        <!-- 没人完成 -->
        <template v-else>
          <div class="noanswer-tip">还没有学生提交作业哟～</div>
        </template>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-btn">
        <div class="btn" :class="{disable:homeworkStatus!=1}">
          <p @click="toggleCorrectPopup">一键批阅</p>
        </div>
        <div class="btn">
          <p @click="goBatchEvaluate">批量评价</p>
        </div>
        <div class="btn" :class="{disable:homeworkInfo.is_send_answer<1}">
          <p v-if="homeworkInfo.is_send_answer<1">公布答案</p>
          <p v-else @click="toggleAnswerTip">公布答案</p>
        </div>
    </div>
    <!-- 班级平均正确率计算规则tip -->
    <tips v-if="showTips" @toggle="toggleTips"></tips>
    <!-- 催交作业 -->
    <urge v-if="urge" @toggle="toggleUrge"></urge>
    <!-- 订正提醒 -->
    <remind v-if="remind" @toggle="toggleRemind"></remind>
    <!-- 一键批阅 -->
    <correct v-if="correctTip" @toggle="toggleCorrectPopup" @callback="getResource" :publishId="$route.params.publishId" :send="0"></correct>
    <!-- 发布答案 -->
    <answer v-if="answerTip" @toggle="toggleAnswerTip" :publishId="$route.params.publishId" :classId="$route.params.classId"></answer>
  </div>
</template>

<script>
import homeworkDetil from "../axios/detail.js";
import Vue from "vue";
import tips from "./common/tips.vue"; // 正确率提示
import urge from "./common/urge.vue"; // 催交作业
import remind from "./common/remind.vue"; // 提醒订正
import correct from "@/components/common/correctPopup.vue"; // 一键批阅
import answer from "./common/answer.vue"; // 发送答案
import studentList from "./common/studentList.vue"; // 学生列表
import correctCircle from '@/components/common/correct.vue'

import {mapActions} from 'vuex'
export default {
  name: "detail",
  props: ['homeworkInfo', 'resourceList', 'homeworkStatus'],
  data() {
    return {
      studentList: [], // 班级学生完成情况，
      correct: -1, // 班级正确率
      activeBtn: "homework", // content内容显示
      showTips: false, // 提示遮罩层
      urge: false, // 催交作业遮罩层
      remind: false, // 订正题型遮罩层
      notcorrect: false, // 是否只看待批阅
      isUrge: false, // 是否已催交作业
      isRemind: false, // 是否已题型订正
      answerTip: false, // 发布答案弹框
      correctTip: false, // 一键批阅弹框
      // homeworkStatus: "", // 当前作业完成状态 1未批改 3已批改
      miniResource: {} // 小资源
    };
  },
  created() {
    this.getinfo();
  },
  computed: {
    // 班级正确率
    classCorrect() {
      if (this.correct === "" || this.correct === -1) {
        return "--";
      } else {
        return Math.round(this.correct * 100) + "%";
      }
    },
    // 作业完成人数
    finishCounter() {
      return (
        // 学生总人数-未完成人数
        this.homeworkInfo.student_counter - this.homeworkInfo.unfinished_counter
      );
      // return 0
    }
  },
  methods: {
    ...mapActions({
    }),
    getResource() {
      this.$emit('getresource');
      this.getinfo();
      // 一键批阅后清空小资源列表
      this.miniResource = {};
    },
    getinfo() {
      // 获取作业信息
      // this.studentList = this.homeworkInfo.student_list;
      // 班级正确率
      this.correct = this.homeworkInfo.class_average_correct_rate;
      this.studentList = this.homeworkInfo.student_list
      // 是否催交过作业  0 未催交 1 当日已催交
      this.isUrge = this.homeworkInfo.notice_zuoye === 0
      // 是否提醒订正  0 未提醒 1 当日已提醒
      this.isRemind = this.homeworkInfo.notice_retry === 0
    },
    check() {
      this.notcorrect = !this.notcorrect;
    },
    goBatchEvaluate() {
      // 批量评价
      console.log("a");
      this.$router.push({
        path: "/batchEvaluate"
      });
    },
    // 作业作答情况、学生详情切换tab
    toggleContent(items) {
      this.activeBtn = items;
    },
    // 正确率计算规则提示
    toggleTips() {
      this.showTips = !this.showTips;
    },
    // 催交作业弹出框
    toggleUrge() {
      if (this.finishCounter === 0 || !this.isUrge) {
        return false
      }
      let params = {
        teacher_id: JSON.parse(window.localStorage.userinfo).userid,
        course_hour_publish_id: this.homeworkInfo.course_hour_publish_id
      }
      homeworkDetil.urge(params).then((r) => {
        if (r.rs === true) {
          this.urge = !this.urge;
          this.isUrge = true;
          setTimeout(() => {
            this.urge = false;
          }, 3000);
        }
      })
    },
    // 提醒订正弹出框
    toggleRemind() {
      if (this.finishCounter === 0 || !this.isRemind) {
        return false
      }
      let params = {
        teacher_id: JSON.parse(window.localStorage.userinfo).userid,
        course_hour_publish_id: this.homeworkInfo.course_hour_publish_id
      }
      homeworkDetil.remind(params).then((r) => {
        if (r.rs === true) {
          this.remind = !this.remind;
          this.isRemind = true;
          setTimeout(() => {
            this.remind = false;
          }, 3000);
        }
      })
    },
    // 一键批阅弹框
    toggleCorrectPopup() {
      // if (this.homeworkStatus !== 1) {
      //   return false;
      // }
      this.correctTip = !this.correctTip;
    },
    // 发布答案弹窗
    toggleAnswerTip(send) {
      // is_send_answer==0 已发布过答案
      // is_send_answer==1 未发布过答案
      if (send === 1) {
        this.homeworkInfo.is_send_answer = 0
      }
      this.answerTip = !this.answerTip;
    },
    // 查看小题
    changeCollapse(index, ismini) {
      let curr = {};
      let detailbox = "";
      // 套题或试卷  获取当前点击资源
      curr = this.resourceList[index];
      // 小资源列表显示或隐藏
      Vue.set(curr, "isShow", !curr.isShow);
      // 加载小资源参数
      let param = {
        publish_id: curr.course_hour_publish_id,
        course_resource_id: curr.course_resource_id,
        dcom_entity_id: curr.dcom_entity_id
      };
      if (
        // 判断是否为试卷或复合题
        curr.resource_type === "qti_exam" ||
        this.isCompound(curr.qti_question_type_id, curr.resource_type)
      ) {
        if (curr.isShow) {
          // 小资源加载过则不再走接口
          if (this.miniResource[index]) {
            return false;
          }
          // 未加载则走接口加载资源
          homeworkDetil.getMiniResource(param).then(r => {
            Vue.set(this.miniResource, index, r);
          });
        }
      } else {
        this.goTongji(curr);
      }
    },
    // 查看单题统计
    goTongji(curr, index, key) {
      if (curr.status === 0) {
        return false;
      }
      // 当前资源参数
      this.$store.commit("homeworkDetail/setParams", curr);
      if (this.miniResource[index]) {
        // 当前试卷小资源
        this.$store.commit("homeworkDetail/setmini", this.miniResource[index]);
      }
      // 当前资源在小资源中的index
      this.$store.commit("homeworkDetail/changIndex", key);
      // 单选题、判断题统计页面
      this.$router.push({
        name: "questionDetail"
      });
    },
    // 资源正确率计算方法
    itemCorrect(correct) {
      if (correct === "" || correct === -1) {
        return "--";
      } else {
        return Math.round(correct * 100) + "%";
      }
    },
    // 是否为复合题
    isCompound(typeId, resourceType) {
      if (resourceType === "qti_question") {
        if (
          typeId === 12 ||
          typeId === 16 ||
          typeId === 17 ||
          typeId === 35 ||
          typeId === 37
        ) {
          return true;
        }
        return false;
      }
      return false;
    },
    // 顶部tab切换
    tabChange(type) {
      console.log(type);
    }
  },
  components: {
    tips,
    urge,
    remind,
    correct,
    studentList,
    answer,
    correctCircle
  }
};
</script>

<style scoped>
.detail {
  height: 100vh;
  font-size: 16px;
}

/* title样式 */

.detail>.wrapper {
  height: calc(100vh - 110px);
  overflow: scroll;
}

/* 作业信息 */

.detail>.wrapper>.info {
  padding: 10px;
  line-height: 30px;
  background: #fff;
  height: 75px;
  box-sizing: border-box;
}

.detail>.wrapper .itemdetail {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #e8ebee;
  background: #f5f7f8;
  padding:5px 13px 5px;
  box-sizing: border-box
}

.detail>.wrapper .itemdetail p span:first-child {
  text-align: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color:#fff;
  font-size: 12px;
}
.detail>.wrapper .itemdetail p span.right{
  background: #08b783;
}
.detail>.wrapper .itemdetail p span.wrong{
  background: #ff5266;
}
.detail>.wrapper .itemdetail p span.ques-num{
  color:#c8c9c9;
}
.detail>.wrapper .itemdetail p {
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 8px 35px 8px 0px;
  font-size: 14px;
  flex: 1 auto auto;
}
.detail>.wrapper .itemdetail p.no-margin{
  padding-right: 0px;
}

.detail>.wrapper .itemdetail.hide {
  display: none;
}

.detail>.wrapper>.info>.name {
  font-weight: bold;
}
.detail>.wrapper>.info>.name>span{
  color:#c8c9c9;
  font-size: 14px;
}
.detail>.wrapper>.info>.name>span>b{
  color:#9c9ea1;
}
.detail>.wrapper>.info>.times {
  font-size: 14px;
}

/* 班级正确率 */

.detail>.wrapper>.correct {
  height: 175px;
  padding: 10px;
  text-align: center;
  background: #f5f7f8;
  box-sizing: border-box;
  position: relative;
}
.detail>.wrapper>.correct i {
  position: absolute;
  right: 45px;
  top:17px;
  color:#55a9f1;
  z-index: 2;
  display: inline-block;
  width:19px;
  height: 19px;
  background-image: url('../../../assets/images/public/help.png');
}
.detail>.wrapper>.correct i:active{
  background-image: url('../../../assets/images/public/help-h.png');
}
.detail>.wrapper>.correct>.num {
  font-size: 24px;
  font-weight: bold;
}

.detail>.wrapper>.content {
  background: #fff;
  /* height: calc(100% - 160px - 20px); */
  box-sizing: border-box;
}

/* 作答情况完成情况tab */

.detail>.wrapper>.content>.btns span {
  display: inline-block;
  height: 42px;
  border-bottom: 2px solid transparent;
}

.detail>.wrapper>.content>.btns {
  line-height: 44px;
  height: 44px;
  box-sizing: border-box;
  text-align: center;
}

.detail>.wrapper>.content>.btns .active span{
  color: #08b783;
  border-bottom:2px solid #08b783;
}

/* 作业作答情况content */

.detail>.wrapper>.content>.homework-content,
.detail>.wrapper>.content>.student-content {
  height: calc(100% - 50px - 68px - 20px);
}

.detail>.wrapper>.content>.homework-content>.total {
  padding: 0 10px;
  line-height: 45px;
  height: 45px;
  box-sizing: border-box;
  border-bottom: 1px solid #e8ebee;
}

.detail>.wrapper>.content>.homework-content>.total>.right {
  float: right;
}
.detail>.wrapper>.content>.homework-content>.total>.right .checkbox{
  display: inline-block;
  width:19px;
  height: 19px;
  background-image: url('../../../assets/images/public/checkunsel.png');
}
.detail>.wrapper>.content>.homework-content>.total>.right .checkbox.checked{
  background-image: url('../../../assets/images/public/checksel.png');
}
.detail>.wrapper>.content>.homework-content .lists {
  height: calc(100% - 45px);
  overflow-y: scroll;
  box-sizing: border-box;
  width:100%;
}

.detail>.wrapper>.content>.homework-content .lists .item .iteminfo {
  height: 75px;
  border-bottom: 1px solid #e8ebee;
  display: flex;
  margin:0 13px;
  box-sizing: border-box;
  padding-top:8px;
}

.detail>.wrapper>.content>.homework-content .lists .item .iteminfo.no-border{
  border-bottom: 1px solid transparent;
}
.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right {
  width: calc(100% - 35px);
  line-height: 30px;
  font-size: 14px;
  position: relative;
}
.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right .arrow{
  position: absolute;
  right: 0;
  top:3px;
  background-image: url('../../../assets/images/public/right.png');
}
.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right .arrow.down{
  background-image: url('../../../assets/images/public/down.png');

}
.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right .no-correct{
  position: absolute;
  right: 0;
  background: #ff8d13;
  color:#fff;
  border-radius: 30px;
  font-size: 12px;
  height: 22px;
  width:60px;
  line-height: 22px;
  box-sizing: border-box;
  text-align: center;

}
.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right p {
  display: flex;
  position: relative;
}

.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right p .showdetail {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
}

.detail>.wrapper>.content>.homework-content .right .resource-name {
  display: inline-block;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 10px;
}

.detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.left {
  /* display: inline-block; */
  width: 35px;
  height: 100%;
  line-height: 60px;
}

/* 学生列表样式 */

.detail>.wrapper>.content>.student-content .unfinish-state {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.detail>.wrapper>.content>.student-content .unfinish-state>div {
  width: 50%;
  display: flex;
  justify-content: center;
}

.detail>.wrapper>.content>.student-content .unfinish-state p {
  width: 80px;
  text-align: center;
  border: 1px solid #e8ebee;;
  padding: 10px 20px;
}

.detail>.wrapper>.content>.student-content .title {
  margin-top: 20px;
  padding-left: 10px;
  font-weight: 500;
}

.detail>.wrapper>.content>.student-content   .noanswer-tip {
  text-align: center;
  margin-top:20px;
}

.detail>.wrapper>.content>.student-content .status>.item {
  padding: 0 13px;
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid #e8ebee;
  box-sizing: border-box;
}
.detail>.wrapper>.content>.student-content .status>.item i{
  position: relative;
  margin-right: 5px;
  top:4px;
  background-image: url('../../../assets/images/homeworkDetail/unfinish.png');
}
.detail>.wrapper>.content>.student-content .status>.item i.revising{
  background-image: url('../../../assets/images/homeworkDetail/revising.png');

}
.detail>.wrapper>.content>.student-content .status>.item .disable {
  opacity: 0.5;
}

.detail>.wrapper>.content>.student-content .status>.item .btn {
  background: #08b783;
  float: right;
  width:75px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  margin-top: 12.5px;
  text-align: center;
  border-radius: 8px;
  font-size: 12px;
}
.detail>.wrapper>.content>.student-content .student-list {
  height: calc(100% - 120px);
}

/* 班级平均正确率计算规则提示样式 */

/* 底部按钮 */

.detail .bottom-btn {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 65px;
  background: #fff;
  padding:7.5px 13px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-top:1px solid #e8ebee;
}

.detail .bottom-btn .btn {
  flex:1 1 auto;
  background: #06bb9c;
  border-radius: 13px;
  color: #fff;
  height: 50px;
  line-height: 50px;
  margin-right: 15px;
  text-align: center;
  font-size: 17px;
  width:100px;
}
.detail .bottom-btn .btn:first-child{
  background: #08b783;
}
.detail .bottom-btn .btn:nth-child(2){
  background: #3ea2ff;
}
.detail .bottom-btn .btn:last-child{
  background: #2ecbd0;
  margin-right: 0;
}
.detail .bottom-btn .btn.disable {
  opacity: 0.5;
}
.detail  .icon{
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  width:19px;
  height: 19px;
}
</style>
