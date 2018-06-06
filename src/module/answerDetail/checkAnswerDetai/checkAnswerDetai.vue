<template>
  <div class="cube-page cube-view button-view">

    <div v-if="!switchStudentShow">
      <header class="header">
        <h1 @click="clickSwitchStudent">{{studentOneDetail.real_name}}（{{studentOneDetail.num}}/{{studentListArray.length}}）<i class="fa fa-sort-down"></i></h1>
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
      <studentAnswer v-if="activeBtn === 'studentAnswer'" :answerInfo="answerInfo"></studentAnswer>
      <studentMutualComments v-if="activeBtn === 'studentMutualComments'" :listObj="listObj"></studentMutualComments>
    </div>

    <div v-if="switchStudentShow">
      <header class="header">
        <h1>切换学生</h1>
        <i class="cubeic-back" @click="goCorrectTheSubject"><i class="fa fa-angle-left"></i></i>
      </header>
      <div>
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

    <div class="publish-homework-btn-div" style="bottom: 200px;" @click="goOnepage">
      <div class="publish-homework-btn">
        <img src="@/assets/images/answerDetail/onePen.png" alt="画笔">
      </div>
    </div>

    <div class="publish-homework-btn-div" style="bottom: 110px;" @click="correctIdeaBtn">
      <div class="publish-homework-btn">
        <img src="@/assets/images/answerDetail/note.png" alt="批改意见">
      </div>
    </div>

    <div class="publish-homework-btn-div" @click="shareClassBtn">
      <div class="publish-homework-btn">
        <img src="@/assets/images/answerDetail/share.png" alt="分享班级">
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import api from "@/module/answerDetail/axios/checkAnswerDetai.js";
import studentAnswer from "@/components/common/studentAnswer.vue";
import studentMutualComments from "@/components/common/studentMutualComments.vue";

export default {
  name: "checkAnswerDetai",
  components: {
    studentMutualComments,
    studentAnswer
  },
  data() {
    return {
      listObj: {},
      activeBtn: "studentAnswer",
      answerInfo: {},
      listContainerStyle: {
        height: window.innerHeight - 50 + 'px'
      },
      studentListArray: [],
      studentAllInfo: {},
      switchStudentShow: false,
      studentOneDetail: {},
      studentAnswerDetailData: this.$store.state.answerDetail.studentAnswerDetailData
    };
  },
  computed: {
    ...mapGetters({
      env: 'runEnv/old'
    })
  },
  mounted: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.homeworkOneListInfoObj = this.$store.state.homework.homeworkOneListInfoObj;
    this.studentList = this.$store.state.homeworkDetail.homeworkInfo.student_list;
    // console.log(this.studentAnswerDetailData)
    this.formatStudentList();
    this.getStudentAnswerList();
    this.getStudentMutualCommentsList();
  },
  methods: {
    goHomework() {
      this.$router.go(-1);
    },
    goOnepage() {
      this.$router.push({
        name: "onePenPage",
        params: {
          studentAnswerDetailData: this.studentAnswerDetailData
        }
      });
    },
    clickSwitchStudent() {
      this.switchStudentShow = !this.switchStudentShow;
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
      for (let i = 0; i < this.studentListArray.length; i++) {
        this.studentListArray[i].num = i + 1;
      }
      this.studentOneDetail = this.studentListArray[0];
    },
    getStudentMutualCommentsList: function() {
      var self = this;
      var data = {
        publish_id: self.studentAnswerDetailData.course_hour_publish_id,
        view_userid: self.userInfo.userid,
        course_resource_id: self.studentAnswerDetailData.course_resource_id,
        qti_question_id: self.studentAnswerDetailData.source_pk_id,
        user_id: self.studentOneDetail.userid,
        page: '1',
        perpage: '999'
      };
      api.studentMutualCommentsGetLists(data).then(
        response => {
          const listObj = response;
          var array = listObj.lists;
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
    goCorrectTheSubject() {
      this.switchStudentShow = false;
    },
    clickStudent(item) {
      this.switchStudentShow = false;
      this.studentOneDetail = item;
      this.getStudentAnswerList();
      this.getStudentMutualCommentsList();
    },
    getStudentAnswerList: function(value) {
      var self = this;
      var data = {
        publish_id: self.studentAnswerDetailData.course_hour_publish_id,
        course_resource_id: self.studentAnswerDetailData.course_resource_id,
        dcom_entity_id: self.studentAnswerDetailData.dcom_entity_id,
        source_pk_id: self.studentAnswerDetailData.source_pk_id,
        user_id: self.studentOneDetail.userid,
        icom_id: self.studentAnswerDetailData.icom_id,
        dcom_id: self.studentAnswerDetailData.dcom_id
      };
      api.getUserAnswerForMiniRs(data).then(
        response => {
          self.studentAllInfo = response;
          var answerObj = response.answer[0].answer_detail;
          if (answerObj.images[0] && answerObj.images.length > 0) {
            var arrayImages = [];
            var array = answerObj.images;
            for (let i = 0; i < answerObj.images.length; i++) {
              var element = answerObj.images[i];
              if (element.indexOf('http://') === -1) {
                element = self.env + element
                arrayImages.push(element);
              }
            }
            answerObj.images = arrayImages;
          };

          if (answerObj.video[0] && answerObj.video[0].length > 0) {
            var arrayVideo = [];
            var array2 = answerObj.video[0];
            for (let i = 0; i < array2.length; i++) {
              var element2 = array2[i];
              if (element2 && element2.indexOf('http://') === -1) {
                element2 = self.env + element2
                arrayVideo.push(element2);
              }
            }
            answerObj.video = arrayVideo;
          };

          if (answerObj.audio[0] && answerObj.audio[0].length > 0) {
            var arrayAudio = [];
            var array3 = answerObj.audio[0];
            for (let i = 0; i < array3.length; i++) {
              var element3 = array3[i];
              if (element3 && element3.indexOf('http://') === -1) {
                element3 = self.env + element3
                arrayAudio.push(element3);
              }
            }
            answerObj.audio = arrayAudio;
          };
          self.answerInfo = answerObj;
        },
        err => {
          console.log(err);
          self.$toast("网络异常");
        }
      );
    },
    shareClassBtn() {
      this.$router.push({
        name: "share",
        params: {
          classId: this.studentAllInfo.class_id,
          answer: this.studentAllInfo.answer,
          studentInfo: this.studentAllInfo
        }
      });
    },
    correctIdeaBtn() {
      this.$router.push({
        name: "correctIdea",
        params: {
          studentInfo: this.studentOneDetail
        }
      });
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
.publish-homework-btn-div {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.publish-homework-btn {
  height: 60px;
  width: 60px;
}
.publish-homework-btn img{
  width: 100%;
}
</style>
