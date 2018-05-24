<template>
  <div id="student-score-table">
    <div class="title van-hairline--bottom">学生成绩表</div>
    <div class="content">
      <div class="table-title van-hairline--bottom">
        <div class="table-cell name" @click="sortList(1)">
          <span>姓名</span>
          <span class="caret">
            <i class="fa fa-caret-up" :class="{active: sortRule.name.up}"></i>
            <i class="fa fa-caret-down" :class="{active: sortRule.name.down}"></i>
          </span>
        </div>
        <div class="table-cell" @click="sortList(2)">
          <span>正确率</span>
          <span class="caret">
            <i class="fa fa-caret-up" :class="{active: sortRule.correctPer.up}"></i>
            <i class="fa fa-caret-down" :class="{active: sortRule.correctPer.down}"></i>
          </span>
        </div>
        <div class="table-cell" @click="sortList(3)">
          <span>错题订正</span>
          <span class="caret">
            <i class="fa fa-caret-up" :class="{active: sortRule.cuoti.up}"></i>
            <i class="fa fa-caret-down" :class="{active: sortRule.cuoti.down}"></i>
          </span>
        </div>
        <div class="table-cell" @click="sortList(4)">
          <span>用时</span>
          <span class="caret">
            <i class="fa fa-caret-up" :class="{active: sortRule.time.up}"></i>
            <i class="fa fa-caret-down" :class="{active: sortRule.time.down}"></i>
          </span>
        </div>
      </div>
      <div class="table-body">
        <div class="table-row van-hairline--bottom" v-for="(stu, index) in studentInfo" :key="index" @click="linkTo(stu.status)">
          <div class="table-cell name">
            <div class="stu-name">
              <img :src="stu.avatar" alt="">
              <span>{{stu.real_name}}</span>
            </div>
          </div>
          <div class="table-cell">
            <div class="correct-per">
              <span v-if="stu.status == 3">{{stu.rate * 100}}%</span>
              <span v-else-if="stu.status == 1">未批改</span>
              <span v-else>未提交</span>
            </div>
          </div>
          <div class="table-cell">
            <div class="cuoti">
              <span v-if="stu.status == 3 || stu.status == 1">{{stu.correct_num}}</span>
              <span v-if="stu.status == 0">--</span>
            </div>
          </div>
          <div class="table-cell">
            <div class="time-length">
              <span v-if="stu.status == 3 || stu.status == 1">{{stu.time_length | time}}</span>
              <span v-else>--</span>
            </div>
          </div>
          <div class="arrow" v-show="stu.status == 3 || stu.status == 1">
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 全班成绩 ==> 学生成绩表
import {mapGetters} from 'vuex'
export default {
  name: 'StudentScoreTable',
  data() {
    return {
      'sortRule': {
        name: {
          up: false,
          down: false
        },
        correctPer: {
          up: false,
          down: true
        },
        cuoti: {
          up: false,
          down: false
        },
        time: {
          up: false,
          down: false
        }
      },
      sortParam: 'correct_down'
    }
  },
  filters: {
    time(val) {
      return val.replace('分', "''").replace('秒', "'''").replace('小时', "'")
    }
  },
  computed: {
    ...mapGetters({
      studentList: 'homeworkDetail/getStudentInfo'
    }),
    studentInfo() {
      return this.studentList(this.sortParam)
    }
  },
  methods: {
    // 转换排序规则
    switchSort(type) {
      if (!this.sortRule[type]['up'] && !this.sortRule[type]['down']) {
        for (let key in this.sortRule) {
          for (let inner in this.sortRule[key]) {
            this.sortRule[key][inner] = false
          }
        }
        this.sortRule[type]['down'] = true
      } else if (this.sortRule[type]['up']) {
        this.sortRule[type]['up'] = false
        this.sortRule[type]['down'] = true
      } else {
        this.sortRule[type]['up'] = true
        this.sortRule[type]['down'] = false
      }
    },
    // 点击排序
    sortList(type) {
      switch (type) {
        case 1:
          this.sortByName()
          break;
        case 2:
          this.sortByCorrect()
          break;
        case 3:
          this.sortByCuoti()
          break;
        case 4:
          this.sortByTime()
          break;
      }
    },
    sortByName() {
      this.switchSort('name')
      this.sortParam = this.sortRule.name.up ? 'name_up' : 'name_down'
    },
    sortByCorrect() {
      this.switchSort('correctPer')
      this.sortParam = this.sortRule.correctPer.up ? 'correct_up' : 'correct_down'
    },
    sortByCuoti() {
      this.switchSort('cuoti')
      this.sortParam = this.sortRule.cuoti.up ? 'cuoti_up' : 'cuoti_down'
    },
    sortByTime() {
      this.switchSort('time')
      this.sortParam = this.sortRule.time.up ? 'time_up' : 'time_down'
    },
    linkTo(status) {
      if (status === 0) {
        return false
      } else {
        console.log('单个学生答题页面')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#student-score-table{
  .title{
    height: 45px;
    line-height: 45px;
    color: #1e1e1e;
    padding: 0 13px;
    font-size: 15px;
  }
  .content{
    height: 600px;
    .table-title, .table-row{
      display: flex;
      font-size: 14px;
    }
    .table-title{
      padding: 0 13px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #c7cac9;
    }
    .table-cell{
      flex: 1;
      &.name{
        flex: 0 0 75px;
      }
    }
    .caret{
      display: inline-flex;
      flex-direction: column;
      font-size: 10px;
      justify-content: center;
      position: relative;
      top: -3px;
      i{
        height: 6px;
        &.active{
          color: #4e4e4e;
        }
      }
    }
    .table-body{
      padding: 0 13px;
      .table-row{
        width: 100%;
        color: #1e1e1e;
        display: flex;
        height: 55px;
        line-height: 55px;
        text-align: center;
      }
    }
    .stu-name{
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      width: 75px;
      img{
        flex: 0 0 25px;
        // width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      span{
        flex: 0 0 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
