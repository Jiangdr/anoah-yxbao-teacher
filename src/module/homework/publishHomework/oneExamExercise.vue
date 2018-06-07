<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>试题详情</h1>
      <i class="cubeic-back" @click="goBack"><i class="back-up-arrow"></i></i>
    </header>
    <div style="overflow-y:auto;overflow-x:hidden;" v-bind:style="listContainerStyle">
      <Qti :setting="item" v-if="showItem"></Qti>
    </div>

  </div>
</template>

<script>
import exerciseCheckBox from "@/components/common/exercise-check-box.vue";

export default {
  name: "oneExamExercise",
  components: { exerciseCheckBox },
  data() {
    return {
      setting: [],
      listContainerStyle: {
        height: window.innerHeight - 50 + 'px'
      },
      rids: this.$route.params.rids,
      hasChoosePagesNumArray: [],
      item: {},
      showItem: false
    };
  },
  activated() {
    var params = this.$route.params;
    this.showItem = true;
    params.oneExamExerciseInfo.hide_result = params.hide_result;
    this.item = params.oneExamExerciseInfo;
    console.log(this.item.qid)
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
    goBack() {
      this.showItem = false;
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
  },
  beforeDestroy() {
    this.showItem = false;
    console.log(this.showItem)
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
