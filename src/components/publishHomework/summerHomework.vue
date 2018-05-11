<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>暑假作业</h1>
      <i class="cubeic-back" @click="goChooseTextbook">返回</i>
    </header>

    <!-- <van-checkbox v-model="checked">复选框</van-checkbox> -->

    <!-- <van-checkbox-group v-model="result" @change="checkboxChange">
      <van-cell-group>
        <van-cell v-for="(item, index) in lists" :title="`${item.name}-共${item.qti_num}题`" :key="index">
          <van-checkbox :name="item"/>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group> -->

    <div style="line-height:24px;background-color:#fff;padding:10px 15px;font-size:14px;" v-for="(item, index) in lists" :key="index">
      <div style="float:left;" @click="clickCell">{{item.name}}-共{{item.qti_num}}题</div>
      <div style="float:right;">
        <input type="checkbox" style="width:18px;height:18px;" :name="item.name" :id="item.resource_id" :value="item.qti_num" @click="checkboxChange">
      </div>
      <div style="clear:both;"></div>
    </div>

    <div style="position:absolute;bottom:0px;background: transparent;border:1px solid rgb(102, 102, 102); background-color: rgba(102, 102, 102, 1);" class="cube-btn">
      <div style="float:left;font-size:13px;">已选试卷{{hasChoosePagesNum}}份，共{{hasChooseProblemsNum}}道题</div>
      <div style="background-color:rgba(22, 155, 213, 1);width:59px;height:22px;line-height:22px;font-size:13px;float:right;border-radius:5px;" @click="clickPublish">布&nbsp;&nbsp;&nbsp;&nbsp;置</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "publishHomework",
  data() {
    return {
      checkList: [],
      lists: [],
      result: [],
      hasChoosePagesNum: 0,
      hasChooseProblemsNum: 0,
      checked: true,
      hasChoosePagesNumArray: []
    };
  },
  computed: {},
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
  },
  mounted: function() {
    this.getList();
  },
  methods: {
    goChooseTextbook() {
      this.$router.push({
        path: "/chooseTextbook"
      });
    },
    clickPublish() {
      if (this.hasChoosePagesNum == 0) {
        this.$toast({
          message: "请选择试卷！",
          duration: 1000
        });
        return;
      }
      var result = [];
      for (var i = 0; i < this.hasChoosePagesNumArray.length; i++) {
        result.push({
          name: this.hasChoosePagesNumArray[i].name,
          resource_id: this.hasChoosePagesNumArray[i].id
        });
      }
      this.result = result;
      this.$store.dispatch("setChooseSummerHomework", this.result);
      this.$router.push({
        path: "/homeworkPublishSetting"
      });
    },
    checkboxChange() {
      var inputArray = document.getElementsByTagName("input");
      this.hasChoosePagesNumArray = [];
      this.hasChooseProblemsNum = 0;
      for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i].checked) {
          this.hasChoosePagesNumArray.push(inputArray[i]);
        }
      }
      this.hasChoosePagesNum = this.hasChoosePagesNumArray.length;
      for (let i = 0; i < this.hasChoosePagesNumArray.length; i++) {
        this.hasChooseProblemsNum += Number(
          this.hasChoosePagesNumArray[i].value
        );
      }
      // var array = this.result;
      // this.hasChoosePagesNum = array.length;
      // this.hasChooseProblemsNum = 0;
      // for (let i = 0; i < array.length; i++) {
      //   this.hasChooseProblemsNum += Number(array[i].qti_num);
      // }
    },
    clickTab(name) {
      this.activeTabName = name;
    },
    clickSelectAll() {
      this.checkList = [];
      var array = this.options;
      for (let i = 0; i < array.length; i++) {
        this.checkList.push(array[i].value);
      }
    },
    getList: function(value) {
      var self = this;
      var url = "jwt/resource/package/getResourceLists?";
      var data = {
        user_id: this.userInfo.userid,
        pack_id: "9002511525420500001"
      };
      self.$http
        .get(url, { params: data })
        .then(function(response) {
          if (response.data.msg === "ok") {
            self.lists = response.data.recordset.lists;
          } else {
            console.log(response);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    clickCell() {
      // debugger
      // event.stopPropagation();
      this.$router.push({
        path: "/examExercise"
      });
    }
  }
};
</script>

<style scoped>
.activeTabClass {
  color: #fc9153;
}
</style>
