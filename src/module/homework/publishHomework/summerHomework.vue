<template>
  <div class="cube-page cube-view button-view" style="background-color: #fff;height:100%">
    <div v-show="!examExerciseShow">
      <header class="header">
        <h1>暑假作业</h1>
        <i class="cubeic-back" @click="goPublishHomework"><i class="fa fa-angle-left back-up-arrow"></i> </i>
        <p class="select-all-p" @click="selectAll">{{hasChoosePagesNumArray.length==lists.length?'取消全选':'全选'}}</p>
      </header>

      <van-pull-refresh :class="{listdiv:this.hasChoosePagesNumArray.length === 0,listfooterdiv:this.hasChoosePagesNumArray.length !== 0}" style="overflow-y: auto;" v-model="pullRefresIsLoading" @refresh="onRefresh">
        <van-list v-model="loading" loading-text="加载中。。。" :finished="finished" @load="loadMore" :offset="100" :immediate-check="false">
          <div class="list-item" v-for="(item, index) in lists" :key="index">
            <div style="float:left;margin-top: 3vw;" @click="clickTiltleName(item)">
                <p>{{(index+1)+"."+item.name}}</p>
                <p class="des-item">共<span>{{item.qti_num}}</span>道题</p>
            </div>
            <YxCheckBox class="checkbox" :selected="item.isSel" :ref="'cb-'+index" @select="checkboxChange(item,$event)"></YxCheckBox>
          </div>
        </van-list>
        <div v-if="lists.length==0" class="text-font">
          暂无内容
        </div>
      </van-pull-refresh>
    </div>

    <div v-show="examExerciseShow">
      <header class="header">
        <h1>试卷</h1>
        <i class="cubeic-back" @click="goSummerHomework"><i class="fa fa-angle-left"></i> 返回</i>
      </header>
      <div style="overflow-y:auto;overflow-x:hidden;" v-bind:style="listContainerStyle">
        <div style="padding: 5px 10px;height: 25px; line-height: 25px;">全部题目（{{setting.length}}）</div>
        <div v-for="(item, index) in setting" :key="index" style="position: relative;">
          <Qti :setting="item"></Qti>
          <exerciseCheckBox style="position: absolute;right:10px;bottom:10px;width: 25px;height: 25px;" class="checkbox" :selected="item.isSel" :ref="'cb-'+item.qid" @select="exerciseCheckboxChange(item,$event)"></exerciseCheckBox>
        </div>
      </div>
    </div>

    <div v-if="this.hasChoosePagesNumArray.length !== 0" class="footer-container">
      <p class="footer-p">已选试卷<span>{{hasChoosePagesNumArray.length}}</span>份，共<span>{{hasChooseProblemsNumAtlast}}</span>道题</p>
      <div class="yx-green-btn buzhi-div"  @click="clickPublish">布&nbsp;&nbsp;&nbsp;&nbsp;置</div>
    </div>
  </div>
</template>

<script>
import api from "@/module/homework/axios/publishHomeWork.js";
import YxCheckBox from "@/components/common/yx-check-box.vue";
import exerciseCheckBox from "@/components/common/exercise-check-box.vue";

export default {
  name: "publishHomework",
  components: { YxCheckBox, exerciseCheckBox },
  data() {
    return {
      checkList: [],
      lists: [],
      result: [],
      hasChooseProblemsNum: 0,
      hasChooseProblemsNumAtlast: 0,
      olded: false,
      pullRefresIsLoading: false,
      pullRefresh: false,
      hasChoosePagesNumArray: [],
      loading: false,
      finished: false,
      noMore: true,
      page: 0,
      examExerciseShow: false,
      listContainerStyle: {
        height: window.innerHeight - 115 + "px"
      },
      setting: [],
      currentResourceId: ""
    };
  },
  computed: {},
  activated: function() {
    this.lists.length = 0;
    this.userInfo = this.$store.state.account.userInfo;
    this.chooseTextBookObj = this.$store.state.homework.chooseTextBookObj;
    this.summerHomeworkPackId = this.$store.state.homework.summerHomeworkPackId;
    this.olded = this.$store.state.homework.isOldPackId === "1";
    if (this.$store.state.homework.hasChoosePagesArray.length > 0) {
      this.hasChoosePagesNumArray = JSON.parse(
        JSON.stringify(this.$store.state.homework.hasChoosePagesArray)
      );
    }
    this.qti_ids = this.$store.state.homework.chooseExamExerciseQtiIdsArray;

    this.page = 0;
    this.finished = false;
    this.pullRefresh = true;
    this.getList();
    this.hasChoosePagesNumArray.forEach(element => {
      this.hasChooseProblemsNum =
        parseInt(this.hasChooseProblemsNum) + parseInt(element.qti_num);
    });
  },
  created: function() {},
  mounted: function() {},
  methods: {
    goPublishHomework() {
      this.lists.length = 0;
      this.$store.dispatch("hasChoosePagesArray", this.hasChoosePagesNumArray);
      this.$store.dispatch("isOldPackId", "1");
      this.$router.push({
        path: "/publishHomework"
      });
    },
    goSummerHomework() {
      this.examExerciseShow = false;
    },
    getHasChooseExerciseNum() {
      this.hasChooseProblemsNumAtlast = 0;
      var array = this.hasChoosePagesNumArray;
      for (let i = 0; i < array.length; i++) {
        this.hasChooseProblemsNumAtlast += array[i].qti_ids.length;
      }
    },
    clickPublish() {
      this.lists.length = 0;
      if (this.hasChoosePagesNumArray.length === 0) {
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
          qti_ids: this.hasChoosePagesNumArray[i].qti_ids,
          resource_id: this.hasChoosePagesNumArray[i].resource_id
        });
      }
      this.$store.dispatch("hasChoosePagesArray", []);
      this.$store.dispatch("isOldPackId", "0");
      this.result = result;
      this.$store.dispatch("chooseSummerHomeworkArray", this.result);
      // debugger
      this.$router.push({
        path: "/homeworkPublishSetting"
      });
    },
    selectAll() {
      var self = this;
      if (this.hasChoosePagesNumArray.length === this.lists.length) {
        this.hasChoosePagesNumArray = [];
        this.hasChooseProblemsNum = 0;
        this.lists.forEach(element => {
          self.$refs["cb-" + element.resource_id][0].selecteState = false;
        });
      } else {
        this.lists.forEach(element => {
          if (self.hasChoosePagesNumArray.indexOf(element) < 0) {
            self.hasChoosePagesNumArray.push(element);
            self.hasChooseProblemsNum =
              parseInt(self.hasChooseProblemsNum) + parseInt(element.qti_num);
          }
          self.$refs["cb-" + element.resource_id][0].selecteState = true;
        });
      }
    },
    checkboxChange(item, event) {
      // this.currentResourceId = item.resource_id;
      if (event.selecteState) {
        item.qti_ids = item.allExcerciseArr;
        this.hasChoosePagesNumArray.push(item);
        this.hasChooseProblemsNum =
          parseInt(this.hasChooseProblemsNum) + parseInt(item.qti_num);

        // for (let i = 0; i < this.hasChoosePagesNumArray.length; i++) {
        //   const element = this.hasChoosePagesNumArray[i];
        //   this.setting = [];
        //   this.qtiFun();
        // }
      } else {
        this.hasChoosePagesNumArray.splice(
          this.hasChoosePagesNumArray.indexOf(item),
          1
        );
        this.hasChooseProblemsNum =
          parseInt(this.hasChooseProblemsNum) - parseInt(item.qti_num);
      }
      this.getHasChooseExerciseNum();
    },
    exerciseCheckboxChange(item, event) {
      var array = this.hasChoosePagesNumArray;
      for (let i = 0; i < array.length; i++) {
        if (array[i].resource_id === this.currentResourceId) {
          if (event.selecteState) {
            this.hasChoosePagesNumArray[i].qti_ids.push(item.qid);
            this.hasChooseProblemsNum = parseInt(this.hasChooseProblemsNum) + 1;
          } else {
            this.hasChoosePagesNumArray[i].qti_ids.splice(
              this.hasChoosePagesNumArray[i].qti_ids.indexOf(item.qid),
              1
            );
            this.hasChooseProblemsNum = parseInt(this.hasChooseProblemsNum) - 1;
          }
        }
      }
      this.getHasChooseExerciseNum();
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
    onRefresh() {
      this.page = 0;
      this.finished = false;
      this.pullRefresh = true;
      this.$store.dispatch("hasChoosePagesArray", this.hasChoosePagesNumArray);
      this.$store.dispatch("isOldPackId", "1");
      this.getList();
    },
    loadMore() {
      if (this.noMore) {
        this.loading = false;
      } else {
        this.getList();
      }
    },
    getList: function(value) {
      var self = this;
      self.page++;
      var data = {
        user_id: self.userInfo.userid,
        pack_id: self.summerHomeworkPackId,
        page: self.page,
        per_page: 1000
      };
      api.getResourceLists(data).then(
        success => {
          self.loading = false;
          self.pullRefresIsLoading = false;
          if (self.pullRefresh) {
            self.hasChooseProblemsNum = 0;
            this.olded = this.$store.state.homework.isOldPackId === "1";
            if (self.$store.state.homework.hasChoosePagesArray.length > 0) {
              self.hasChoosePagesNumArray = JSON.parse(
                JSON.stringify(self.$store.state.homework.hasChoosePagesArray)
              );
              self.hasChoosePagesNumArray.forEach(elementnum => {
                self.hasChooseProblemsNum =
                  parseInt(self.hasChooseProblemsNum) +
                  parseInt(elementnum.qti_num);
              });
            } else {
              self.hasChoosePagesNumArray = [];
            }
            self.lists.length = 0;
          }
          self.pullRefresh = false;
          if (success.lists.length < 1) {
            self.noMore = true;
          } else {
            success.lists.forEach(element => {
              if (self.olded && self.isSelect(element)) {
                element.isSel = true;
                let arr = self.$refs["cb-" + self.lists.length];
                if (arr && arr.length > 0) {
                  arr[0].selecteState = true;
                }
              } else if (!self.olded) {
                element.allExcerciseArr = JSON.parse(
                  JSON.stringify(element.qti_ids)
                );
                self.hasChoosePagesNumArray.push(element);
                self.hasChooseProblemsNum =
                  parseInt(self.hasChooseProblemsNum) +
                  parseInt(element.qti_num);
                element.isSel = true;
                let arr = self.$refs["cb-" + self.lists.length];
                if (arr && arr.length > 0) {
                  arr[0].selecteState = true;
                }
              }
              self.lists.push(element);
            });
            console.log(self.lists);
          }
          self.getHasChooseExerciseNum();
        },
        err => {
          console.log(err);
          self.loading = false;
          self.pullRefresIsLoading = false;
          self.pullRefresh = false;
          self.$toast("网络异常");
        }
      );
    },
    isSelect(item) {
      var isContain = false;
      this.hasChoosePagesNumArray.forEach(elements => {
        if (elements.resource_id === item.resource_id) isContain = true;
      });
      return isContain;
    },
    qtiFun() {
      for (var i = 0; i < this.qti_ids.length; i++) {
        this.setting[i] = {
          domain: "e.dev.anoah.com",
          qid: this.qti_ids[i],
          num: i + 1,
          caller: "PREVIEWOR",
          resource_type: "qti_question",
          isSel: true
        };
      }
    },
    clickTiltleName(item) {
      this.setting = [];
      this.examExerciseShow = true;
      this.$store.dispatch("chooseExamExerciseQtiIdsArray", item.qti_ids);
      this.qti_ids = item.allExcerciseArr;
      this.currentResourceId = item.resource_id;
      this.qtiFun();
    }
  }
};
</script>

<style scoped  lang="scss">
@import "@/assets/css/custom.scss";
.listfooterdiv {
  height: calc(100% - #{$header-height} - #{$bottom-height});
}
.listdiv {
  height: calc(100% - #{$header-height});
}
.list-item {
  height: 20vw;
  background-color: #fff;
  margin: 0px 14px;
  font-size: 18px;
  border-bottom: $border-state;
  p {
    @extend .single-line;
    width: 70vw;
    margin: 1.5vw 0;
  }
  .checkbox {
    width: 25px;
    height: 25px;
    float: right;
    top: 7vw;
    border-radius: 20px;
    position: relative;
  }
  .des-item {
    font-size: 16px;
    color: #7f8184;
    padding-left: 4vw;
    padding-top: 1vw;
    span {
      color: #4e4e50;
    }
  }
}
.des-item:active {
  color: $green-primary-color;
}
.select-all-p {
  color: $green-primary-color;
  position: absolute;
  right: 4vw;
  top: 0;
  font-size: 18px;
}
.footer-p {
  @extend .single-line;
  line-height: $bottom-height;
  font-size: 18px;
  display: inline-block;
  padding-left: 14px;
  span {
    color: $orange-active-color;
  }
}
.buzhi-div {
  width: 100px;
  position: absolute;
  top: calc((#{$bottom-height} - 54px) / 2);
  right: 14px;
}
</style>
