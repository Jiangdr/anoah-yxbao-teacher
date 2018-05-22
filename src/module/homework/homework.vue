<template>
  <div class="cube-page cube-view button-view">

    <header class="header">
      <h1>作业</h1>
      <i class="cubeic-back" @click="goHome">
        <i class="fa fa-angle-left back-up-arrow"></i><span class="back-up-text">返回</span>
      </i>
    </header>

    <div class="select-container">
      <span class="select-span">
        <div class="select-span-div" @click="clickTime">时间<i class="fa fa-angle-down"></i></div>
      </span>
      <span class="select-span">
        <div class="select-span-div" @click="clickStatus">状态<i class="fa fa-angle-down"></i></div>
      </span>
      <span class="select-span">
        <div class="select-span-div" @click="clickClass">班级<i class="fa fa-angle-down"></i></div>
      </span>
    </div>

    <div style="height: 40px;line-height: 40px;background-color: #fff;border-bottom: 1px solid #ededf0;">
      共{{totalCountNum}}个作业&nbsp;&nbsp;<span style="color: red;">{{countNum}}</span>个待批改
    </div>

    <div class="listContainer" v-bind:style="listContainerStyle">
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
    </div>

    <van-popup v-model="showClassPopup" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columnsOfClass" @cancel="onCancelClassPopup" @confirm="onConfirmClassPopup"/>
    </van-popup>

    <van-popup v-model="showStatusPopup" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columnsOfStatus" @cancel="onCancelStatusPopup" @confirm="onConfirmStatusPopup"/>
    </van-popup>

    <van-popup v-model="showTimePopup" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columnsOfTime" @cancel="onCancelTimePopup" @confirm="onConfirmTimePopup"/>
    </van-popup>

    <div class="publishHomeworkBtnDiv" @click="goChooseTextbook">
      <div class="publishHomeworkBtn">
        <div>布置<br/>作业</div>
      </div>
    </div>
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
      showClassPopup: false,
      showStatusPopup: false,
      showTimePopup: false,
      columnsOfClass: [],
      columnsOfStatus: [
        {
          text: "全部",
          value: "all"
        },
        {
          text: "待批改",
          value: "correct"
        },
        {
          text: "已批改",
          value: "finish"
        }
      ],
      countNum: 0,
      totalCountNum: 0
    };
  },
  created: function() {
    var nowdate = new Date();
    var yNow = nowdate.getFullYear();
    var mNow = nowdate.getMonth() + 1;
    var dNow = nowdate.getDate();
    var formatnowdate = yNow + "-" + mNow + "-" + dNow;

    // 获取系统前一周的时间
    var oneweekdate = new Date(nowdate - 7 * 24 * 3600 * 1000);
    var yWeek = oneweekdate.getFullYear();
    var mWeek = oneweekdate.getMonth() + 1;
    var dWeek = oneweekdate.getDate();
    var formatWeekdate = yWeek + "-" + mWeek + "-" + dWeek;

    // 获取系统前一个月的时间
    nowdate.setMonth(nowdate.getMonth() - 1);
    var yOneMonth = nowdate.getFullYear();
    var mOneMonth = nowdate.getMonth() + 1;
    var dOneMonth = nowdate.getDate();
    var formatOneMonthdate = yOneMonth + "-" + mOneMonth + "-" + dOneMonth;

    // 获取系统前三个月的时间
    nowdate.setMonth(nowdate.getMonth() - 2);
    var yThreeMonth = nowdate.getFullYear();
    var mThreeMonth = nowdate.getMonth() + 1;
    var dThreeMonth = nowdate.getDate();
    var formatThreeMonthdate =
      yThreeMonth + "-" + mThreeMonth + "-" + dThreeMonth;
    this.columnsOfTime = [
      {
        text: "全部",
        from: "",
        to: ""
      },
      {
        text: "最近一周",
        from: formatWeekdate,
        to: formatnowdate
      },
      {
        text: "最近一个月",
        from: formatOneMonthdate,
        to: formatnowdate
      },
      {
        text: "最近三个月",
        from: formatThreeMonthdate,
        to: formatnowdate
      }
    ];
  },
  mounted: function() {
    this.userInfo = this.$store.state.account.userInfo;
    var array = [
      {
        text: "全部",
        class_id: ""
      }
    ];
    for (
      let i = 0;
      i < this.$store.state.account.userInfo.classes.length;
      i++
    ) {
      array.push({
        text: this.$store.state.account.userInfo.classes[i].class_name,
        class_id: this.$store.state.account.userInfo.classes[i].class_id
      });
    }
    this.columnsOfClass = array;
    this.chooseClass = this.columnsOfClass[0];
    this.chooseStatus = this.columnsOfStatus[0];
    this.chooseTime = this.columnsOfTime[0];
    this.getHomeworkList();
  },
  methods: {
    clickClass() {
      this.showClassPopup = !this.showClassPopup;
    },
    clickStatus() {
      this.showStatusPopup = !this.showStatusPopup;
    },
    clickTime() {
      this.showTimePopup = !this.showTimePopup;
    },
    onConfirmClassPopup(value, index) {
      this.showClassPopup = false;
      this.chooseClass = value;
      this.getHomeworkList();
    },
    onCancelClassPopup() {
      this.showClassPopup = false;
    },
    onConfirmStatusPopup(value, index) {
      this.showStatusPopup = false;
      this.chooseStatus = value;
      this.getHomeworkList();
    },
    onCancelStatusPopup() {
      this.showStatusPopup = false;
    },
    onConfirmTimePopup(value, index) {
      this.showTimePopup = false;
      this.chooseTime = value;
      this.getHomeworkList();
    },
    onCancelTimePopup() {
      this.showTimePopup = false;
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.pullRefresIsLoading = false;
      }, 500);
      this.getHomeworkList();
    },
    goHomeworkDetail(item) {
      this.$router.push({
        path: "/homeworkDetail/:publishId/:classId",
        name: "homeworkDetail",
        params: {
          publishId: item.course_hour_publish_id,
          classId: item.class_id
        }
      });
    },
    loadMore() {
      console.log("loadMore......");
      if (this.totalPage < this.currentPage) {
        this.finished = true;
        this.loading = false;
      } else {
        // this.loading = false;
        this.currentPage += 1;
        this.getHomeworkList();
      }
    },
    goHome() {
      this.$router.push({
        path: "/"
      });
    },
    goChooseTextbook() {
      this.$router.push({
        path: "/chooseTextbook"
      });
    },
    getHomeworkList() {
      var self = this;
      var data = {
        user_id: self.userInfo.userid,
        class_id: self.chooseClass.class_id,
        status: self.chooseStatus.value,
        from: self.chooseTime.from,
        to: self.chooseTime.to,
        page: self.currentPage,
        per_page: 7
      };

      api.homeworkLists(data).then(function(r) {
        self.homeworkListArray = self.homeworkListArray.concat(r.lists);
        self.currentPage = Number(r.page);
        self.totalPage = Number(r.total_count);
        self.loading = false;
        self.countNum = r.count;
        self.totalCountNum = r.total_count;
        //  self.$nextTick(_ => {
        // self.loading = false
        // })
      });
    }
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
  font-size:36px;
  float:right;
  color: #989ca0;
}
</style>
