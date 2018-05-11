<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>作业</h1>
      <i class="cubeic-back" @click="goHome">返回</i>
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
      <div class="homework_list" v-for="(item, index) in homeworkListArray" :key="index">
        <div>
          <div class="homework_list_inline_list">{{item.start_time}}</div>
          <div class="homework_list_inline_list">{{item.title}}</div>
          <div class="homework_list_inline_list">{{item.edu_subject_name}} {{item.class_name}}</div>
          <div class="homework_list_inline_list">截止：{{item.deadline}}</div>
        </div>
      </div>
    </div>

    <div style="width: 50px;height: 50px;background-color: #fc9153;border-radius: 25px;position:absolute;bottom:20px;right:20px;" @click="goChooseTextbook">
      <div style="height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;">
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
      title: '班级',
      homeworkListArray: [],
      listContainerStyle: {
        height: window.innerHeight - 90 + 'px'
      }
    };
  },
  mounted: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.getHomeworkList();
  },
  methods: {
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
          if (response.data.msg == "ok") {
            self.homeworkListArray = response.data.recordset.lists;
          } else {
            self.$toast({
              message: response.data.msg,
              duration: 1000
            });
            return;
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
.homework_list{
  margin-top:5px;
  padding: 7px;
  background: #fff;
  border-bottom: 1px solid #111;
}
.select-span{
  width:60px;
  display:inline-block;
}

.select-container{
  display: flex;
  justify-content: space-between;
}
.homework_list_inline_list{
  line-height:25px;
}
.listContainer{
  overflow-y:auto;
}
</style>
