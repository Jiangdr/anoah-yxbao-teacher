<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>作业发布</h1>
      <i class="cubeic-back" @click="goSummerHomework">返回</i>
    </header>

    <div>
        <van-cell-group>
          <van-field v-model="homeworkName" placeholder="请输入作业名称" label="作业名称" />
          <van-cell title="发布时间" is-link :value="publishDateFormat" @click="showPublishDatePicker(selectPublishTime)"/>
          <van-cell title="截止时间" is-link :value="endDateFormat" @click="showEndDatePicker"/>
        </van-cell-group>

        <van-cell value="布置班级" />
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <van-cell v-for="item in userInfo.classes" :title="`${item.class_name}`" :key="item.class_id">
              <van-checkbox :name="item" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-cell title="答案公布时间" is-link :value="answerDateFormat" @click="showAnswerDatePicker"/>
    </div>
    <cube-button style="position:absolute;bottom:0px;" :outline="true" @click="surePublish">确认布置</cube-button>
  </div>
</template>

<script>
export default {
  name: "publishHomework",
  data() {
    return {
      homeworkName: "",
      result: [],
      publishDate: new Date(),
      publishDateFormat: "",
      endDateFormat: "",
      answerDateFormat: "",
      publishDateTimePicker: "",
      endDateTimePicker: "",
      answerDateTimePicker: ""
    };
  },
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
  },
  mounted: function() {
    this.chooseSummerHomeworkArray = this.$store.state.homework.chooseSummerHomeworkArray;
  },
  methods: {
    goSummerHomework() {
      this.$router.push({
        path: "/summerHomework"
      });
    },
    showPublishDatePicker() {
      if (!this.publishDateTimePicker) {
        this.publishDateTimePicker = this.$createDatePicker({
          title: "",
          min: new Date(2009, 7, 8, 8, 0, 0),
          max: new Date(2021, 9, 20, 20, 59, 59),
          value: new Date(),
          columnCount: 6,
          onSelect: this.selectPublishTime,
          onCancel: this.cancelPublishTime
        });
      }

      this.publishDateTimePicker.show();
    },
    selectPublishTime(date, selectedVal, selectedText) {
      var formatTime = this.$dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      this.publishDateFormat = formatTime;
    },
    cancelPublishTime() {},
    showEndDatePicker() {
      if (!this.endDateTimePicker) {
        this.endDateTimePicker = this.$createDatePicker({
          title: "",
          min: new Date(2009, 7, 8, 8, 0, 0),
          max: new Date(2021, 9, 20, 20, 59, 59),
          value: new Date(),
          columnCount: 6,
          onSelect: this.selectEndTime,
          onCancel: this.cancelEndTime
        });
      }

      this.endDateTimePicker.show();
    },
    selectEndTime(date, selectedVal, selectedText) {
      var formatTime = this.$dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      this.endDateFormat = formatTime;
    },
    cancelEndTime() {},
    showAnswerDatePicker() {
      if (!this.answerDateTimePicker) {
        this.answerDateTimePicker = this.$createDatePicker({
          title: "",
          min: new Date(2009, 7, 8, 8, 0, 0),
          max: new Date(2021, 9, 20, 20, 59, 59),
          value: new Date(),
          columnCount: 6,
          onSelect: this.selectAnswerTime,
          onCancel: this.cancelAnswerTime
        });
      }

      this.answerDateTimePicker.show();
    },
    selectAnswerTime(date, selectedVal, selectedText) {
      var formatTime = this.$dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      this.answerDateFormat = formatTime;
    },
    cancelAnswerTime() {},
    surePublish() {
      var self = this;
      var classIds = "";
      var array = self.result;
      for (let i = 0; i < array.length; i++) {
        if (i + 1 === array.length) {
          classIds += array[i].class_id;
        } else {
          classIds += array[i].class_id + ",";
        }
      }

      var resourceId = [];
      var array2 = self.chooseSummerHomeworkArray;
      for (let i = 0; i < array2.length; i++) {
        resourceId.push({
          title: array2[i].name,
          rids: [array2[i].resource_id]
        });
      }

      var url = "/jwt/zuoye/publish/launch?";
      var data = {
        user_id: this.userInfo.userid,
        title: self.homeworkName,
        publish_time: self.publishDateFormat,
        deal_time: self.endDateFormat,
        class_ids: classIds,
        resource_id: JSON.stringify(resourceId),
        view_answer_time: self.answerDateFormat
      };

      if (data.deal_time && data.title && data.view_answer_time) {
        self.$http
          .get(url, { params: data })
          .then(function(response) {
            if (response.data.msg === "ok") {
              self.$toast({
                message: "布置成功！",
                duration: 1000
              });
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
      } else {
        self.$toast({
          message: "请填写完整条件！",
          duration: 1000
        });
      }
    }
  }
};
</script>

<style scoped>
.activeTabClass {
  color: #fc9153;
}
</style>
