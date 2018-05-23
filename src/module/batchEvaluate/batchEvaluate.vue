<template>
  <div class="cube-page cube-view button-view">

    <header class="header">
      <h1>批量评价</h1>
      <i class="cubeic-back" @click="goHomework">
        <i class="fa fa-angle-left back-up-arrow"></i><span class="back-up-text">返回</span>
      </i>
    </header>

    <div style="height: 40px;line-height: 40px;background-color: #fff;border-bottom: 1px solid #ededf0;">
        <div style="display: inline-block;">正确率：</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:rateType === ''}" @click="clickRateTab('')">全部</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:rateType === 1}" @click="clickRateTab(1)">100%</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:rateType === 0.9}" @click="clickRateTab(0.9)">90-99%</div>
    </div>

    <div style="height: 40px;line-height: 40px;background-color: #fff;border-bottom: 1px solid #ededf0;">
        <div style="display: inline-block;">评价：</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:statusType === ''}" @click="clickEvaluateTab('')">全部</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:statusType === 1}" @click="clickEvaluateTab(1)">待评价</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:statusType === 3}" @click="clickEvaluateTab(3)">已评价</div>
        <div class="correct-rate-btn" v-bind:class="{activeTab:statusType === 33}" @click="clickEvaluateTab(33)">待批改</div>
    </div>

    <div>
      <!-- <span style="padding: 10px;display:inline-block;" @click="clickStudent(item)" v-for="(item, index) in allStudentsArrayFormat" :key="index">{{item.real_name}}</span> -->
      <van-checkbox-group v-model="checkBoxGroup">
        <van-checkbox style="padding: 10px;display:inline-block;" v-for="(item, index) in allStudentsArrayFormat" :key="index" :name="item" >
          {{ item.real_name }}
        </van-checkbox>
      </van-checkbox-group>
    </div>

    <div class="yxban-tabbar--fixed van-tabbar">
      <div class="van-tabbar-item">
        <div class="van-tabbar-item__text">
          <span>退回作业</span>
        </div>
      </div>
      <div class="van-tabbar-item">
        <div class="van-tabbar-item__text">
          <span><i class="fa fa-heart-o"></i>表扬</span>
        </div>
      </div>
      <div class="van-tabbar-item" @click="writeComments">
        <div class="van-tabbar-item__icon">
        </div>
        <div class="van-tabbar-item__text">
          <span>
            <i class="fa fa-pencil-square-o"></i>写评语</span>
        </div>
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
      console.log(this.checkBoxGroup);
    },
    clickStudent() {},
    getStudentsList() {
      var self = this;
      var data = {
        publish_id: "229002511525863300001f"
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
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border: 1px solid #2ec3b8;
  border-radius: 5px;
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
.activeTab {
  background-color: #2ec2a9;
  color: #fff;
}
</style>
