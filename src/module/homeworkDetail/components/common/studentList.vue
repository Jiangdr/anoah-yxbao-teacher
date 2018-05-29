<template>
  <div class="student-list">
    <div class="table">
      <!-- <div class="table-name">学生成绩</div> -->
      <div class="table-header">
        <van-row>
          <van-col span="5"><p class="lf">姓名</p></van-col>
          <van-col span="5"><p>完成进度</p></van-col>
          <van-col span="5"><p>正确率</p></van-col>
          <van-col span="5"><p>错题订正</p></van-col>
          <van-col span="4"><p>用时</p></van-col>
        </van-row>
      </div>
      <div class="table-body">
        <van-row
          v-for="(stu, index) in studentList"
          :key='index'
          class="stu"
        >
          <van-col span="5" class="lf">{{stu.real_name}}</van-col>
          <van-col span="5">{{stu.completed_num}}</van-col>
          <van-col span="5">{{itemCorrect(stu.rate)}}</van-col>
          <van-col span="5">{{stu.correct_num}}</van-col>
          <van-col span="4">
            <!-- <van-icon name="arrow"></van-icon> -->
            <template v-if="stu.status == 3 || stu.status == 1 || stu.status == 4">{{stu.time_length | timeFormat}}</template>
            <template v-else>--</template>
            <!-- {{stu.time/1000 | timeFormatSecond}} -->
          </van-col>
          </van-row>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'studentList',
  props: ['studentList'],
  data() {
    return {

    }
  },
  methods: {
    // 资源正确率计算方法
    itemCorrect(correct) {
      if (correct === "" || correct === -1) {
        return "--";
      } else {
        return correct === 0 ? 0 : Math.round(correct * 100) + "%";
      }
    }
  }
}
</script>
<style scoped>
  .table {
  padding:0 13px;
  line-height: 48px;
  font-size: 14px;
  height: 100%;
  text-align: center;
}
.table .lf{
  text-align: left;
}
 .table-header{
   color: #7f8184;
 }
 .table-header,
 .table-body .stu {
  height: 48px;
  border-bottom: 1px solid #eaeaea;
}

 /* .table-body {
  height: calc(100% - 60px);
  overflow-y: scroll;
} */
 .table-body p{
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
 }
</style>
