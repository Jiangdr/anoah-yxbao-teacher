<template>
  <div class="cube-page cube-view button-view" style="background-color: #fff;">
    <header class="header">
      <h1>暑假作业</h1>
      <i class="cubeic-back" @click="goPublishHomework"><i class="fa fa-angle-left back-up-arrow"></i> </i>
    </header>
    <div :class="{listdiv:this.hasChoosePagesNumArray.length === 0,listfooterdiv:this.hasChoosePagesNumArray.length !== 0}" style="overflow-y: auto;">
        <van-list v-model="loading" loading-text="加载中。。。" :finished="finished" @load="loadMore" :offset="100" :immediate-check="false">
          <div class="list-item" v-for="(item, index) in lists" :key="index">
            <div style="float:left;margin-top: 3vw;" @click="clickTiltleName(item)">
               <p>{{(index+1)+"."+item.name}}</p>
               <p class="des-item">共<span>{{item.qti_num}}</span>道题</p>
            </div>
            <YxCheckBox class="checkbox" :selected="item.isSel" :id="item.resource_id" :value="item.qti_num" @select="checkboxChange(item,$event)"></YxCheckBox>
          </div>
        </van-list>
        <div v-if="lists.length==0" class="text-font" style="height: 200px;line-height: 200px;text-align: center;">
          没有数据
        </div>
    </div>

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
      checked: true,
      hasChoosePagesNumArray: [],
      summerHomeworkSelPageIDs: [],
      loading: false,
      finished: false,
      noMore: false,
      page: 0
    };
  },
  computed: {},
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.chooseTextBookObj = this.$store.state.homework.chooseTextBookObj;
    this.summerHomeworkPackId = this.$store.state.homework.summerHomeworkPackId;
    this.hasChoosePagesNumArray = JSON.parse(JSON.stringify(this.$store.state.homework.summerHomeworkSelPageIDs));
  },
  mounted: function() {
    this.getList();
    this.hasChoosePagesNumArray.forEach(element => {
      this.summerHomeworkSelPageIDs.push(element.resource_id);
      this.hasChooseProblemsNum =
        parseInt(this.hasChooseProblemsNum) + parseInt(element.qti_num);
    });
  },
  methods: {
    goPublishHomework() {
      this.$store.dispatch("summerHomeworkSelPageIDs", this.hasChoosePagesNumArray);
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
          resource_id: this.hasChoosePagesNumArray[i].resource_id
        });
      }
      this.result = result;
      this.$store.dispatch("chooseSummerHomeworkArray", this.result);
      this.$router.push({
        path: "/homeworkPublishSetting"
      });
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
    loadMore() {
      if (this.noMore) {
        this.finished = true;
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
        per_page: 30
      };
      api.getResourceLists(data).then(
        success => {
          self.loading = false;
          if (success.lists.length < 1) {
            self.noMore = true;
          } else {
            success.lists.forEach(element => {
              if (
                this.summerHomeworkSelPageIDs.indexOf(element.resource_id) < 0
              ) {
                element.isSel = false;
              } else {
                element.isSel = true;
              }
              self.lists.push(element);
            });
            // self.lists = self.lists.concat(success.lists);
          }
        },
        err => {
          console.log(err);
          self.$toast("网络异常");
        }
      );
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
    margin: 2vw 0;
  }
  .checkbox {
    width: 25px;
    height: 25px;
    float: right;
    top: 6.5vw;
    border-radius: 20px;
    position: relative;
  }
  .des-item {
    font-size: 16px;
    color: #7f8184;
    padding-left: 4vw;
    span {
      color: #4e4e50;
    }
  }
}
.des-item:active {
  color: $green-primary-color;
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
