<template>
  <div class="cube-page cube-view button-view">

    <header class="header">
      <h1>
        <i class="cubeic-back" @click="goBatchEvaluate">
          <i class="fa fa-angle-left back-up-arrow"></i><span class="back-up-text">返回</span>
        </i>
        <div>
          分享到班级空间
        </div>
        <div style="position: absolute; right: 10px; top: 0; height: 45px;" @click="clickShareBtn">
          <!-- <img style="vertical-align: middle;width: 28px;" src="@/assets/images/batchEvaluate/voicePng.png" alt=""> -->
          分享
        </div>
      </h1>
    </header>

    <van-cell-group>
      <van-field v-model="comment" type="textarea" placeholder="说点儿什么吧" rows="3"/>
    </van-cell-group>

    <div class="noticeWordNum">
      <div style="float: left;">还可以输入<span style="color: #f7af6c">{{120 - comment.length}}</span>字</div>
      <div style="float: right;" @click="clearTextArea">清空</div>
    </div>

    <div>
      <div style="margin-bottom: 10px;">
        火锅的答案：
      </div>
      <div style="background-color: #fff;padding: 5px 10px;">
        创建主观题
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/module/homework/axios/shareClasses.js";

export default {
  name: "shareClasses",
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
    this.getTemplateList();
  },
  watch: {
    comment: function(val, oldVal) {
      if (val.length > 120) {
        this.comment = this.comment.slice(0, 120);
      }
    }
  },
  methods: {
    goBatchEvaluate() {
      this.$router.push({
        path: "/batchEvaluate"
      });
    },
    clickShareBtn() {
      var self = this;
      var classIds = "";
      var classIdArray = self.account.userInfo.classes;
      for (let i = 0; i < classIdArray.length; i++) {
        if (i + 1 === classIdArray.length) {
          classIds += classIdArray[i].class_id;
        } else {
          classIds += classIdArray[i].class_id + ",";
        }
      }
      var data = {
        user_id: self.account.userInfo.userid,
        class_id: classIds,
        title: '',
        content: '',
        share_param: ''
      };

      api.shareClassesApi(data).then(function(response) {
        self.templateLists = response;
      });
    },
    clearTextArea() {
      this.comment = "";
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
