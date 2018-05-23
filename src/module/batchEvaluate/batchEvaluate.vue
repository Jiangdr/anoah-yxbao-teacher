<template>
  <div class="cube-page cube-view button-view">

    <header class="header">
      <h1>批量评价</h1>
      <i class="cubeic-back" @click="goHomework">
        <i class="fa fa-angle-left back-up-arrow"></i>
      </i>
    </header>

    <div style="background-color: #fff;overflow-x: auto;">
      <div style="background-color: #fff; width: 570px;">
        <div class="correct-rate-btn-all" v-bind:class="{activeTab:rateType === ''}" @click="clickRateTab('')">全部正确率</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:rateType === 1}" @click="clickRateTab(1)">100%</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:rateType === 0.9}" @click="clickRateTab(0.9)">90-99%</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:rateType === 0.8}" @click="clickRateTab(0.8)">80-89%</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:rateType === 0.7}" @click="clickRateTab(0.7)">70-79%</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:rateType === 0.6}" @click="clickRateTab(0.6)">60-69%</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:rateType === 0.5}" @click="clickRateTab(0.5)">0-59%</div>
      </div>
    </div>

    <div style="background-color: #fff;border-bottom: 1px solid #ededf0;">
      <div class="correct-rate-btn-all" v-bind:class="{activeTab:statusType === ''}" @click="clickEvaluateTab('')">全部状态</div>
      <div class="correct-rate-btn" v-bind:class="{activeTab:statusType === 1}" @click="clickEvaluateTab(1)">待评价</div>
      <div class="correct-rate-btn" v-bind:class="{activeTab:statusType === 3}" @click="clickEvaluateTab(3)">已评价</div>
      <div class="correct-rate-btn" v-bind:class="{activeTab:statusType === 33}" @click="clickEvaluateTab(33)">待批改</div>
    </div>

    <div v-bind:style="listContainerStyle">
      <!-- <span style="padding: 10px;display:inline-block;" @click="clickStudent(item)" v-for="(item, index) in allStudentsArrayFormat" :key="index">{{item.real_name}}</span> -->
      <van-checkbox-group v-model="checkBoxGroup">
        <van-checkbox style="padding: 10px;display:inline-block;" v-for="(item, index) in allStudentsArrayFormat" :key="index" :name="item" >
          {{ item.real_name }}
        </van-checkbox>
      </van-checkbox-group>
    </div>

    <div class="bottom-btn">
      <div class="btn">
        <p>退回作业</p>
      </div>
      <div class="btn">
        <p><i class="fa fa-heart-o"></i>表扬</p>
      </div>
      <div class="btn">
        <p @click="writeComments"><i class="fa fa-pencil-square-o"></i>写评语</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/module/batchEvaluate/axios/batchEvaluate.js";

export default {
  name: "Homework",
  data() {
    return {
      homeworkListArray: [],
      listContainerStyle: {
        'height': window.innerHeight - 200 + "px",
        'overflow-y': 'auto'
      },
      list: [],
      loading: false,
      finished: false,
      pullRefresIsLoading: false,
      currentPage: 1,
      totalPage: 1,
      countNum: 0,
      totalCountNum: 0,
      active: 0,
      studentList: [],
      willCorrectStudentsArray: [],
      didCorrectStudents: [],
      didJudgementStudents: [],
      allStudentsArray: [],
      allStudentsArrayFormat: [],
      statusType: "",
      rateType: "",
      checkBoxGroup: []
    };
  },
  mounted: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.homeworkOneListInfoObj = this.$store.state.homework.homeworkOneListInfoObj;
    this.getStudentsList();
  },
  methods: {
    goHomework() {
      this.$router.push({
        path: "/homework"
      });
    },
    writeComments() {
      if (this.checkBoxGroup.length === 0) {
        this.$toast({
          message: "请选择学生！",
          duration: 500
        });
        return;
      }
      this.$store.dispatch("chooseBatchEvaluateStudentsArray", this.checkBoxGroup);
      this.$router.push({
        path: "/comments"
      });
    },
    clickStudent() {},
    getStudentsList() {
      var self = this;
      var data = {
        publish_id: self.homeworkOneListInfoObj.course_hour_publish_id
      };

      api.getHomeworkDetailBasic(data).then(function(response) {
        var array = response.student_list;
        array.forEach(item => {
          item.status = 1;
          // if (item.status === 1) {
          //   self.willCorrectStudentsArray.push(item);
          // } else if (item.status === 3) {
          //   if (item.comment === null) {
          //     self.didCorrectStudents.push(item);
          //   } else {
          //     self.didJudgementStudents.push(item);
          //   }
          // }
        });
        self.allStudentsArray = array;
        self.allStudentsArrayFormat = array;
      });
    },
    clickEvaluateTab(type) {
      this.statusType = type;
      this.formartAllstudentsArrayFun(this.rateType);
    },
    clickRateTab(type) {
      this.rateType = type;
      this.formartAllstudentsArrayFun(type);
    },
    formartAllstudentsArrayFun(rateType) {
      this.allStudentsArrayFormat = [];
      var array = this.allStudentsArray;
      // debugger
      if (this.statusType === 1) {
        array.forEach(item => {
          if (item.status === 1 && item.rate === rateType) {
            this.allStudentsArrayFormat.push(item);
          }
        });
      } else if (this.statusType === 3) {
        array.forEach(item => {
          if (item.status === 3 && item.rate === rateType) {
            if (item.comment === null) {
              this.allStudentsArrayFormat.push(item);
            } else {
              this.allStudentsArrayFormat.push(item);
            }
          }
        });
      } else if (!this.statusType) {
        array.forEach(item => {
          if (item.rate === rateType) {
            this.allStudentsArrayFormat.push(item);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.correct-rate-btn {
  display: inline-block;
  width: 64px;
  height: 32px;
  line-height: 2rem;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 0.5rem 0.25rem;
  box-sizing: border-box;
  vertical-align: top;
  background-color: #fff;
}
.correct-rate-btn-all {
  display: inline-block;
  width: 96px;
  height: 32px;
  line-height: 2rem;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 0.5rem 0.25rem;
  box-sizing: border-box;
  vertical-align: top;
  background-color: #fff;
}
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
.activeTab {
  background-color: #2ec2a9;
  color: #fff;
}
.bottom-btn {
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
.btn {
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
.btn:first-child{
  background: #08b783;
}
.btn:nth-child(2){
  background: #3ea2ff;
}
.btn:last-child{
  background: #2ecbd0;
  margin-right: 0;
}
</style>
