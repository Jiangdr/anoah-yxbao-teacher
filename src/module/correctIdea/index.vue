<template>
  <div class="cube-page cube-view button-view">

    <header class="header">
      <h1>
        <i class="cubeic-back" @click="goBatchEvaluate">
          <i class="fa fa-angle-left back-up-arrow"></i><span class="back-up-text"></span>
        </i>
        <div>
          本题批改意见
        </div>
      </h1>
    </header>

    <van-cell-group>
      <van-field v-model="comment" type="textarea" placeholder="输入评语内容" rows="3"/>
    </van-cell-group>

    <div class="noticeWordNum">
      <div style="float: left;">还可以输入<span style="color: #f7af6c">{{50 - comment.length}}</span>字</div>
      <div style="float: right;" @click="clearTextArea">清空</div>
    </div>

    <div style="background: #fff;height: 35px;line-height: 35px;padding: 5px 10px;border-bottom: 1px solid rgb(204, 204, 204);">
      <div style="float: left;">评语模板</div>
      <div style="float: right;color: #2ec2a9;" @click="goAddComments">添加评语</div>
      <div style="float: right;color: #2ec2a9;margin-right:10px;" @click="goEditComments">编辑模板</div>
      <div style="clear: both;"></div>
    </div>

    <div style="background: #fff;">
      <div class="listContainer" v-bind:style="listContainerStyle">
        <div class="templateList" v-for="(item, index) in templateLists" :key="index" @click="chooseTemplate(item)">{{item.comment}}</div>
      </div>
    </div>

    <div class="comfirmBtnContainer">
      <div class="comfirmBtn" :outline="true" @click="sureBtn">确认</div>
    </div>

    <van-popup v-model="showVoicePopup" position="bottom" :overlay="true">
      <div class="van-picker">
        <div class="van-hairline--top-bottom van-picker__toolbar">
          <div @click="clickVoiceChoose('cancel')" class="van-picker__cancel">取消</div>
          <div @click="clickVoiceChoose('sure')" class="van-picker__confirm">确认</div>
        </div>
        <div class="van-picker__columns" style="height: 220px;">
          <div class="van-picker-column" style="height: 220px;display: flex;align-items: center;justify-content: center;">
            <div @click="clickRecordBtn">

              <div class="circleNoRotate" v-show="!isRecording">
                <div class="circleNoRotate-div">
                  <img style="width: 50%;" src="@/assets/images/batchEvaluate/voiceBtn.png" alt="voiceBtn">
                </div>
              </div>
              <div class="spinner" v-show="isRecording"></div>
              <div style="margin-top: 10px;" v-show="!isRecording">点击开始录音</div>
              <div style="margin-top: 10px;" v-show="isRecording">正在录音...</div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import api from './axios/correctIdea.js'

export default {
  name: "correctIdea",
  data() {
    return {
      listContainerStyle: {
        height: window.innerHeight - 300 + "px"
      },
      rateType: "",
      comment: "",
      checkBoxGroup: [],
      templateLists: [],
      showVoicePopup: false,
      countNum: 3,
      isRecording: false
    };
  },
  mounted: function() {
    this.account = this.$store.state.account;
    this.studentAnswerDetailData = this.$store.state.answerDetail.studentAnswerDetailData;
    this.studentInfo = this.$route.params.studentInfo
    this.getTemplateList();
  },
  watch: {
    comment: function(val, oldVal) {
      if (val.length > 50) {
        this.comment = this.comment.slice(0, 50);
      }
    }
  },
  methods: {
    goBatchEvaluate() {
      this.$router.go(-1);
    },
    goAddComments() {
      this.$store.dispatch("batchEvaluateCommentsTemplateType", 2);
      this.$router.push({
        path: "/addComments"
      });
    },
    goEditComments() {
      this.$store.dispatch("batchEvaluateCommentsTemplateType", 2);
      this.$router.push({
        path: "/editComments"
      });
    },
    clickVoiceShow() {
      this.isRecording = false;
      this.showVoicePopup = true;
    },
    clickRecordBtn() {
      this.isRecording = true;
    },
    afteruploadsucc(msg) {
      alert(JSON.stringify(msg))
    },
    clickVoiceChoose(type) {
      this.showVoicePopup = false;
      if (type === 'sure') {
        var param = [this.account.userInfo.userid, this.account.jwt.jwt, 'http://api2.dev.anoah.com/jwt/homework/correct/upload_auth', "['file:///storage/emulated/0/ddmsrec.mp4']"];
        window.appPlug.aliUpLoad(param, function(msg) { alert(JSON.stringify(msg)) }, function(msg) { alert(msg) });
      }
    },
    getTemplateList() {
      var self = this;
      var data = {
        user_id: self.account.userInfo.userid,
        type: 2
      };

      api.commentplGetList(data).then(function(response) {
        self.templateLists = response;
      });
    },
    clearTextArea() {
      this.comment = "";
    },
    sureBtn() {
      var self = this;
      var data = {
        teacher_id: self.account.userInfo.userid,
        student_id: '',
        comment: self.comment,
        audio_ids: '',
        publish_id: self.studentAnswerDetailData.course_hour_publish_id,
        user_id: self.studentInfo.userid
      };

      api.commentplGetList(data).then(function(response) {
        self.$toast({
          message: "批改意见保存成功！",
          duration: 750
        });
        self.$router.push({
          name: "checkAnswerDetai"
        });
      });
    },
    chooseTemplate(item) {
      this.comment = item.comment;
    }
  }
};
</script>

<style scoped lang="scss">
$primary-color: #08b783;
$active-color: #13d098;
$border-state: 1px solid rgb(234, 237, 240);
@import "@/style/variable.scss";
.activeTab {
  background-color: #2ec2a9;
  color: #fff;
}
.noticeWordNum {
  background: rgb(255, 255, 255);
  border-top: 1px solid rgb(204, 204, 204);
  height: 35px;
  line-height: 35px;
  padding: 5px 10px;
  color: rgb(204, 204, 204);
  margin-bottom: 10px;
}
.templateList {
  background: #fff;
  height: 35px;
  line-height: 35px;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.listContainer {
  padding: 0 10px;
  overflow-y: auto;
}
.comfirmBtnContainer {
  background-color: #ffffff;
  width: 100%;
  height: $bottom-height;
  bottom: 0px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
.comfirmBtn {
  height: 54px;
  line-height: 54px;
  width: 50%;
  border-radius: $bottom-btn-radius;
  background-color: $primary-color;
  font-size: $bottom-btn-font-size;
  text-align: center;
  color: #fff;
}
.comfirmBtn:active {
  background-color: $active-color;
}
.circleNoRotate {
  border: 1px solid #13d098;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner {
  width: 120px;
  height: 120px;
  background-color: #13d098;
  border-radius: 100%;
  -webkit-animation: scaleout 1.3s infinite ease-in-out;
  animation: scaleout 1.3s infinite ease-in-out;
}
@-webkit-keyframes scaleout {
  0% { -webkit-transform: scale(0.0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
@keyframes scaleout {
  0% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 100% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
.circleNoRotate-div {
  background-color: #13d098;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
