<template>
  <div class="detail">
    <div class="title border-bottom-1px">
      <van-row>
        <van-col span="3">
          <span class="back" @click="goBack">
              <van-icon name="arrow-left"></van-icon>
              </span>
        </van-col>
        <van-col span="18">
          <van-row>
            <van-col span="16" offset="4" class="van-hairline--surround tabs">
              <span class="text van-hairline--right">作业详情</span>
              <span class="text">作业报告</span>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="3">...</van-col>
      </van-row>
    </div>
    <div class="wrapper">
      <!-- 作业名称 开始时间 结束时间 -->
      <div class="info">
        <p class="name">{{homeworkInfo.title}}</p>
        <p class="times">
          <span class="start-time">{{homeworkInfo.start_time }}</span>
          <span class="end-time">{{homeworkInfo.deadline}}</span>
          <span class="end" v-if="new Date(homeworkInfo.deadline) < new Date()">已截止</span>
        </p>
      </div>
      <!-- 平均正确率 -->
      <div class="correct">
        <van-icon name="info-o" @click="toggleTips" />
        <p class="num">{{classCorrect}}
        </p>
        <p class="text">平均正确率</p>
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 作业作答情况 学生完成情况tab -->
        <div class="btns van-hairline--surround">
          <van-row>
            <van-col span="12" class="van-hairline--right" :class="{'active':activeBtn=='homework'}">
              <span @click="toggleContent('homework')">作业作答情况</span>
            </van-col>
            <van-col span="12" class="student" :class="{'active':activeBtn=='student'}">
              <span @click="toggleContent('student')">学生完成情况</span>
            </van-col>
          </van-row>
        </div>
        <!-- 作业作答情况内容 -->
        <div class="homework-content" v-if="activeBtn=='homework'">
          <div class="total van-hairline--bottom">
            <span>共{{resourceList.length}}题</span>
            <span class="right"><input type="checkbox" v-model="notcorrect"> 只看待批阅</span>
          </div>
          <!-- 作业资源列表 -->
          <div class="lists">
            <div class="item" v-for='(ques,index) in resourceList' :key="index" v-show="!(notcorrect&&ques.pigai_status==3)">
              <div class="iteminfo" @click="changeCollapse(index)">
                <div class="left">{{index+1}}、</div>
                <div class="right">
                  <p>[{{ques.icom_name}}]
                    <span class="resource-name" v-html="ques.resource_name"></span><span v-if="ques.pigai_status!=3"> 待批阅</span></p>
                  <p>
                    已完成：{{ques.finished_counter}}/{{homeworkInfo.student_counter}}人 正确率：{{itemCorrect(ques.average_rate)}}
                    <van-icon name="arrow" class="showdetail"></van-icon>
                  </p>
                </div>
              </div>
              <div class="itemdetail hide" v-if="ques.resource_type=='qti_exam'||isCompound(ques.qti_question_type_id,ques.resource_type)">
                <p v-for="(mini,key) in miniResource[index]" :key="key" @click="goTongji(mini)">
                  <span>
                        <template v-if="mini.status<3">
                          待批阅
</template>

<template v-else-if="mini.status==3&&mini.marked==1">
   阅
</template>

<template v-else>
   {{itemCorrect(mini.correct_rate)}}
</template>
                   </span>
            <span>{{(index+1)+'-'+(key+1)}}</span>
            </p>
    </div>
  </div>

</div>
</div>
<div
  class="student-content"
  v-if="activeBtn=='student'"
>
<template v-if="finishCounter>
   0">
  <div class="status">
    <van-row class="item">
      <van-col span="8">未完成</van-col>
      <van-col span="10">{{homeworkInfo.unfinished_counter}}人</van-col>
      <van-col span="6" class="btn" v-if="!isUrge">
        <p @click="toggleUrge" :class="{disable:finishCounter==0}">催交作业</p>
      </van-col>
      <van-col span="6" class="btn" v-if="isUrge">
        <p class="disable">今日已提醒</p>
      </van-col>
    </van-row>
    <van-row class="item">
      <van-col span="8">未订正</van-col>
      <van-col span="10">{{homeworkInfo.unretyr_counter}}人</van-col>
      <van-col span="6" class="btn" v-if="!isRemind">
        <p @click="toggleRemind">提醒订正</p>
      </van-col>
      <van-col span="6" class="btn" v-if="isRemind">
        <p class="disable">今日已提醒</p>
      </van-col>
    </van-row>
  </div>
  <div class="blank"></div>
  <div class="table">
    <div class="table-name">学生成绩</div>
    <div class="table-header">
      <van-row>
        <van-col span="5">姓名</van-col>
        <van-col span="5">完成进度</van-col>
        <van-col span="5">正确率</van-col>
        <van-col span="5">错题订正</van-col>
      </van-row>
    </div>
    <div class="table-body">
      <van-row v-for="(stu, index) in studentList" :key='index' class="stu">
        <van-col span="5">{{stu.real_name}}</van-col>
        <van-col span="5">{{stu.completed_num}}</van-col>
        <van-col span="5">{{itemCorrect(stu.rate)}}</van-col>
        <van-col span="5">{{stu.correct_num}}</van-col>
        <van-col span="4">
          <van-icon name="arrow"></van-icon>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<template v-else>
  <div class="unfinish-state">
    <div>
      <p>
        <span>{{homeworkInfo.unfinished_counter}}人</span><br>
        <span>未完成</span>
      </p>
    </div>
    <div>
      <p>
        <span>{{homeworkInfo.unretyr_counter}}人</span><br>
        <span>未订正</span>
      </p>
    </div>
  </div>
  <div class="title">学生成绩</div>
  <div class="noanswer-tip">还没有学生提交作业哟～</div>
</template>
  </div>
  </div>
  </div>
  <!-- 底部按钮 -->
  <div class="bottom-btn van-hairline--top">
    <van-row>
      <van-col
        span="6"
        offset="1"
        class="btn"
        :class="{disable:homeworkStatus==3}"
      >一键批阅</van-col>
        <van-col
          span="6"
          offset="2"
          class="btn"
        >批量评价</van-col>
          <van-col
            span="6"
            offset="2"
            class="btn"
          >公布答案</van-col>
    </van-row>
  </div>
  <!-- 班级平均正确率计算规则tip -->
  <van-popup
    v-model="showTips"
    class="tip-popup van-hairline--surround"
  >
    <div class="tip-container">
      <h2 class="title van-hairline--bottom">班级正确率</h2>
      <div class="tip-content">
        <p>
          班级正确率统计的是当前已经部分的学生平均正确率，未完成部分和已完成学生中暂未批改的题目暂不统计。
        </p>
        <van-button
          type="primary"
          size="large"
          @click="toggleTips"
        >知道了</van-button>
      </div>
    </div>
    </van-popup>
    <van-popup
      v-model="urge"
      class="urge-popup"
    >
      <div class="urge-container">
        <p>催促发送成功，“未完成学生”将收到提醒</p>
      </div>
      </van-popup>
      <van-popup
        v-model="remind"
        class="urge-popup"
      >
        <div class="urge-container">
          <p>提醒发送成功，“未订正学生”将收到提醒</p>
        </div>
        </van-popup>
        </div>
</template>

<script>
import homeworkDetil from '../axios/detail.js'
import Vue from 'vue'
// import {mapState} from 'vuex'
export default {
  name: 'detail',
  data() {
    return {
      params: {
        // publish_id: '009002511525867000001f',
        // class_id: '1106785'
        publish_id: this.$route.params.publishId,
        class_id: this.$route.params.classId
      },
      homeworkInfo: {}, // 作业信息
      resourceList: [], // 作业列表
      studentList: [], // 班级学生完成情况
      activeBtn: 'homework', // content内容显示
      showTips: false, // 提示遮罩层
      urge: false, // 催交作业遮罩层
      remind: false, // 订正题型遮罩层
      notcorrect: false, // 是否只看待批阅
      isUrge: false, // 是否已催交作业
      isRemind: false, // 是否已题型订正
      homeworkStatus: '',
      miniResource: {}
    }
  },
  created() {
    homeworkDetil.getinfo(this.params).then((r) => {
      this.homeworkInfo = r;
      this.studentList = r.student_list
    })
    homeworkDetil.getResourceList(this.params).then((d) => {
      this.resourceList = d.list;
      this.homeworkStatus = d.status
    })
  },
  computed: {
    // ...mapState({
    //   'user': (state) => state.account.userInfo
    // }),
    classCorrect() {
      if (this.homeworkInfo.class_average_correct_rate === '' || this.homeworkInfo.class_average_correct_rate === -1) {
        return '--'
      } else {
        return this.homeworkInfo.class_average_correct_rate === 0 ? 0 : Math.round(this.homeworkInfo.class_average_correct_rate * 100) + '%'
      }
    },
    finishCounter() {
      return this.homeworkInfo.student_counter - this.homeworkInfo.unfinished_counter
      // return 0
    }

  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    toggleContent(items) {
      this.activeBtn = items
    },
    toggleTips() {
      this.showTips = !this.showTips
    },
    toggleUrge() {
      this.urge = !this.urge
      this.isUrge = true
      setTimeout(() => {
        this.urge = false
      }, 3000)
    },
    toggleRemind() {
      this.remind = !this.remind
      this.isRemind = true
      setTimeout(() => {
        this.remind = false
      }, 3000)
    },
    changeCollapse(index, ismini) {
      let curr = {};
      let detailbox = ''
      if (!ismini) {
        detailbox = $('.homework-content .item').eq(index).find('.itemdetail')
        curr = this.resourceList[index];
        detailbox.toggleClass('hide');
      } else {
        curr = this.miniResource[index];
      }
      let param = {
        'publish_id': curr.course_hour_publish_id,
        'course_resource_id': curr.course_resource_id,
        'dcom_entity_id': curr.dcom_entity_id
      }
      if (curr.resource_type === 'qti_exam' || this.isCompound(curr.qti_question_type_id, curr.resource_type)) {
        if (!detailbox.hasClass('hide')) {
          if (this.miniResource[index]) {
            return false
          }
          homeworkDetil.getMiniResource(param).then((r) => {
            Vue.set(this.miniResource, index, r)
          })
        }
      } else {
        this.goTongji(curr);
      }
    },
    goTongji(curr) {
      if (curr.pigai_status < 3 || curr.status < 3) {
        return false
      }
      let param = {
        "course_hour_publish_id": curr.course_hour_publish_id,
        "course_resource_id": curr.course_resource_id,
        "qti_question_id": curr.source_pk_id,
        "dcom_entity_id": curr.dcom_entity_id ? curr.dcom_entity_id : 0,
        "qti_question_sheet": curr.qti_question_sheet ? curr.qti_question_sheet : 0
      }
      // 单选题、判断题统计页面
      let type = parseInt(curr.qti_question_type_id);
      let name = "";
      if (type === 1 || type === 2 || type === 3) {
        name = "danxuan";
        // 客观填空、选择填空统计页面
      } else if (type === 4 || type === 20) {
        name = "kgtk";
        // 主观填空统计页面
      } else if (type === 5) {
        name = "tiankong";
      } else if (type === 11) {
        name = "wanxingtk";
      } else if (parseInt(curr.icom_id) === 5009) {
        name = "hanzitingxie";
      }
      this.$router.push({
        name: name,
        params: param
      })
    },
    itemCorrect(correct) {
      if (correct === '' || correct === -1) {
        return '--'
      } else {
        return correct === 0 ? 0 : Math.round(correct * 100) + '%'
      }
    },
    isCompound(typeId, resourceType) {
      if (resourceType === 'qti_question') {
        if (typeId === 12 || typeId === 16 || typeId === 17 || typeId === 35 || typeId === 37) {
          return true
        }
        return false
      }
      return false
    }
  }
}
</script>

<style scoped>
  .detail {
    height: 100vh;
  }

  /* title样式 */

  .detail>.title {
    text-align: center;
    line-height: 50px;
    height: 50px;
    box-sizing: border-box;
    padding-top: 5px;
  }

  .detail>.title .back {
    display: inline-block;
    float: left;
  }

  .detail>.title .tabs {
    font-weight: 600;
    height: 36px;
    line-height: 36px;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .detail>.title .text {
    display: inline-block;
    height: 100%;
    width: 48%
  }

  .detail>.wrapper {
    background: #eaeaea;
    height: calc(100vh - 100px);
  }

  /* 作业信息 */

  .detail>.wrapper>.info {
    padding: 10px;
    line-height: 30px;
    background: #fff;
    height: 80px;
    box-sizing: border-box;
  }

  .detail>.wrapper .itemdetail {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #eaeaea;
  }

  .detail>.wrapper .itemdetail p span:first-child {
    border: 1px solid #333;
    text-align: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    line-height: 50px;
  }

  .detail>.wrapper .itemdetail p {
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 10px
  }

  .detail>.wrapper .itemdetail.hide {
    display: none;
  }

  .detail>.wrapper>.info>.name {
    font-weight: bold;
  }

  .detail>.wrapper>.info>.times {
    font-size: 12px;
  }

  .detail>.wrapper>.info>.times>.end-time {
    margin: 0 5px;
  }

  /* 班级正确率 */

  .detail>.wrapper>.correct {
    padding: 10px;
    text-align: center;
    margin: 10px 0;
    background: #fff;
    line-height: 30px;
    height: 80px;
    box-sizing: border-box;
  }

  .detail>.wrapper>.correct i {
    position: absolute;
    left: 62%;
  }

  .detail>.wrapper>.correct>.num {
    font-size: 24px;
    font-weight: bold;
  }

  .detail>.wrapper>.content {
    background: #fff;
    height: calc(100% - 160px - 20px);
    box-sizing: border-box;
  }

  /* 作答情况完成情况tab */

  .detail>.wrapper>.content>.btns span {
    display: inline-block;
    width: 100%;
  }

  .detail>.wrapper>.content>.btns {
    line-height: 40px;
    height: 40px;
    box-sizing: border-box;
    text-align: center;
  }

  .detail>.wrapper>.content>.btns .active {
    background: #06bb9c;
    color: #fff;
  }

  /* 作业作答情况content */

  .detail>.wrapper>.content>.homework-content,
  .detail>.wrapper>.content>.student-content {
    height: calc(100% - 40px);
  }

  .detail>.wrapper>.content>.homework-content>.total {
    padding: 0 10px;
    line-height: 30px;
    height: 30px;
  }

  .detail>.wrapper>.content>.homework-content>.total>.right {
    float: right;
  }

  .detail>.wrapper>.content>.homework-content .lists {
    height: calc(100% - 30px);
    overflow-y: scroll;
  }

  .detail>.wrapper>.content>.homework-content .lists .item .iteminfo {
    height: 60px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    padding: 0 10px;
  }

  .detail>.wrapper>.content>.homework-content .lists .item .iteminfo>.right {
    width: calc(100% - 35px);
    line-height: 30px;
    font-size: 14px;
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
    border: 1px solid #eaeaea;
    padding: 10px 20px;
  }

  .detail>.wrapper>.content>.student-content .unfinish-state+.title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 10px;
    font-weight: 500;
  }

  .detail>.wrapper>.content>.student-content .unfinish-state+.title+div.noanswer-tip {
    text-align: center;
  }

  .detail>.wrapper>.content>.student-content .status>.item {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eaeaea;
    box-sizing: border-box;
  }

  .detail>.wrapper>.content>.student-content .status>.item .disable {
    background: #999;
  }

  .detail>.wrapper>.content>.student-content .status>.item .btn {
    background: #06bb9c;
    color: #fff;
    height: 30px;
    line-height: 30px;
    margin-top: 5px;
    text-align: center;
    border-radius: 5px;
  }

  .detail>.wrapper>.content>.student-content .blank {
    height: 10px;
    background: #eaeaea;
  }

  .detail>.wrapper>.content>.student-content .table {
    text-align: center;
    line-height: 30px;
    height: calc(100% - 90px);
  }

  .detail>.wrapper>.content>.student-content .table-name {
    text-align: left;
    padding-left: 10px;
  }

  .detail>.wrapper>.content>.student-content .table-name,
  .detail>.wrapper>.content>.student-content .table-header,
  .detail>.wrapper>.content>.student-content .table-body .stu {
    height: 30px;
    border-bottom: 1px solid #eaeaea;
  }

  .detail>.wrapper>.content>.student-content .table-body {
    height: calc(100% - 60px);
    overflow-y: scroll;
  }

  /* 班级平均正确率计算规则提示样式 */

  .detail .tip-popup,
  .detail .urge-popup {
    width: calc(100vw - 40px);
    border-radius: 10px;
  }

  .detail .urge-popup {
    padding: 30px 20px;
    box-sizing: border-box;
  }

  .detail .tip-popup[class*=van-hairline]::after {
    border-radius: 20px;
  }

  .detail .tip-container>.title {
    line-height: 60px;
    height: 60px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }

  .detail .tip-container>.tip-content {
    padding: 15px 20px;
  }

  .detail .tip-container>.tip-content>p {
    line-height: 25px;
    margin-bottom: 30px;
  }

  /* 底部按钮 */

  .detail .bottom-btn {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fff;
  }

  .detail .bottom-btn .btn {
    background: #06bb9c;
    border: 1px solid #06bb9c;
    border-radius: 5px;
    color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 5px;
  }

  .detail .bottom-btn .btn.disable {
    background: #999;
    border: 1px solid #999;
  }
</style>
