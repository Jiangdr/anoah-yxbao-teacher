<template>
  <div class="cube-page cube-view button-view" id="create-paper">
    <header class="header">
      <h1>作业发布</h1>
      <i class="cubeic-back" @click="goSummerHomework"><i class="fa fa-angle-left"></i></i>
    </header>

    <div>
        <van-cell-group>
          <van-field v-model="homeworkName" placeholder="请填写作业名称" label="作业名称:" icon="clear" @click-icon="homeworkName = ''" :error-message="$route.query.homeworkName && '*所有试题将自动组成一份试卷，趣味题独立发送'"/>
          <van-cell title="开始时间" is-link :value="publishDateFormat" @click="clickShowPupUpDatePickerFun('开始时间')"/>
          <van-cell title="截止时间" is-link :value="endDateFormat" @click="clickShowPupUpDatePickerFun('截止时间')"/>
        </van-cell-group>

        <van-cell value="布置班级" />
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <van-cell v-for="item in userInfo.classes" :title="`${item.class_name}`" :key="item.class_id">
              <van-checkbox :name="item"/>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-cell title="答案公布时间" is-link :value="answerDateFormat" @click="clickShowPupUpDatePickerFun('答案公布时间')"/>
    </div>

    <van-popup v-model="publishDatePickerShow" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @cancel="clickCancelTimeFun" @confirm="clickConfirmTimeFun"/>
    </van-popup>

    <div class="footer-container div-center"><div outline="true" class="yx-green-btn"  @click="surePublishFun">确认布置</div></div>

  </div>

</template>

<script>
import api from "@/module/homework/axios/publishHomeWork.js";
export default {
  name: "homeworkPublishSetting",
  data() {
    return {
      homeworkName: this.$route.query.homeworkName || "暑假作业",
      result: [],
      publishDate: new Date(),
      publishDateFormat: "",
      endDateFormat: "",
      answerDateFormat: "",
      minDate: new Date(2016, 1, 1),
      maxDate: new Date(2019, 12, 30),
      currentDate: new Date(),
      publishDatePickerShow: false,
      popUpType: ""
    };
  },
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
  },
  activated() {
    this.paramsData = this.$route.params;
  },
  mounted: function() {
    this.publishDateFormat = this.$dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.answerDateFormat = this.$dayjs(new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)).format("YYYY-MM-DD HH:mm:ss");
    this.endDateFormat = this.$dayjs(new Date(2018, 7, 31)).format("YYYY-MM-DD HH:mm:ss");
    this.chooseSummerHomeworkArray = this.$store.state.homework.chooseSummerHomeworkArray
  },
  methods: {
    goSummerHomework() {
      this.$router.back(-1);
    },
    clickShowPupUpDatePickerFun(type) {
      this.publishDatePickerShow = true;
      this.popUpType = type;
    },
    clickConfirmTimeFun(date) {
      var formatTime = this.$dayjs(date).format("YYYY-MM-DD HH:mm:ss");
      if (this.popUpType === "开始时间") {
        this.publishDateFormat = formatTime;
      }
      if (this.popUpType === "截止时间") {
        this.endDateFormat = formatTime;
      }
      if (this.popUpType === "答案公布时间") {
        this.answerDateFormat = formatTime;
      }
      this.publishDatePickerShow = false;
    },
    clickCancelTimeFun() {
      this.publishDatePickerShow = false;
    },
    surePublishFun() {
      var self = this;
      var classIds = "";
      var array = self.result;
      var resourceId = [];
      for (let i = 0; i < array.length; i++) {
        if (i + 1 === array.length) {
          classIds += array[i].class_id;
        } else {
          classIds += array[i].class_id + ",";
        }
      }
      if (!this.$route.query.resource_ids) {
        var array2 = self.chooseSummerHomeworkArray;
        for (let i = 0; i < array2.length; i++) {
          resourceId.push({
            title: array2[i].name,
            selected_all: true,
            rids: array2[i].qti_ids,
            exam_resource_id: array2[i].resource_id
          });
        }

        if (this.paramsData[0]) {
          resourceId = this.paramsData;
        }
      } else {
        resourceId = [{
          title: this.$route.query.homeworkName,
          selected_all: false,
          rids: [...this.$route.query.resource_ids],
          exam_resource_id: ''
        }]
      }

      var data = {
        user_id: this.userInfo.userid,
        title: self.homeworkName,
        publish_time: self.publishDateFormat,
        deal_time: self.endDateFormat,
        class_ids: classIds,
        resource_id: JSON.stringify(resourceId),
        view_answer_time: self.answerDateFormat
      };

      if (data.title) {
        self.$toast.loading({
          mask: true,
          message: '加载中...'
        });
        api.launch(data).then(function(r) {
          if (r.msg) {
            self.$toast.clear();
            self.$toast({
              message: r.msg,
              duration: 750
            });
          } else {
            setTimeout(function() {
              self.$router.push({
                path: "/homework"
              });
            }, 500);
          }
          self.$store.dispatch("hasChoosePagesArray", []);
          self.$store.dispatch("isOldPackId", "0");
          window.bus.$emit('clearWrongNote')
        });
      } else {
        self.$toast({
          message: "请填写作业名称！",
          duration: 750
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/custom.scss";
.activeTabClass {
  color: #2ec2a9;
}
</style>
