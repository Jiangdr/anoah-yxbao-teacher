<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>切换学生</h1>
      <i class="cubeic-back" @click="goCorrectTheSubject"><i class="fa fa-angle-left"></i></i>
    </header>

    <div v-bind:style="listContainerStyle">
      <ul>
        <li class="list-item" v-for="(item, index) in studentListArray" :key="index" @click="clickStudent(item)">
          <div style="position: relative;margin-bottom:8px;">
            <span style="width: 60px;height: 60px;display: inline-block;position: relative;">
              <img style="border-radius: 50%;width: 100%;height: 100%;" :src="item.avatar"/>
            </span>
            <div class="bg-class checkbox">
              <img src="@/assets/images/batchEvaluate/chooseAvator.png" v-if="item.selectState" style="width:100%;height:100%"/>
            </div>
          </div>
          <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.real_name }}</div>
        </li>
      </ul>
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
      sortParam: 'correct_down',
      listContainerStyle: {
        'height': window.innerHeight - 200 + "px",
        'overflow-y': 'auto',
        'background': '#fff'
      },
      studentListArray: []
    };
  },
  computed: {
    // ...mapGetters({
    //   studentList: 'homeworkDetail/getStudentInfo'
    // }),
    // studentInfo() {
    //   return this.studentList(this.sortParam)
    // }
  },
  mounted() {
    this.account = this.$store.state.account;
    this.studentInfo = this.$store.state.homeworkDetail.homeworkInfo.student_list;
    this.formatStudentInfo();
  },
  methods: {
    goCorrectTheSubject() {
      this.$router.push({
        path: "/correctTheSubject"
      });
    },
    formatStudentInfo() {
      const array = this.studentInfo;
      this.studentListArray = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i].status > 0) {
          this.studentListArray.push(array[i]);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
li {
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  text-align: center;
  margin-top: 1rem;
  position: relative;
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
