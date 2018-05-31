<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>切换学生</h1>
      <i class="cubeic-back"><i class="fa fa-angle-left"></i></i>
    </header>

    <div v-for="(item, index) in studentInfo" :key="index">
      <!-- {{item}} -->
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: "switchStudent",
  data() {
    return {
      peopleNum: 0,
      sortParam: 'correct_down'
    };
  },
  computed: {
    ...mapGetters({
      studentList: 'homeworkDetail/getStudentInfo'
    }),
    studentInfo() {
      return this.studentList(this.sortParam)
    }
  },
  mounted: {
    // debugger
    // console.log(this.studentInfo);
  },
  methods: {
    // studentInfo() {
    //   return this.studentList(this.sortParam)
    // }
  }
};
</script>
<style lang="scss" scoped>
</style>
