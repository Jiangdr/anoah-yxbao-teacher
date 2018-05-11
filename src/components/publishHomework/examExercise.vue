<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>试卷名称</h1>
      <i class="cubeic-back" @click="goSummerHomework">返回</i>
    </header>
    <div style="overflow-y:auto;height:91%;overflow-x:hidden;">
      <div v-for="(value,key) in setting" :key="key">
        <Qti :setting="value"></Qti>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "examExercise",
  data() {
    return {
      setting: [],
      qti_ids: [
        "2019741",
        "2012257",
        "2012190",
        "9002511513744200134",
        "9002511513744200132",
        "9002511501150500055",
        "9002511525419900001",
        "9002511525419900002",
        "9002511525420000001",
        "9002511525420000002",
        "9002511525420100001",
        "9002511525420200001",
        "9002511525751800001",
      ]
    };
  },
  computed: {},
  created: function() {
    this.qtiFun();
  },
  methods: {
    qtiFun() {
      for (var i = 0; i < this.qti_ids.length; i++) {
        this.setting[i] = {
          domain: "e.dev.anoah.com",
          qid: this.qti_ids[i],
          num: i+1,
          caller: "PREVIEWOR",
          resource_type: "qti_question"
        };
      }
      console.log(this.setting)
    },
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
