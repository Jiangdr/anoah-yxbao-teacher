<template>
  <div id="student-score-table">
    <div class="title van-hairline--bottom">学生成绩表</div>
    <div class="content">
      <div class="table-title van-hairline--bottom">
        <div class="table-cell" @click="sortList(1)">
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
        <div class="table-row van-hairline--bottom" v-for="(stu, index) in studentInfo" :key="index">
          <div class="table-cell">
            <div class="stu-name">{{stu.real_name}}</div>
          </div>
          <div class="table-cell">
            <div class="correct-per">{{stu.rate * 100}}%</div>
          </div>
          <div class="table-cell">
            <div class="cuoti">{{stu.correct_num}}</div>
          </div>
          <div class="table-cell">
            <div class="time-length">{{stu.time_length | time}}</div>
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
      }
    }
  },
  filters: {
    time(val) {
      return val.replace('分', "''").replace('秒', "'''")
    }
  },
  computed: {
    ...mapGetters({
      studentInfo: 'homeworkDetail/getStudentInfo'
    })
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
    },
    sortByCorrect() {
      this.switchSort('correctPer')
    },
    sortByCuoti() {
      this.switchSort('cuoti')
    },
    sortByTime() {
      this.switchSort('time')
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
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #c7cac9;
    }
    .table-cell{
      flex: 1;
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
      .table-row{
        width: 100%;
        color: #1e1e1e;
        display: flex;
        height: 55px;
        line-height: 55px;
        text-align: center;
      }
    }
  }
}
</style>
