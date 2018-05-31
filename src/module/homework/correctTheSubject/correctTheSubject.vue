<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1 @click="clickSwitchStudent">{{studentListArray.length > 0 ? '有学生' : '无学生'}}（1/{{studentListArray.length}}）<i class="fa fa-sort-down"></i></h1>
      <i class="cubeic-back" @click="goHomework"><i class="fa fa-angle-left"></i></i>
    </header>
    <!-- 学生答案 学生互评tab -->
    <div class="btns van-hairline--surround">
      <van-row>
        <van-col span="12" :class="{'active':activeBtn=='studentAnswer'}">
          <span @click="toggleContent('studentAnswer')">学生答案</span>
          </van-col>
          <van-col span="12" class="student" :class="{'active':activeBtn=='studentMutualComments'}">
            <span @click="toggleContent('studentMutualComments')">学生互评</span>
          </van-col>
      </van-row>
    </div>
    <studentAnswer v-show="activeBtn === 'studentAnswer'" :answerList="answerList"></studentAnswer>
    <studentMutualComments v-show="activeBtn === 'studentMutualComments'" :listObj="listObj"></studentMutualComments>
  </div>
</template>

<script>
import api from "@/module/homework/axios/correctTheSubject.js";
import studentAnswer from "@/components/common/studentAnswer.vue";
import studentMutualComments from "@/components/common/studentMutualComments.vue";
import {mapGetters} from 'vuex'

export default {
  name: "correctTheSubject",
  components: {
    studentMutualComments,
    studentAnswer
  },
  data() {
    return {
      listObj: {},
      activeBtn: "studentAnswer",
      answerList: [],
      listContainerStyle: {
        height: window.innerHeight - 50 + 'px'
      },
      studentListArray: []
    };
  },
  computed: {
    ...mapGetters({
      env: 'runEnv/old'
    })
  },
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.homeworkOneListInfoObj = this.$store.state.homework.homeworkOneListInfoObj;
    this.studentList = this.$store.state.homeworkDetail.homeworkInfo.student_list;
    this.getStudentAnswerList();
    this.getStudentMutualCommentsList();
    this.formatStudentList();
  },
  methods: {
    goHomework() {
      this.$router.push({
        path: "/homework"
      });
    },
    clickSwitchStudent() {
      this.$router.push({
        path: "/switchStudent"
      });
    },
    toggleContent(items) {
      this.activeBtn = items;
    },
    formatStudentList() {
      const array = this.studentList;
      this.studentListArray = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i].status > 0) {
          this.studentListArray.push(array[i]);
        }
      }
    },
    getStudentMutualCommentsList: function() {
      var self = this;
      var data = {
        publish_id: '309002511527229000001f',
        view_userid: self.userInfo.userid,
        course_resource_id: '9002511527228900001',
        qti_question_id: '9002511502880300001',
        user_id: '1024625',
        page: '1',
        perpage: '5'
      };
      api.studentMutualCommentsGetLists(data).then(
        response => {
          const listObj = response;
          var array = response.lists;
          array.forEach(element => {
            element.rank = Number(element.rank);
            if (element.avatar.indexOf('http://') === -1) {
              element.avatar = self.env + element.avatar
            }
          });
          listObj.score = Math.round(Number(listObj.score))
          listObj.lists = array;
          listObj.studentsNum = listObj.lists.length;
          self.listObj = listObj;
        },
        err => {
          console.log(err);
          self.$toast("网络异常");
        }
      );
    },
    getStudentAnswerList: function(value) {
      var self = this;
      var data = {
        publish_id: '309002511527229000001f',
        course_resource_id: '9002511527228900001',
        dcom_entity_id: 0,
        source_pk_id: '9002511502880300001',
        user_id: '1024626',
        icom_id: 4629,
        dcom_id: ''
      };
      api.getUserAnswerForMiniRs(data).then(
        response => {
          self.answerList = response.answer;
        },
        err => {
          console.log(err);
          self.$toast("网络异常");
        }
      );
    }
  }
};
</script>

<style scoped>
.activeTabClass {
  color: #2ec2a9;
}
.btns {
  line-height: 44px;
  height: 44px;
  box-sizing: border-box;
  text-align: center;
}
.btns .active span{
  color: #08b783;
  border-bottom:2px solid #08b783;
}
.btns span {
  display: inline-block;
  height: 42px;
  border-bottom: 2px solid transparent;
}
</style>
