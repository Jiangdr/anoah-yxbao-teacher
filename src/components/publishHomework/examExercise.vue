<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>试卷</h1>
      <i class="cubeic-back" @click="goSummerHomework">返回</i>
    </header>
    <div style="overflow-y:auto;overflow-x:hidden;" v-bind:style="listContainerStyle">
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
      listContainerStyle: {
        height: window.innerHeight - 50 + 'px'
      }
    };
  },
  computed: {},
  created: function() {
    this.qti_ids = this.$store.state.homework.chooseExamExerciseArray;
    this.qtiFun();
  },
  methods: {
    qtiFun() {
      for (var i = 0; i < this.qti_ids.length; i++) {
        this.setting[i] = {
          domain: "e.dev.anoah.com",
          qid: this.qti_ids[i],
          num: i + 1,
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
