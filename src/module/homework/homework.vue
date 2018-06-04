<template>
  <div class="cube-page cube-view button-view" @click="activeItem = 0">

    <header class="header">
      <i class="cubeic-back" @click="goHome" v-show="!isSearching">
        <i class="fa fa-angle-left back-up-arrow"></i><span class="back-up-text"></span>
      </i>
      <h1 v-show="!isSearching">作业</h1>
      <div v-show="!isSearching" class="search-btn-div" @click="clickSearchBtn" :class="{'active': activeItem === 9}">
        <img src="@/assets/images/homework/search.png" class="search-icon"/>
      </div>
      <h1 v-show="isSearching" style="text-align: left;">
        <div class="search-input-div">
          <form method="post" @submit.prevent="searchAction" action="javascript:return true;">
              <van-field type="search" v-model="inputValue" v-to-focus="isSearching" v-on:keypress.enter="searchAction" placeholder="请输入..." />
          </form>

        </div>
        <img src="@/assets/images/homework/search.png" class="search-little-icon"/>
        <div class="search-hr"></div>
        <span class="search-btn" @click="searchAction">搜索</span>
        <span class="cancel-btn" @click="cancelAction">取消</span>
      </h1>
    </header>

    <div class="select-container">
      <span class="select-span" :class="{'active': activeItem === 1}">
        <div class="select-span-div" @click.stop="clickTime">时间&thinsp;<i class="fa" :class="{'fa-angle-up':activeItem === 1,'fa-angle-down':activeItem !== 1}"></i></div>
        <ul class="panelbar-list">
          <li class="panelbar-item" :class="{'cur':timeActiveID===0}" @click.stop="chooseItem($event, 'time', 0)">全部时间</li>
          <li class="panelbar-item" :class="{'cur':timeActiveID===1}" @click.stop="chooseItem($event, 'time', 1)">最近一周</li>
          <li class="panelbar-item" :class="{'cur':timeActiveID===2}" @click.stop="chooseItem($event, 'time', 2)">最近一个月</li>
          <li class="panelbar-item" :class="{'cur':timeActiveID===3}" @click.stop="chooseItem($event, 'time', 3)">自定义时间</li>
           <div style="clear:both;"></div>
        </ul>
      </span>
      <span class="select-span" :class="{'active': activeItem === 2}">
        <div class="select-span-div" @click.stop="clickStatus">状态&thinsp;<i class="fa" :class="{'fa-angle-up':activeItem === 2,'fa-angle-down':activeItem !== 2}"></i></div>
        <ul class="panelbar-list">
          <li class="panelbar-item" :class="{'cur':statusActiveID === 'all'}" @click.stop="chooseItem($event, 'status', 0)">全部状态</li>
          <li class="panelbar-item" :class="{'cur':statusActiveID === 'correct'}" @click.stop="chooseItem($event, 'status', 1)">待批阅</li>
          <li class="panelbar-item" :class="{'cur':statusActiveID === 'finish'}" @click.stop="chooseItem($event, 'status', 2)">已批阅</li>
          <div style="clear:both;"></div>
        </ul>
      </span>
      <span class="select-span" :class="{'active': activeItem === 3}">
        <div class="select-span-div" @click.stop="clickClass">班级&thinsp;<i class="fa" :class="{'fa-angle-up':activeItem === 3,'fa-angle-down':activeItem !== 3}"></i></div>
        <ul class="panelbar-list" :style="{height:columnsOfClass.length>13?'153.8vw':11.73333*columnsOfClass.length+'vw'}">
          <li class="panelbar-item" v-for="(classItem, index) in columnsOfClass" :key="index" :class="{'cur':classActiveID===index}" @click.stop="chooseItem($event, 'class', index)">{{classItem.text}}</li>
           <div style="clear:both;"></div>
        </ul>
      </span>
      <span class="select-span" :class="{'active': activeItem === 4}">
        <div class="select-span-div" @click.stop="clickMore">更多&thinsp;<i class="fa"  :class="{'fa-angle-up':activeItem === 4,'fa-angle-down':activeItem !== 4}"></i></div>
        <div class="panelbar-list" :style="{height:teacherBooks.length>7?(12*8)+'vw':(12*(teacherBooks.length+1))+'vw',overflow:'hidden'}">
          <div class="panelbar-item" style="border-bottom: 1px solid #ededf0;">
            <span :class="{'cur':markStatus === 0}" @click.stop="chooseItem($event, 'mark', 0)">全部</span>
            <span :class="{'cur':markStatus === 1}" @click.stop="chooseItem($event, 'mark', 1)">已收藏</span>
            <span :class="{'cur':markStatus === 2}" @click.stop="chooseItem($event, 'mark', 2)">未收藏</span>
          </div>
          <ul class="book-list" :style="{height:teacherBooks.length>7?(12*7)+'vw':(12*teacherBooks.length)+'vw'}">
            <li class="panelbar-item" v-for="(bookItem, index) in teacherBooks" :key="index" :class="{'cur':bookActiveID===bookItem.edu_book_id}" @click.stop="chooseItem($event, 'book', bookItem.edu_book_id)">{{bookItem.name}}</li>
            <div style="clear:both;"></div>
          </ul>
          <div style="clear:both;"></div>
        </div>
      </span>
    </div>
    <div>
    </div>

    <div class="status-div">
      共{{totalCountNum}}个作业&nbsp;&nbsp;<span style="color: red;">{{countNum}}</span>个待批改
    </div>

    <!-- <div class="list-container" v-bind:style="listContainerStyle"> -->
      <van-pull-refresh class="list-container" v-model="pullRefresIsLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="loadMore" :offset="300" :immediate-check="false">
          <div v-for="(item, index) in homeworkListArray" :key="index" v-if="homeworkListArray.length > 0">
            <div class="time-classify" v-if="item.create_time.length>0" v-html="item.create_time"></div>
            <div @click="goHomeworkDetail(item)" class="homework_list">
              <div class="homework_list_inline_list">
                  <p class="homework-list-tile single-line">{{item.title}}</p>&nbsp;&nbsp;<p class="font-color single-line">{{item.resource_count}}份</p>
                </div>
              <div class="list-container-left">
                <div class="homework_list_inline_list font-color">{{item.edu_subject_name}}&nbsp;&nbsp;&nbsp;{{item.class_name}}</div>
                <div class="homework_list_inline_list">
                  <span class="font-color">完成：</span><span class="homework-list-finish">{{item.finished_counter}}</span>
                  <span class="font-color">/{{item.student_counter}}人</span>
                </div>
              </div>
              <div class="mark-icon" v-if="item.correcting_counter!=='0'">待批阅</div>
              <div class="list-container-right">
                <p>正确率:&nbsp;</p>
                  <span class="right-rate">{{item.right_rate >= 0 ? Math.round(item.right_rate*100) : '--'}}</span>
                  <span v-if="item.right_rate >= 0" style="font-size:16px;color: #2ec2a9">%</span>
                  <i class="fa fa-angle-right arrow-right"></i>
              </div>
              <div class="homework_list_inline_list end-time"><span>作业时间：</span>{{item.start_time + "-" + item.deadline}}</div>
              <div style="clear:both;"></div>
            </div>
          </div>
        </van-list>

        <div v-if="homeworkListArray.length === 0" class="tip-div">
          <img src="@/assets/images/homework/tip-head.png"/>
          <div><p class="tip-bold-p">暂无作业~</p><p>快去布置作业吧</p><p>布置后您可以在这里看到实时统计</p></div>
        </div>
      </van-pull-refresh>
    <!-- </div> -->

    <van-popup v-model="showTimePopup" position="bottom" :overlay="true">
      <van-datetime-picker type="year-month" :min-date="minDate" :max-date="currentDate" @cancel="onCancelTimePopup" @confirm="onConfirmTimePopup"/>
    </van-popup>

    <div class="publish-homework-btn-div" @click="goChooseTextbook" v-show="homeworkState=='0'">
      <div class="publish-homework-btn">
        <div>布置<br/>作业</div>
      </div>
    </div>
    <div class="cover" :class="{'active': activeItem > 0}"></div>
  </div>
</template>

<script>
import api from "@/module/homework/axios/publishHomeWork.js";

export default {
  name: "Homework",
  data() {
    return {
      homeworkListArray: [],
      list: [],
      loading: false,
      finished: false,
      pullRefresIsLoading: false,
      activeItem: 0,
      timeActiveID: 0,
      statusActiveID: "all",
      markStatus: 0,
      teacherBooks: [{ edu_book_id: "0", name: "全部教材" }],
      bookActiveID: "0",
      classActiveID: 0,
      currentPage: 1,
      noMore: false,
      showClassPopup: false,
      showTimePopup: false,
      chooseTextBookObj: null,
      pullRefresh: false,
      columnsOfClass: [],
      countNum: 0,
      totalCountNum: 0,
      inputValue: "",
      searchKeyword: "",
      homeworkState: "0",
      isSearching: false
    };
  },
  directives: {
    "to-focus": function(el, binding) {}
  },
  activated: function() {
    this.homeworkState = this.$store.state.homework.homeworkState;
    this.onRefresh();
  },
  created: function() {
    var nowdate = new Date();
    var yNow = nowdate.getFullYear();
    var mNow = nowdate.getMonth() + 1;
    var dNow = nowdate.getDate();
    var formatnowdate = yNow + "-" + mNow + "-" + dNow + " 24:00:00";

    // 获取系统前一周的时间
    var oneweekdate = new Date(nowdate - 7 * 24 * 3600 * 1000);
    var yWeek = oneweekdate.getFullYear();
    var mWeek = oneweekdate.getMonth() + 1;
    var dWeek = oneweekdate.getDate();
    var formatWeekdate = yWeek + "-" + mWeek + "-" + dWeek + " 00:00:00";

    // 获取系统前一个月的时间
    nowdate.setMonth(nowdate.getMonth() - 1);
    var yOneMonth = nowdate.getFullYear();
    var mOneMonth = nowdate.getMonth() + 1;
    var dOneMonth = nowdate.getDate();
    var formatOneMonthdate =
      yOneMonth + "-" + mOneMonth + "-" + dOneMonth + " 00:00:00";
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
      }
    ];

    this.columnsOfStatus = [
      {
        text: "全部状态",
        value: "all"
      },
      {
        text: "待批阅",
        value: "correct"
      },
      {
        text: "已批阅",
        value: "finish"
      }
    ];
  },
  computed: {
    minDate: function() {
      let d = new Date();
      return new Date(2015, 0);
    },
    currentDate: function() {
      return new Date();
    }
  },
  mounted: function() {
    this.userInfo = this.$store.state.account.userInfo;
    var array = [
      {
        text: "全部班级",
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
    this.classActiveID = 0;
    this.chooseStatus = this.columnsOfStatus[0];
    this.statusActiveID = this.chooseStatus.value;
    this.chooseTime = this.columnsOfTime[0];
    this.timeClassify = [];
    this.weekday = new Array(7);
    this.weekday[0] = "周日";
    this.weekday[1] = "周一";
    this.weekday[2] = "周二";
    this.weekday[3] = "周三";
    this.weekday[4] = "周四";
    this.weekday[5] = "周五";
    this.weekday[6] = "周六";
    this.getChoosedBook();
    this.getBooksByTeacher();
  },
  methods: {
    chooseItem(e, type, value) {
      this.activeItem = 0;
      this.currentPage = 1;
      switch (type) {
        case "time":
          if (value === 3) {
            this.showTimePopup = !this.showTimePopup;
          } else {
            this.timeActiveID = value;
            this.chooseTime = this.columnsOfTime[value];
            this.onRefresh();
          }
          break;

        case "status":
          this.chooseStatus = this.columnsOfStatus[value];
          this.statusActiveID = this.chooseStatus.value;
          this.onRefresh();
          break;

        case "class":
          this.chooseClass = this.columnsOfClass[value];
          this.classActiveID = value;
          this.onRefresh();
          break;

        case "mark":
          this.markStatus = value;
          this.onRefresh();
          break;

        case "book":
          this.bookActiveID = value;
          this.onRefresh();
          break;
      }
    },
    clickClass() {
      this.activeItem = 3;
    },
    clickStatus() {
      this.activeItem = 2;
    },
    clickTime() {
      this.activeItem = 1;
    },
    clickMore() {
      this.activeItem = 4;
    },
    searchAction() {
      this.searchKeyword = this.inputValue;
      this.isSearching = false;
      this.onRefresh();
    },
    cancelAction() {
      this.searchKeyword = "";
      this.isSearching = false;
      this.onRefresh();
    },
    clickSearchBtn() {
      this.inputValue = "";
      this.isSearching = true;
    },
    onConfirmTimePopup(value, index) {
      this.timeActiveID = 3;
      this.showTimePopup = false;
      let d = new Date(value);
      this.chooseTime.from =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " 00:00:00";
      let t = new Date();
      this.chooseTime.to =
        t.getFullYear() +
        "-" +
        (t.getMonth() + 1) +
        "-" +
        t.getDate() +
        " 24:00:00";
      this.onRefresh();
    },
    onCancelTimePopup() {
      this.showTimePopup = false;
    },
    onRefresh() {
      this.currentPage = 1;
      this.pullRefresh = true;
      this.homeworkListArray.length = 0;
      this.finished = false;
      this.timeClassify = [];
      setTimeout(() => {
        this.pullRefresIsLoading = false;
      }, 500);
      this.getHomeworkList();
    },
    goHomeworkDetail(item) {
      this.$store.dispatch("homeworkOneListInfoObj", item);
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
      if (this.noMore) {
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
    getBooksByTeacher() {
      var self = this;
      var data = {
        user_id: this.userInfo.userid
      };
      api.getBooksByTeacher(data).then(
        success => {
          self.teacherBooks = self.teacherBooks.concat(success.books);
        },
        err => {
          console.log(err);
          self.$toast("网络异常");
        }
      );
    },
    getChoosedBook() {
      var self = this;
      var data = {
        user_id: this.userInfo.userid
      };
      api.getLastRecord(data).then(
        success => {
          if (success.hasOwnProperty("grade_id")) {
            self.chooseTextBookObj = success;
          }
        },
        err => {
          console.log(err);
          self.$toast("网络异常");
        }
      );
    },
    goChooseTextbook() {
      if (!this.chooseTextBookObj) {
        this.chooseTextBookObj = JSON.parse(
          localStorage.getItem("chooseTextBookObj")
        );
      }

      if (this.chooseTextBookObj) {
        this.$store.dispatch("chooseTextBookObj", this.chooseTextBookObj);
        this.$store.dispatch("publishHWBackPage", "homework");
        this.$router.push({
          path: "/publishHomework"
        });
      } else {
        this.$store.state.homework.chooseBackPage = "homework";
        this.$router.push({
          path: "/chooseTextbook"
        });
      }
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
        per_page: 6,
        type: self.homeworkState === "0" ? "1,2,20" : "5",
        favorite: self.markStatus,
        edu_subject_id: self.bookActiveID,
        asc: 1,
        keyword: self.searchKeyword
      };

      api.homeworkLists(data).then(
        success => {
          if (self.pullRefresh) {
            self.homeworkListArray.length = 0;
          }
          self.pullRefresh = false;
          if (success.lists.length < 1) {
            self.noMore = true;
          } else {
            self.noMore = false;
            var nowD = new Date();
            var yesterday = new Date();
            yesterday.setTime(nowD.getTime() - 24 * 60 * 60 * 1000);
            success.lists.forEach(element => {
              element.create_time = element.create_time.split(" ")[0];
              let d = new Date(element.create_time);
              if (
                self.timeClassify.indexOf(
                  d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
                ) > -1
              ) {
                element.create_time = "";
                return;
              }
              self.timeClassify.push(
                d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
              );
              if (d.getFullYear() === nowD.getFullYear()) {
                if (d.getMonth() === nowD.getMonth()) {
                  if (d.getDate() === nowD.getDate()) {
                    element.create_time =
                      "今天&nbsp;&nbsp;&nbsp;&nbsp;" + self.weekday[d.getDay()];
                  } else {
                    element.create_time =
                      d.getMonth() +
                      1 +
                      "-" +
                      d.getDate() +
                      "&nbsp;&nbsp;&nbsp;&nbsp;" +
                      self.weekday[d.getDay()];
                  }
                } else {
                  element.create_time =
                    d.getMonth() +
                    1 +
                    "-" +
                    d.getDate() +
                    "&nbsp;&nbsp;&nbsp;&nbsp;" +
                    self.weekday[d.getDay()];
                }
              } else {
                element.create_time =
                  d.getFullYear() +
                  "-" +
                  (d.getMonth() + 1) +
                  "-" +
                  d.getDate() +
                  "&nbsp;&nbsp;&nbsp;&nbsp;" +
                  self.weekday[d.getDay()];
              }
              if (
                d.getFullYear() === yesterday.getFullYear() &&
                d.getMonth() === yesterday.getMonth() &&
                d.getDate() === yesterday.getDate()
              ) {
                element.create_time =
                  "昨天&nbsp;&nbsp;&nbsp;&nbsp;" + self.weekday[d.getDay()];
              }
            });
            self.homeworkListArray = self.homeworkListArray.concat(
              success.lists
            );
          }
          // self.currentPage = Number(success.page);
          self.loading = false;
          self.countNum = success.count;
          self.totalCountNum = success.total_count;
          //  self.$nextTick(_ => {
          // self.loading = false
          // })
        },
        err => {
          console.log(err);
          self.loading = false;
          self.$toast("网络异常");
        }
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/variable.scss";
.homework_list {
  margin-top: 1.33333vw;
  padding: 1.86667vw;
  background: #fff;
  width: 91%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  position: relative;
}
.time-classify {
  text-align: center;
  font-size: 16px;
  padding-top: 10px;
}
.search-btn-div {
  position: absolute;
  right: 10px;
  top: 0;
  height: 45px;
  line-height: 45px;
}
.search-input-div {
  border: $border-state;
  border-radius: 10px;
  display: inline-block;
  padding: 1vw 13vw 1vw 7vw;
  position: relative;
  left: 2.66667vw;
  width: 64%;
  top: -0.5vw;
  input[type="search"]::-webkit-search-cancel-button {
    display: none;
  }
  .van-cell {
    padding: 0vw;
  }
}
.tip-div {
  font-size: 16px;
  color: #9c9ea1;
  text-align: center;
  img {
    width: 236px;
    height: 246px;
  }
  .tip-bold-p {
    font-size: 18px;
    font-weight: bold;
    color: #000;
  }
  p {
    margin-bottom: 10px;
  }
}
.search-hr {
  height: calc(#{$header-height} - 3.3vw);
  position: absolute;
  right: 25%;
  top: 1.65vw;
  margin: 0px;
  border-left: 1px solid #ededf0;
}
.search-btn {
  font-size: 16px;
  position: absolute;
  right: 15%;
  padding-left: 1%;
  cursor: pointer;
}
.search-btn:active,
.cancel-btn:active {
  color: $green-active-color;
}
.cancel-btn {
  font-size: 16px;
  float: right;
  padding-right: 2.66667vw;
  cursor: pointer;
}
.search-little-icon {
  width: calc(#{$header-height}/ 3);
  height: calc(#{$header-height}/ 3);
  position: absolute;
  left: 4vw;
  top: 4vw;
}
.search-icon {
  width: calc(#{$header-height}/ 2);
  height: calc(#{$header-height}/ 2);
  padding-top: 3vw;
  cursor: pointer;
}
.mark-icon {
  background-color: $orange-primary-color;
  border-radius: 8px;
  width: 65px;
  height: 25px;
  font-size: 16px;
  line-height: 25px;
  color: #fff;
  display: inline-block;
  position: absolute;
  text-align: center;
  right: 2vw;
  top: 20%;
  transform: translate(0, -50%);
}
.homework-list-tile {
  font-size: 18px;
  font-weight: 700;
  display: inline-block;
  max-width: 80%;
}
.homework-list-finish {
  color: $green-primary-color;
  font-size: 22px;
}
.list-container-left {
  width: 52%;
  display: inline-block;
}
.list-container-right {
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 45%;
  font-size: 16px;
  line-height: 10vw;
  p {
    display: inline;
    position: relative;
    top: -0.2vw;
  }
}
.select-container {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: $border-state;
}
.status-div {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-bottom: 1px solid #ededf0;
  padding-left: 10px;
  font-size: 16px;
}
.right-rate {
  font-size: 28px;
  color: $green-primary-color;
}
.select-span {
  width: 80px;
  display: inline-block;
  font-size: 16px;
  &.active {
    .select-span-div {
      color: $green-active-color;
    }
    .panelbar-list {
      display: inline-block;
      height: auto;
      overflow-y: scroll;
    }
  }
  .book-list {
    position: absolute;
    left: 0px;
    right: 0px;
    text-align: left;
    top: calc(#{$header-height} + 0.5vw);
    display: inline-block;
    background-color: #fff;
    transition: all 0.2s ease-in;
    overflow-y: scroll;
    height: auto;
    z-index: 50;
    .panelbar-item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: #{$header-height};
      padding-left: 10px;
      &.cur {
        color: $green-active-color;
      }
    }
  }
  .panelbar-list {
    position: absolute;
    left: 0px;
    right: 0px;
    text-align: left;
    top: calc(#{$header-height}* 2 + 0.5vw);
    display: none;
    background-color: #fff;
    transition: all 0.2s ease-in;
    overflow: hidden;
    z-index: 50;
    .panelbar-item {
      line-height: #{$header-height};
      padding-left: 10px;
      &.cur {
        color: $green-active-color;
      }
      span {
        &.cur {
          color: $green-active-color;
        }
        padding-right: 8vw;
      }
    }
  }
}
.cover {
  position: absolute;
  top: calc(#{$header-height}* 2 + 0.5vw);
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in;
  display: none;
  z-index: 30;
  &.active {
    display: block;
  }
}
.select-span-div {
  padding: 0 10px;
  border-radius: 2px;
  line-height: $header-height;
  position: relative;
  box-sizing: border-box;
}
.publish-homework-btn {
  font-size: 18px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.publish-homework-btn-div {
  width: 60px;
  height: 60px;
  background-color: #2ec2a9;
  border-radius: 50%;
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #ffffff;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
.homework_list_inline_list {
  line-height: 25px;
}
.single-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.list-container {
  overflow-y: auto;
  height: calc(100% - #{$header-height} - #{$header-height} - 40px);
}
.font-color {
  color: #989ca0;
  font-size: 16px;
}
.end-time {
  color: #989ca0;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.arrow-right {
  font-size: 36px;
  float: right;
  color: #989ca0;
}
</style>
