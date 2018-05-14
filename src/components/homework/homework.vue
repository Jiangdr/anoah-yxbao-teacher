<template>
  <div class="cube-page cube-view button-view">

    <header class="header">
      <h1>作业</h1>
      <i class="cubeic-back" @click="goHome">
        <i class="fa fa-angle-left"></i> 返回
      </i>
    </header>

    <div class="select-container">
      <span class="select-span">
        <!-- <cube-select :options="options" placeholder="班级" title="班级"></cube-select> -->
        <div class="select-span-div" @click="clickClass">班级<i class="fa fa-sort-down"></i></div>
      </span>
      <span class="select-span">
        <!-- <cube-select :options="options" placeholder="状态" title="状态"></cube-select> -->
        <div class="select-span-div" @click="clickStatus">状态<i class="fa fa-sort-down"></i></div>
      </span>
      <span class="select-span">
        <!-- <cube-select :options="options" placeholder="时间" title="时间"></cube-select> -->
        <div class="select-span-div" @click="clickTime">时间<i class="fa fa-sort-down"></i></div>
      </span>
    </div>

    <div class="listContainer" v-bind:style="listContainerStyle">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div @click="goHomeworkDetail(item)" class="homework_list" v-for="(item, index) in homeworkListArray" :key="index" v-if="homeworkListArray.length > 0">
          <div>
            <div class="homework_list_inline_list">{{item.start_time}}</div>
            <div class="homework_list_inline_list">{{item.title}}</div>
            <div class="homework_list_inline_list">{{item.edu_subject_name}} {{item.class_name}}</div>
            <div class="homework_list_inline_list">截止：{{item.deadline}}</div>
          </div>
        </div>

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
export default {
  name: "Homework",
  data() {
    return {
      options: [2013, 2014, 2015, 2016, 2017, 2018],
      value: 2016,
      title: "班级",
      homeworkListArray: [],
      listContainerStyle: {
        height: window.innerHeight - 90 + "px"
      },
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      showClassPopup: false,
      showStatusPopup: false,
      showTimePopup: false,
      columnsOfClass: [],
      columnsOfStatus: [
        {
          text: '全部',
          value: 'all'
        }, {
          text: '待批改',
          value: 'correct'
        }, {
          text: '已批改',
          value: 'finish'
        }
      ]
    };
  },
  created: function() {
    var nowdate = new Date();
    var yNow = nowdate.getFullYear();
    var mNow = nowdate.getMonth() + 1;
    var dNow = nowdate.getDate();
    var formatnowdate = yNow + '-' + mNow + '-' + dNow;
    // $("#enddate").datebox("setValue",formatnowdate);
    // 获取系统前一周的时间
    var oneweekdate = new Date(nowdate - 7 * 24 * 3600 * 1000);
    var yWeek = oneweekdate.getFullYear();
    var mWeek = oneweekdate.getMonth() + 1;
    var dWeek = oneweekdate.getDate();
    var formatWeekdate = yWeek + '-' + mWeek + '-' + dWeek;
    // $("#fdate").datebox("setValue",formatwdate);
    // 获取系统前一个月的时间
    nowdate.setMonth(nowdate.getMonth() - 1);
    var yOneMonth = nowdate.getFullYear();
    var mOneMonth = nowdate.getMonth() + 1;
    var dOneMonth = nowdate.getDate();
    var formatOneMonthdate = yOneMonth + '-' + mOneMonth + '-' + dOneMonth;

    nowdate.setMonth(nowdate.getMonth() - 2);
    var yThreeMonth = nowdate.getFullYear();
    var mThreeMonth = nowdate.getMonth() + 1;
    var dThreeMonth = nowdate.getDate();
    var formatThreeMonthdate = yThreeMonth + '-' + mThreeMonth + '-' + dThreeMonth;
    // $("#fdate").datebox("setValue",formatwdate);
    this.columnsOfTime = [
      {
        text: '全部',
        from: '',
        to: ''
      }, {
        text: '最近一周',
        from: formatWeekdate,
        to: formatnowdate
      }, {
        text: '最近一个月',
        from: formatOneMonthdate,
        to: formatnowdate
      }, {
        text: '最近三个月',
        from: formatThreeMonthdate,
        to: formatnowdate
      }
    ]
  },
  mounted: function() {
    this.userInfo = this.$store.state.account.userInfo;
    var array = [
      {
        text: '全部',
        class_id: ''
      }
    ];
    for (let i = 0; i < this.$store.state.account.userInfo.classes.length; i++) {
      array.push(
        {
          text: this.$store.state.account.userInfo.classes[i].class_name,
          class_id: this.$store.state.account.userInfo.classes[i].class_id
        }
      );
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
        this.isLoading = false;
      }, 500);
      this.getHomeworkList(this.columns[0].class_id, 'all');
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
    getHomeworkList(classId) {
      var self = this;
      var url = "/jwt/zuoye/homework/homeworkLists?";
      var data = {
        user_id: self.userInfo.userid,
        class_id: self.chooseClass.class_id,
        status: self.chooseStatus.value,
        from: self.chooseTime.from,
        to: self.chooseTime.to
      };

      self.$http
        .get(url, { params: data })
        .then(function(response) {
          if (response.data.msg === "ok") {
            self.homeworkListArray = response.data.recordset.lists;
          } else {
            self.$toast({
              message: response.data.msg,
              duration: 1000
            });
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
.homework_list {
  margin-top: 5px;
  padding: 7px;
  background: #fff;
  border-bottom: 1px solid #111;
}
.select-span {
  width: 60px;
  display: inline-block;
}
.select-span-div {
  padding: 10px;
  border-radius: 2px;
  border: 1px solid #ccc;
  font-size: 14px;
  line-height: 1.429;
  color: #666;
  background-color: #fff;
  position: relative;box-sizing: border-box;
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
  background-color: #fc9153;
  border-radius: 25px;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.select-container {
  display: flex;
  justify-content: space-between;
}
.homework_list_inline_list {
  line-height: 25px;
}
.listContainer {
  overflow-y: auto;
}
</style>
