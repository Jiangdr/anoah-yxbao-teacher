<template>
  <div class="cube-page cube-view button-view" style="background-color: #fff;">
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
            <YxCheckBox class="checkbox" :selected="item.isSel" :ref="'cb-'+item.resource_id" @select="checkboxChange(item,$event)"></YxCheckBox>
          </div>
        </van-list>
        <div v-if="lists.length==0" class="text-font">
          暂无内容
        </div>
       </van-pull-refresh>

    <div v-if="this.hasChoosePagesNumArray.length !== 0" class="footer-container">
      <p class="footer-p">已选试卷<span>{{hasChoosePagesNumArray.length}}</span>份，共<span>{{hasChooseProblemsNum}}</span>道题</p>
      <div class="yx-green-btn buzhi-div"  @click="clickPublish">布&nbsp;&nbsp;&nbsp;&nbsp;置</div>
    </div>
  </div>
</template>

<script>
import api from "@/module/homework/axios/publishHomeWork.js";
import YxCheckBox from "@/components/common/yx-check-box.vue";

export default {
  name: "publishHomework",
  components: { YxCheckBox },
  data() {
    return {
      checkList: [],
      lists: [],
      result: [],
      hasChooseProblemsNum: 0,
      olded: false,
      pullRefresIsLoading: false,
      pullRefresh: false,
      hasChoosePagesNumArray: [],
      loading: false,
      finished: false,
      noMore: true,
      page: 0
    };
  },
  computed: {},
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.chooseTextBookObj = this.$store.state.homework.chooseTextBookObj;
    this.summerHomeworkPackId = this.$store.state.homework.summerHomeworkPackId;
    this.olded = this.$store.state.homework.isOldPackId === "1";
    if (this.$store.state.homework.hasChoosePagesArray.length > 0) {
      this.hasChoosePagesNumArray = JSON.parse(
        JSON.stringify(this.$store.state.homework.hasChoosePagesArray)
      );
    }
  },
  mounted: function() {
    this.getList();
    this.hasChoosePagesNumArray.forEach(element => {
      this.hasChooseProblemsNum =
        parseInt(this.hasChooseProblemsNum) + parseInt(element.qti_num);
    });
  },
  methods: {
    goPublishHomework() {
      this.$store.dispatch("hasChoosePagesArray", this.hasChoosePagesNumArray);
      this.$store.dispatch("isOldPackId", "1");
      this.$router.push({
        path: "/publishHomework"
      });
    },
    clickPublish() {
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
      if (event.selecteState) {
        this.hasChoosePagesNumArray.push(item);
        this.hasChooseProblemsNum =
          parseInt(this.hasChooseProblemsNum) + parseInt(item.qti_num);
      } else {
        this.hasChoosePagesNumArray.splice(
          this.hasChoosePagesNumArray.indexOf(item),
          1
        );
        this.hasChooseProblemsNum =
          parseInt(this.hasChooseProblemsNum) - parseInt(item.qti_num);
      }
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
                let arr = self.$refs["cb-" + element.resource_id];
                if (arr && arr.length > 0) {
                  arr[0].selecteState = true;
                }
              } else if (!self.olded) {
                self.hasChoosePagesNumArray.push(element);
                self.hasChooseProblemsNum =
                  parseInt(self.hasChooseProblemsNum) +
                  parseInt(element.qti_num);
                element.isSel = true;
                let arr = self.$refs["cb-" + element.resource_id];
                if (arr && arr.length > 0) {
                  arr[0].selecteState = true;
                }
              }
              self.lists.push(element);
            });
          }
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
    clickTiltleName(item) {
      this.$store.dispatch("chooseExamExerciseQtiIdsArray", item.qti_ids);
      this.$router.push({
        path: "/examExercise"
      });
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
