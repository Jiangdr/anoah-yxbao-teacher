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
        <cube-select :options="options" placeholder="状态" title="状态"></cube-select>
      </span>
      <span class="select-span">
        <cube-select :options="options" placeholder="时间" title="时间"></cube-select>
      </span>
    </div>

    <div class="listContainer" v-bind:style="listContainerStyle">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div @click="goHomeworkDetail(item)" class="homework_list" v-for="(item, index) in homeworkListArray" :key="index">
          <div>
            <div class="homework_list_inline_list">{{item.start_time}}</div>
            <div class="homework_list_inline_list">{{item.title}}</div>
            <div class="homework_list_inline_list">{{item.edu_subject_name}} {{item.class_name}}</div>
            <div class="homework_list_inline_list">截止：{{item.deadline}}</div>
          </div>
        </div>
      </van-pull-refresh>
    </div>

    <van-popup v-model="showPopup" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
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
      showPopup: false,
      columns: []
    };
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
    this.columns = array;
    this.getHomeworkList(this.columns[0].class_id);
  },
  methods: {
    clickClass() {
      this.showPopup = !this.showPopup;
    },
    onConfirm(value, index) {
      this.showPopup = false;
      this.getHomeworkList(value.class_id);
    },
    onCancel() {
      this.showPopup = false;
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
      this.getHomeworkList(this.columns[0].class_id);
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
        user_id: this.userInfo.userid,
        class_id: classId
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
