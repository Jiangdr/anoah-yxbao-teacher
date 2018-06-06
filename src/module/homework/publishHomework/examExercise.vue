<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>试卷</h1>
      <i class="cubeic-back" @click="goSummerHomework"><i class="fa fa-angle-left"></i></i>
    </header>
    <div style="overflow-y:auto;overflow-x:hidden;" v-bind:style="listContainerStyle">
      <div style="padding: 5px 10px;height: 25px; line-height: 25px;">全部题目（{{setting.length}}）</div>
      <div v-for="(item, index) in setting" :key="index" style="position: relative;">
        <Qti :setting="item"></Qti>
        <!-- <exerciseCheckBox style="position: absolute;right:10px;bottom:10px;width: 25px;height: 25px;" class="checkbox" :selected="item.isSel" :ref="'cb-'+item.qid" @select="checkboxChange(item,$event)"></exerciseCheckBox> -->
      </div>
    </div>

  </div>
</template>

<script>
import exerciseCheckBox from "@/components/common/exercise-check-box.vue";

export default {
  name: "examExercise",
  components: { exerciseCheckBox },
  data() {
    return {
      setting: [],
      listContainerStyle: {
        height: window.innerHeight - 50 + 'px'
      },
      rids: this.$route.params.rids,
      hasChoosePagesNumArray: []
    };
  },
  computed: {},
  created: function() {
    this.qti_ids = this.rids ? this.rids : this.$store.state.homework.chooseExamExerciseQtiIdsArray;
    console.log(this.$store.state.homework.chooseExamExerciseQtiIdsArray)
    this.qtiFun();
  },
  methods: {
    qtiFun() {
      for (var i = 0; i < this.qti_ids.length; i++) {
        this.setting[i] = {
          domain: "e.dev.anoah.com",
          qid: this.qti_ids[i],
          num: i + 1,
          hide_result: 1,
          caller: "PREVIEWOR",
          resource_type: "qti_question",
          isSel: true
        };
      }
    },
    goSummerHomework() {
      this.$router.go(-1);
    },
    checkboxChange(item, event) {
      if (event.selecteState) {
        this.hasChoosePagesNumArray.push(item);
        this.hasChooseProblemsNum =
          parseInt(this.hasChooseProblemsNum) + parseInt(item.qti_num);
      } else {
        this.hasChoosePagesNumArray.splice(
          this.hasChoosePagesNumArray.indexOf(item),
          1
        );
        this.hasChooseProblemsNum =
          parseInt(this.hasChooseProblemsNum) - parseInt(item.qti_num);
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
.list-item .checkbox {
  width: 25px;
  height: 25px;
  right: 3px;
  top: 42px;
  border-radius: 20px;
  position: absolute;
}
.list-item .checkboxAll {
  width: 25px;
  height: 25px;
  border-radius: 20px;
}
.checkboxAll img {
  width:100%;
  height:100%
}
.bg-class {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
