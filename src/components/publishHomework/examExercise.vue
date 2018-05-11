<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>试卷名称</h1>
      <i class="cubeic-back" @click="goSummerHomework">返回</i>
    </header>
    <Qti :setting="setting"></Qti>
  </div>
</template>

<script>
export default {
  name: "examExercise",
  data() {
    return {
      setting: {
        domain: "e.dev.anoah.com",
        qid: "question:9002511525420300001",
        num: -1,
        caller: "PREVIEWOR"
      }
    };
  },
  computed: {},
  mounted: function() {
    // this.getList();
  },
  methods: {
    goSummerHomework() {
      this.$router.push({
        path: "/summerHomework"
      });
    },
    clickPublish() {
      if (this.hasChoosePagesNum == 0) {
        this.$toast({
          message: "请选择试卷！",
          duration: 1000
        });
        return;
      }
      this.$store.dispatch("setChooseSummerHomework", this.result);
      this.$router.push({
        path: "/homeworkPublishSetting"
      });
    },
    checkboxChange() {
      var array = this.result;
      this.hasChoosePagesNum = array.length;
      this.hasChooseProblemsNum = 0;
      for (let i = 0; i < array.length; i++) {
        this.hasChooseProblemsNum += Number(array[i].qti_num);
      }
    },
    clickTab(name) {
      this.activeTabName = name;
    },
    clickSelectAll() {
      this.checkList = [];
      var array = this.options;
      for (let i = 0; i < array.length; i++) {
        this.checkList.push(array[i].value);
      }
    },
    getList: function(value) {
      var self = this;
      var url = "jwt/resource/package/getResourceLists?";
      var data = {
        user_id: "33737",
        pack_id: "9002511525420500001"
      };
      self.$http
        .get(url, { params: data })
        .then(function(response) {
          if (response.data.msg === "ok") {
            self.lists = response.data.recordset.lists;
          } else {
            console.log(response);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    clickCell() {
      console.log("click cell");
      // this.$router.push({
      //   path: "/chooseTextbook"
      // });
    }
  }
};
</script>

<style scoped>
.activeTabClass {
  color: #fc9153;
}
</style>
