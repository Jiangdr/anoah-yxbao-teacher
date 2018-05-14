<template>
  <div class="wanxing">
    <div class="title border-bottom-1px">
      <van-row>
        <van-col span="2">
          <span class="back" @click="goBack">
                <van-icon name='arrow-left'></van-icon>
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
          <span>{{alias==="cloze"?'完型填空':'客观填空'}}</span>
        </van-col>
        <van-col span="18" class="info-right">
          正确率：<span class="correct">{{correct}}</span> <span @click="allCorrect.count>0?toggleAllCorrec('全对的学生',allCorrect.students):''"> 全对：{{allCorrect.count}}人</span>
        </van-col>
      </van-row>
    </div>
    <div class="statlist">
      <div class="quelist" v-for="(que,index) in record" :key="index">
        <span>({{index+1}})</span>
        <span v-for="(item,key) in que.record" :key="key" v-if="key!=='noanswer'" :class="{right:key==que.answer}" @click="item.count>0?toggleAllCorrec('选'+key+'的学生',item.students):''">
          {{item.count}}<br>{{key}}
        </span>
        <span @click="que.record.noanswer.count>0?toggleAllCorrec('未答的学生',que.record.noanswer.students):''">
          {{que.record.noanswer?que.record.noanswer.count:'0'}}
          <br>未答
        </span>
      </div>
    </div>
    <student-list :title="popupTitle" :list="popupList" @toggleAllCorrec="toggleAllCorrec" v-if="showAllCorrec"></student-list>
  </div>
</template>

<script>
import getStatistics from '../axios/getQuestionStatistics.js'
import studentList from '../components/studentList.vue'
export default {
  name: 'wanxing',
  data() {
    return {
      params: {
        "course_hour_publish_id": this.$route.params.publishId,
        "course_resource_id": this.$route.params.resourceId,
        "qti_question_id": this.$route.params.questionId,
        "dcom_entity_id": this.$route.params.dcom_entity_id,
        "qti_question_sheet": this.$route.params.qti_question_sheet
      },
      allCorrect: {},
      record: [],
      alias: '',
      correctRate: '',
      showAllCorrec: false,
      popupTitle: '',
      popupList: []
    }
  },
  created() {
    getStatistics.getinfo(this.params).then((r) => {
      this.allCorrect = r.all_correct;
      this.record = r.record;
      this.alias = r.alias;
      this.correctRate = r.correct_rate;
    })
  },
  computed: {
    correct() {
      if (this.correctRate === '') {
        return '--'
      } else {
        return Math.round(this.correctRate * 100) + '%'
      }
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
  .wanxing {
    height: 100vh;
  }

  .wanxing>.title {
    text-align: center;
    line-height: 50px;
    height: 50px;
  }

  .wanxing>.title .back {
    display: inline-block;
    float: left;
  }

  .wanxing>.title .text {
    display: inline-block;
    width: calc(100% - 100px);
    font-weight: 600;
  }

  .wanxing>.title-bar {
    padding: 0 10px;
    line-height: 50px;
    height: 50px;
    box-sizing: border-box;
  }

  .wanxing>.title-bar .info-right {
    text-align: right;
  }

  .wanxing>.title-bar .info-right .correct {
    color: #ff4e00;
  }

  .wanxing>.statlist {
    height: calc(100vh - 100px);
    line-height: 40px;
    text-align: center;
    overflow: scroll;
  }
.wanxing>.statlist .quelist{
  display: flex;
  border:1px solid #eaeaea;
  border-bottom: none;
}
.wanxing>.statlist .quelist:last-child{
  border-bottom: 1px solid #eaeaea;
}
.wanxing>.statlist .quelist span{
  width:80px;
  flex: 1 1 auto;
  border-right: 1px solid #eaeaea;
  line-height: 20px;
  padding:5px 0;
}
.wanxing>.statlist .quelist span.right{
  background:#afe9d0
}
.wanxing>.statlist .quelist span:first-child{
  line-height: 40px;
}
.wanxing>.statlist .quelist span:last-child{
  border-right: none;
}
</style>
