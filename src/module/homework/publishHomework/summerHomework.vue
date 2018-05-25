<template>
  <div class="cube-page cube-view button-view" style="background-color: #fff;">
    <header class="header">
      <h1>暑假作业</h1>
      <i class="cubeic-back" @click="goPublishHomework"><i class="fa fa-angle-left back-up-arrow"></i> </i>
      <p class="select-all-p" @click="selectAll">{{hasChoosePagesNumArray.length==lists.length?取消全选:全选}}</p>
    </header>
    <div :class="{listdiv:this.hasChoosePagesNumArray.length === 0,listfooterdiv:this.hasChoosePagesNumArray.length !== 0}" style="overflow-y: auto;">
        <van-list v-model="loading" loading-text="加载中。。。" :finished="finished" @load="loadMore" :offset="100" :immediate-check="false">
          <div class="list-item" v-for="(item, index) in lists" :key="index">
            <div style="float:left;margin-top: 3vw;" @click="clickTiltleName(item)">
               <p>{{(index+1)+"."+item.name}}</p>
               <p class="des-item">共<span>{{item.qti_num}}</span>道题</p>
            </div>
            <YxCheckBox class="checkbox" :selected="item.isSel" :ref="'cb-'+item.resource_id" @select="checkboxChange(item,$event)"></YxCheckBox>
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
      olded: false,
      hasChoosePagesNumArray: [],
      loading: false,
      finished: true,
      noMore: true,
      page: 0
    };
  },
  computed: {},
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.chooseTextBookObj = this.$store.state.homework.chooseTextBookObj;
    this.summerHomeworkPackId = this.$store.state.homework.summerHomeworkPackId;
    if (this.$store.state.homework.hasChoosePagesArray.length > 0) {
      olded = true;
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
          resource_id: this.hasChoosePagesNumArray[i].qti_ids
        });
      }
      this.result = result;
      this.$store.dispatch("chooseSummerHomeworkArray", this.result);
      this.$router.push({
        path: "/homeworkPublishSetting"
      });
    },
    selectAll() {
      var self = this;
      this.lists.forEach(element => {
        if (self.hasChoosePagesNumArray.indexOf(element) < 0) {
          self.hasChoosePagesNumArray.push(element);
          self.hasChooseProblemsNum =
            parseInt(self.hasChooseProblemsNum) + parseInt(element.qti_num);
        }
        self.$refs["cb-" + element.resource_id][0].selecteState = true;
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
              if ((olded && self.isSelect(element)) || !olded) {
                self.hasChoosePagesNumArray.push(element);
                self.hasChooseProblemsNum =
                  parseInt(self.hasChooseProblemsNum) +
                  parseInt(element.qti_num);
                  element.isSel = true;
              }
              self.lists.push(element);
            });
          }
        },
        err => {
          console.log(err);
          self.$toast("网络异常");
        }
      );
    },
    isSelect(item) {
      this.hasChoosePagesNumArray.forEach(element => {
        if (element.resource_id === item.resource_id) return true;
      });
      return false;
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
