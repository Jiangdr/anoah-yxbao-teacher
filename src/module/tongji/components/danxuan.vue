<template>
  <div class="danxuan">
    <div class="title border-bottom-1px">
      <van-row>
        <van-col span="2">
          <span class="back" @click="goBack">
              <i class="cubeic-back"></i>
              </span>
        </van-col>
        <van-col span="18">
          <span class="text">查看统计</span>
        </van-col>
        <van-col span="4">原题</van-col>
      </van-row>
    </div>
    <div class="title-bar">
      <van-row>
        <van-col span="6">
          <span>{{alias==='panduan'?'判断题':'单选题'}}</span>
        </van-col>
        <van-col span="18" class="info-right">
          正确率：<span class="correct">{{correct}}</span>
        </van-col>
      </van-row>
    </div>
    <div class="wrapper">
      <div v-for="(item,key) in record" :key="key">
        <van-row class="item">
          <van-col span="4" class="tc">{{key==='T'?'√':(key==='F'?'×':key)}}</van-col>
          <van-col span="20" class="right">
            <span class="column"  :style="{width:(item.count/count)*100+'%'}" :class="{'right-answer':key==answer}" @click='item.students.length>0?toggleAllCorrec("选"+key+"的学生",item.students):""'></span>
            <span class="column-info">{{item.count}}人</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <student-list :title="popupTitle" :list="popupList" @toggleAllCorrec="toggleAllCorrec" v-if="showAllCorrec"></student-list>
  </div>
</template>

<script>
import getStatistics from '../axios/getQuestionStatistics.js'
import studentList from '../components/studentList.vue'
export default {
  name: 'danxuan',
  data() {
    return {
      params: {
        "course_hour_publish_id": this.$route.params.course_hour_publish_id,
        "course_resource_id": this.$route.params.course_resource_id,
        "qti_question_id": this.$route.params.qti_question_id,
        "dcom_entity_id": this.$route.params.dcom_entity_id,
        "qti_question_sheet": this.$route.params.qti_question_sheet
      },
      allCorrect: {},
      record: [],
      answer: '',
      alias: '',
      correctRate: 0,
      showAllCorrec: false,
      popupTitle: '',
      popupList: []
    }
  },
  created() {
    getStatistics.getinfo(this.params).then((r) => {
      this.allCorrect = r.all_correct;
      this.record = r.record;
      this.answer = r.answer;
      this.correctRate = r.correct_rate
      this.alias = r.alias;
    })
  },
  computed: {
    correct() {
      if (this.correctRate === '') {
        return '--'
      } else {
        return Math.round(this.correctRate * 100) + '%'
      }
    },
    count() {
      let num = 0;
      for (let key in this.record) {
        num += this.record[key].count
      }
      console.log(num)
      return num
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    toggleAllCorrec(title, list) {
      this.showAllCorrec = !this.showAllCorrec
      this.popupTitle = title
      this.popupList = list
    }
  },
  components: {
    studentList
  }
}
</script>

<style scoped>
  .danxuan {
    height: 100vh;
  }

  .danxuan>.title {
    text-align: center;
    line-height: 50px;
    height: 50px;
  }

  .danxuan>.title .back {
    display: inline-block;
    float: left;
  }

  .danxuan>.title .text {
    display: inline-block;
    width: calc(100% - 100px);
    font-weight: 600;
  }

  .danxuan>.title-bar {
    padding: 0 10px;
    line-height: 50px;
    height: 50px;
    box-sizing: border-box;
  }

  .danxuan>.title-bar .info-right {
    text-align: right;
  }

  .danxuan>.title-bar .info-right .correct {
    color: #ff4e00;
  }
   .danxuan .wrapper{
     line-height: 30px;
   }
  .danxuan .wrapper .tc{
    text-align: center;
  }
   .danxuan .wrapper .item{
     height: 40px;
   }
   .danxuan .wrapper .right{
     display: flex;
   }
  .danxuan .wrapper .column{
    display: inline-block;
    max-width: 80%;
    min-width: 5px;
    height: 30px;
    background: #f56956;
  }
  .danxuan .wrapper .column.right-answer{
    background: #34c988;
  }
  .danxuan .wrapper .column-info{
    vertical-align: middle;
    margin-left: 5px;
  }
</style>
