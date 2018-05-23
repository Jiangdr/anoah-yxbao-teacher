<template>
  <div class="student-list">
    <div class="table">
      <div class="table-name">学生成绩</div>
      <div class="table-header">
        <van-row>
          <van-col span="5">姓名</van-col>
          <van-col span="5">完成进度</van-col>
          <van-col span="5">正确率</van-col>
          <van-col span="5">错题订正</van-col>
        </van-row>
      </div>
      <div class="table-body">
        <van-row
          v-for="(stu, index) in studentList"
          :key='index'
          class="stu"
        >
          <van-col span="5">{{stu.real_name}}</van-col>
          <van-col span="5">{{stu.completed_num}}</van-col>
          <van-col span="5">{{itemCorrect(stu.rate)}}</van-col>
          <van-col span="5">{{stu.correct_num}}</van-col>
          <van-col span="4">
            <van-icon name="arrow"></van-icon>
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
  text-align: center;
  line-height: 30px;
  height: 100%;
}

 .table-name {
  text-align: left;
  padding-left: 10px;
}

 .table-name,
 .table-header,
 .table-body .stu {
  height: 30px;
  border-bottom: 1px solid #eaeaea;
}

 .table-body {
  height: calc(100% - 60px);
  overflow-y: scroll;
}
</style>
