·<template>
  <div class="danxuan">
    <div class="title-bar">
      <van-row>
        <van-col span="6">
          <span>{{params.qti_question_type_name||params.name}}</span>
        </van-col>
        <van-col span="18" class="info-right">
          正确率：<span class="correct">{{correct}}</span>
        </van-col>
      </van-row>
    </div>
    <div class="wrapper">
      <div v-for="(item,key) in record" :key="key">
        <van-row class="item">
          <van-col span="4" class="tc">
            {{key==='T'?'√':(key==='F'?'×':(key==='noanswer'?'未答':(alias==='sort'?item.alias:key)))}}
          </van-col>
          <van-col span="20" class="right">
            <span class="column"  :style="{width:(item.count/count)*100+'%'}" :class="{'right-answer':key==answer}" @click='item.students.length>0?toggleAllCorrec("选"+(item.alias||key)+"的学生",item.students):""'></span>
            <span class="column-info">{{item.count}}人</span>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import getStatistics from '../../axios/getQuestionStatistics.js'
// import {mapState} from 'vuex'

export default {
  name: 'danxuan',
  props: ['params'],
  data() {
    return {
      allCorrect: {},
      record: [],
      answer: '',
      alias: '',
      loading: true,
      correctRate: 0,
      showAllCorrec: false,
      popupTitle: '',
      popupList: []
    }
  },
  created() {
    this.getinfo();
  },
  watch: {
    params: 'getinfo'
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
      return num
    }
    // ...mapState({
    //   'params': (state) => state.homeworkDetail.params
    // })
  },
  methods: {
    toggleAllCorrec(title, list) {
      window.bus.$emit('showStudentList', title, list)
    },
    getinfo() {
      let param = {
        "publish_id": this.params.course_hour_publish_id,
        "course_resource_id": this.params.course_resource_id,
        "dcom_entity_id": this.params.dcom_entity_id ? this.params.dcom_entity_id : 0,
        'icom_id': this.params.icom_id,
        "qti_question_id": this.params.source_pk_id,
        "qti_question_sheet": this.params.icom_id === 5019 ? 1 : 0
      }
      getStatistics.getinfo(param).then((r) => {
        this.allCorrect = r.all_correct;
        this.record = r.record;
        this.answer = r.answer;
        this.correctRate = r.correct_rate
        this.alias = r.alias;
        this.loading = false;
      })
    }
  },
  components: {
  }
}
</script>

<style scoped>
  .danxuan {
    height: auto;
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
