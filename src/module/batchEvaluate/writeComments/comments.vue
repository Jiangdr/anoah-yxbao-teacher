<template>
  <div class="cube-page cube-view button-view">

    <header class="header">
      <h1>批量写评语</h1>
      <i class="cubeic-back" @click="goBatchEvaluate">
        <i class="fa fa-angle-left back-up-arrow"></i><span class="back-up-text">返回</span>
      </i>
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
  </div>
</template>

<script>
import api from "@/module/batchEvaluate/axios/batchEvaluate.js";

export default {
  name: "comments",
  data() {
    return {
      listContainerStyle: {
        height: window.innerHeight - 300 + "px"
      },
      rateType: "",
      comment: "",
      checkBoxGroup: [],
      templateLists: []
    };
  },
  mounted: function() {
    this.userInfo = this.$store.state.account.userInfo;
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
      this.$router.push({
        path: "/batchEvaluate"
      });
    },
    goAddComments() {
      this.$store.dispatch("batchEvaluateCommentsTemplateType", 1);
      this.$router.push({
        path: "/addComments"
      });
    },
    goEditComments() {
      this.$store.dispatch("batchEvaluateCommentsTemplateType", 1);
      this.$router.push({
        path: "/editComments"
      });
    },
    writeComments() {
      if (this.checkBoxGroup.length === 0) {
        this.$toast({
          message: "请选择学生！",
          duration: 750
        });
        return;
      }
      this.$store.dispatch(
        "chooseBatchEvaluateStudentsArray",
        this.checkBoxGroup
      );
      this.$router.push({
        path: "/comments"
      });
    },
    getTemplateList() {
      var self = this;
      var data = {
        user_id: self.userInfo.userid,
        type: 1
      };

      api.commentplGetList(data).then(function(response) {
        self.templateLists = response;
      });
    },
    clearTextArea() {
      this.comment = "";
    },
    sureBtn() {

    },
    chooseTemplate(item) {
      this.comment = item.comment
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
  text-overflow:ellipsis;
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
</style>
