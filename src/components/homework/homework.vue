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
        <cube-select :options="options" placeholder="班级" title="班级"></cube-select>
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
      isLoading: false
    };
  },
  mounted: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.getHomeworkList();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
      this.getHomeworkList();
    },
    goHomeworkDetail(item) {
      // this.$router.push({
      //   path: "/homeworkDetail/" + courseHourPublishId + '/' + classId
      // });
      this.$router.push({
        path: "/homeworkDetail/:publishId/:classId",
        name: "homeworkDetail",
        params: {
          publishId: item.course_hour_publish_id,
          classId: item.class_id
        }
      });
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
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

      var url = "/jwt/zuoye/homework/homeworkLists?";
      var data = {
        user_id: this.userInfo.userid
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
.publishHomeworkBtn {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.publishHomeworkBtnDiv{
  width: 50px;
  height: 50px;
  background-color: #fc9153;
  border-radius: 25px;
  position:absolute;
  bottom:20px;
  right:20px;
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
