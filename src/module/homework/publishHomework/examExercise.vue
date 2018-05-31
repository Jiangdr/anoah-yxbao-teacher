<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>试卷</h1>
      <i class="cubeic-back" @click="goSummerHomework"><i class="fa fa-angle-left"></i> 返回</i>
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
      },
      rids: this.$route.params.rids
    };
  },
  computed: {},
  created: function() {
    this.qti_ids = this.rids ? this.rids : this.$store.state.homework.chooseExamExerciseQtiIdsArray;
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
    },
    goSummerHomework() {
      this.$router.back(-1);
    },
    clickPublish() {
      if (this.hasChoosePagesNum === 0) {
        this.$toast({
          message: "请选择试卷！",
          duration: 1000
        });
        return;
      }
      this.$store.dispatch("chooseSummerHomeworkArray", this.result);
      this.$router.push({
        path: "/homeworkPublishSetting"
      });
    }
  }
};
</script>

<style scoped>
.activeTabClass {
  color: #2ec2a9;
}
</style>
