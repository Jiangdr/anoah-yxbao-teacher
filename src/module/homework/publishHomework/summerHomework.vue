<template>
  <div class="cube-page cube-view button-view" style="background-color: #fff;">
    <div v-show="!examExerciseShow" style="height:100%">
      <header class="header">
        <h1>暑假作业</h1>
        <i class="cubeic-back" @click="goPublishHomework"><i class="back-up-arrow"></i></i>
        <p class="select-all-p" @click="selectAll">{{hasChoosePagesNumArray.length==lists.length?'取消全选':'全选'}}</p>
      </header>

      <van-pull-refresh :class="{listdiv:this.hasChoosePagesNumArray.length === 0,listfooterdiv:this.hasChoosePagesNumArray.length !== 0}" style="overflow-y: auto;" v-model="pullRefresIsLoading" @refresh="onRefresh">
        <van-list v-model="loading" loading-text="加载中。。。" :finished="finished" @load="loadMore" :offset="100" :immediate-check="false">
          <div class="list-item" v-for="(item, index) in lists" :key="index">
            <div style="float:left;margin-top: 3vw;" @click="clickTiltleName(item)">
                <p>{{(index+1)+"."+item.name}}</p>
                <p class="des-item">共<span>{{item.qti_num}}</span>道题</p>
            </div>
            <YxCheckBox class="checkbox" :selected="item.isSel" :ref="'cb-'+index" @select="checkboxChange(item, $event)"></YxCheckBox>
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
        <i class="cubeic-back" @click="goSummerHomework"><i class="back-up-arrow"></i></i>
        <div class="collect" @click="sendFavorite" :class="isFavorite ? 'collect-active' : 'collect-default'"></div>
      </header>
      <div style="overflow-y:auto;overflow-x:hidden;" v-bind:style="listContainerStyle">
        <div style="padding: 5px 10px;height: 25px; line-height: 25px;">
          <div style="float: left;">全部题目（{{setting.length}}）</div>
          <div style="float: right;" @click="clickChooseAll">{{currentPageSelectNum==qti_ids.length?'取消全选':'全选'}}</div>
        </div>
        <div v-for="(item, index) in setting" :key="index" style="position: relative;">
          <Qti :setting="item" @click.native ="goOneQtiDetail(item)"></Qti>
          <YxCheckBox style="position: absolute;right:10px;bottom:0px;width: 25px;height: 25px;" class="checkbox" :selected="item.checked" :ref="'cbs-'+index" @select="exerciseCheckboxChange(item, $event)"></YxCheckBox>
        </div>
      </div>
    </div>

    <div v-if="this.hasChoosePagesNumArray.length !== 0" class="footer-container">
      <p class="footer-p">已选试卷<span>{{this.hasChoosePagesNumArray.length}}</span>份，共<span>{{hasChooseProblemsNumAtlast}}</span>道题</p>
      <div class="yx-green-btn buzhi-div"  @click="clickPublish">布&nbsp;&nbsp;&nbsp;&nbsp;置</div>
    </div>
  </div>
</template>

<script>
import api from "@/module/homework/axios/publishHomeWork.js";
import YxCheckBox from "@/components/common/yx-check-box.vue";
import renderQti from "@/components/renderQti.vue";

export default {
  name: "summerHomework",
  components: { YxCheckBox, renderQti },
  data() {
    return {
      checkList: [],
      lists: [],
      result: [],
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
      qti_ids: [],
      currentPageSelectNum: 0,
      isFavorite: false
    };
  },
  computed: {},
  activated: function() {
    this.lists.length = 0;
    this.isFavorite = false;
    this.isFavoriteRequest = false;
    this.currentItem = {};
    this.userInfo = this.$store.state.account.userInfo;
    this.chooseTextBookObj = this.$store.state.homework.chooseTextBookObj;
    this.summerHomeworkPackId = this.$store.state.homework.summerHomeworkPackId;
    this.olded = this.$store.state.homework.isOldPackId === "1";
    if (this.$store.state.homework.hasChoosePagesArray.length > 0) {
      this.hasChoosePagesNumArray = JSON.parse(
        JSON.stringify(this.$store.state.homework.hasChoosePagesArray)
      );
    }
    // this.qti_ids = this.$store.state.homework.chooseExamExerciseQtiIdsArray;

    this.page = 0;
    this.finished = false;
    this.pullRefresh = true;
    this.getList();
  },
  created: function() {},
  mounted: function() {},
  methods: {
    goPublishHomework() {
      this.examExerciseShow = false;
      this.lists.length = 0;
      this.$store.dispatch("hasChoosePagesArray", this.hasChoosePagesNumArray);
      this.$store.dispatch("isOldPackId", "1");
      this.$router.push({
        path: "/publishHomework"
      });
    },
    goOneQtiDetail(item) {
      this.$router.push({
        name: "oneExamExercise",
        params: {
          oneExamExerciseInfo: item
        }
      });
    },
    goSummerHomework() {
      this.examExerciseShow = false;
    },
    getHasChooseExerciseNum() {
      var num = 0;
      var array = this.hasChoosePagesNumArray;
      this.currentPageSelectNum = 0;
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].qti_ids_obj.length; j++) {
          if (array[i].qti_ids_obj[j].checked) {
            num += 1;
            if (
              this.currentItem &&
              array[i].resource_id === this.currentItem.resource_id
            ) {
              this.currentPageSelectNum++;
            }
          }
        }
      }
      this.hasChooseProblemsNumAtlast = num;
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
        var tempArr = [];
        for (
          let index = 0;
          index < this.hasChoosePagesNumArray[i].qti_ids_obj.length;
          index++
        ) {
          const element = this.hasChoosePagesNumArray[i].qti_ids_obj[index];
          if (element.checked) tempArr.push(element.value);
        }
        result.push({
          name: this.hasChoosePagesNumArray[i].name,
          qti_ids: tempArr,
          resource_id: this.hasChoosePagesNumArray[i].resource_id
        });
      }
      this.examExerciseShow = false;
      this.lists.length = 0;
      this.$store.dispatch("hasChoosePagesArray", this.hasChoosePagesNumArray);
      this.$store.dispatch("isOldPackId", "1");
      this.result = result;
      this.$store.dispatch("chooseSummerHomeworkArray", this.result);
      // console.log(this.hasChoosePagesNumArray);
      // return
      this.$router.push({
        path: "/homeworkPublishSetting"
      });
    },
    selectAll() {
      var self = this;
      if (this.hasChoosePagesNumArray.length === this.lists.length) {
        this.hasChoosePagesNumArray = [];
        let i = 0;
        while (i < this.lists.length) {
          self.$refs["cb-" + i][0].selecteState = false;
          for (let j = 0; j < this.lists[i].qti_ids_obj.length; j++) {
            this.lists[i].qti_ids_obj[j].checked = false;
          }
          ++i;
        }
      } else {
        let j = 0;
        while (j < this.lists.length) {
          self.$refs["cb-" + j][0].selecteState = true;
          let element = this.lists[j];
          if (self.hasChoosePagesNumArray.indexOf(element) < 0) {
            self.hasChoosePagesNumArray.push(element);
          }

          for (let q = 0; q < this.lists[j].qti_ids_obj.length; q++) {
            this.lists[j].qti_ids_obj[q].checked = true;
          }
          ++j;
        }
      }

      this.getHasChooseExerciseNum();
    },
    checkboxChange(item, event) {
      if (event.selecteState) {
        let isHas = false;
        for (let i = 0; i < this.hasChoosePagesNumArray.length; i++) {
          if (this.hasChoosePagesNumArray[i].resource_id === item.resource_id) {
            isHas = true;
            break;
          }
        }

        if (!isHas) {
          this.hasChoosePagesNumArray.push(item);
          for (let j = 0; j < item.qti_ids_obj.length; j++) {
            item.qti_ids_obj[j].checked = true;
          }
        }
      } else {
        for (let i = 0; i < this.hasChoosePagesNumArray.length; i++) {
          if (this.hasChoosePagesNumArray[i].resource_id === item.resource_id) {
            for (
              let j = 0;
              j < this.hasChoosePagesNumArray[i].qti_ids_obj.length;
              j++
            ) {
              this.hasChoosePagesNumArray[i].qti_ids_obj[j].checked = false;
            }
            this.hasChoosePagesNumArray.splice(i, 1);
          }
        }
      }
      this.getHasChooseExerciseNum();
    },
    exerciseCheckboxChange(item, event) {
      if (event.selecteState) {
        let isHas = false;
        for (let i = 0; i < this.hasChoosePagesNumArray.length; i++) {
          if (
            this.hasChoosePagesNumArray[i].resource_id ===
            this.currentItem.resource_id
          ) {
            isHas = true;
            break;
          }
        }

        if (!isHas) {
          this.hasChoosePagesNumArray.push(this.currentItem);
          let arr = this.$refs["cb-" + this.currentItem.listIndex];
          if (arr && arr.length > 0) {
            arr[0].selecteState = true;
          }
        }
        for (let j = 0; j < this.currentItem.qti_ids_obj.length; j++) {
          if (item.qid === this.currentItem.qti_ids_obj[j].value) {
            this.currentItem.qti_ids_obj[j].checked = true;
          }
        }
      } else {
        var chooseOne = false;
        for (let j = 0; j < this.currentItem.qti_ids_obj.length; j++) {
          if (item.qid === this.currentItem.qti_ids_obj[j].value) {
            this.currentItem.qti_ids_obj[j].checked = false;
          } else {
            if (this.currentItem.qti_ids_obj[j].checked) {
              chooseOne = true;
            } else {
              chooseOne = false;
            }
          }
        }

        if (!chooseOne) {
          for (
            let index = 0;
            index < this.hasChoosePagesNumArray.length;
            index++
          ) {
            const element = this.hasChoosePagesNumArray[index];
            if (element.resource_id === this.currentItem.resource_id) {
              this.hasChoosePagesNumArray.splice(index, 1);
              break;
            }
          }
          let arr = this.$refs["cb-" + this.currentItem.listIndex];
          if (arr && arr.length > 0) {
            arr[0].selecteState = false;
          }
        }
      }
      this.getHasChooseExerciseNum();
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
    clickChooseAll() {
      if (this.currentPageSelectNum === this.qti_ids.length) {
        for (let j = 0; j < this.currentItem.qti_ids_obj.length; j++) {
          this.currentItem.qti_ids_obj[j].checked = false;
          let arr = this.$refs["cbs-" + j];
          if (arr && arr.length > 0) {
            arr[0].selecteState = false;
          }
        }
        for (
          let index = 0;
          index < this.hasChoosePagesNumArray.length;
          index++
        ) {
          const element = this.hasChoosePagesNumArray[index];
          if (element.resource_id === this.currentItem.resource_id) {
            this.hasChoosePagesNumArray.splice(index, 1);
            break;
          }
        }
        let arr = this.$refs["cb-" + this.currentItem.listIndex];
        if (arr && arr.length > 0) {
          arr[0].selecteState = false;
        }
        this.getHasChooseExerciseNum();
        return false;
      }
      if (!this.isSelect(this.currentItem)) {
        this.hasChoosePagesNumArray.push(this.currentItem);
        let arr = this.$refs["cb-" + this.currentItem.listIndex];
        if (arr && arr.length > 0) {
          arr[0].selecteState = true;
        }
      }
      for (let j = 0; j < this.currentItem.qti_ids_obj.length; j++) {
        this.currentItem.qti_ids_obj[j].checked = true;
        let arr = this.$refs["cbs-" + j];
        if (arr && arr.length > 0) {
          arr[0].selecteState = true;
        }
      }
      this.getHasChooseExerciseNum();
    },
    sendFavorite: function() {
      var self = this;
      var data = {
        user_id: self.userInfo.userid,
        resource_id: self.currentItem.resource_id
      };
      if (this.isFavoriteRequest) return;
      this.isFavoriteRequest = true;
      api.favoriteUpdate(data).then(
        success => {
          self.isFavoriteRequest = false;
          self.isFavorite = success.status !== 0;
          self.currentItem.is_favorite = success.status;
        },
        err => {
          console.log(err);
          self.isFavoriteRequest = false;
          self.$toast("网络异常");
        }
      );
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
          if (success.lists.length < 1) {
            self.noMore = true;
          } else {
            if (self.pullRefresh) {
              self.olded = self.$store.state.homework.isOldPackId === "1";
              if (self.$store.state.homework.hasChoosePagesArray.length > 0) {
                self.hasChoosePagesNumArray = JSON.parse(
                  JSON.stringify(self.$store.state.homework.hasChoosePagesArray)
                );
              } else {
                self.hasChoosePagesNumArray = [];
              }
              self.lists.length = 0;
            }

            success.lists.forEach(element => {
              if (self.olded) {
                element = self.getSelectItem(element);
                if (element !== null) {
                  element.isSel = true;
                  let arr = self.$refs["cb-" + self.lists.length];
                  if (arr && arr.length > 0) {
                    arr[0].selecteState = true;
                  }
                }
              } else {
                self.hasChoosePagesNumArray.push(element);
                element.isSel = true;
                let arr = self.$refs["cb-" + self.lists.length];
                if (arr && arr.length > 0) {
                  arr[0].selecteState = true;
                }
                element.qti_ids_obj = [];
                for (let j = 0; j < element.qti_ids.length; j++) {
                  element.qti_ids_obj.push({
                    value: element.qti_ids[j],
                    checked: true
                  });
                }
              }
              element.listIndex = self.lists.length;
              self.lists.push(element);
            });
          }
          self.pullRefresh = false;
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
    getSelectItem(item) {
      var res = null;
      this.hasChoosePagesNumArray.forEach(elements => {
        if (elements.resource_id === item.resource_id) res = elements;
      });
      return res;
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
        this.setting.push({
          domain: "e.dev.anoah.com",
          qid: this.qti_ids[i].value,
          checked: this.qti_ids[i].checked,
          num: i + 1,
          caller: "PREVIEWOR",
          resource_type: "qti_question",
          isSel: true
        });
      }
    },
    clickTiltleName(item) {
      this.setting = [];
      this.examExerciseShow = true;
      // this.$store.dispatch("chooseExamExerciseQtiIdsArray", item.qti_ids);
      this.qti_ids = item.qti_ids_obj;
      this.currentPageSelectNum = 0;
      this.currentItem = item;
      this.isFavorite = item.is_favorite !== 0;
      // this.qtiFun();
      for (var i = 0; i < item.qti_ids_obj.length; i++) {
        this.setting.push({
          domain: "e.dev.anoah.com",
          qid: item.qti_ids_obj[i].value,
          checked: item.qti_ids_obj[i].checked,
          num: i + 1,
          caller: "PREVIEWOR",
          hide_result: 1,
          resource_type: "qti_question",
          isSel: true
        });
        let arr = this.$refs["cbs-" + i];
        if (arr && arr.length > 0) {
          arr[0].selecteState = item.qti_ids_obj[i].checked;
        }
      }

      this.getHasChooseExerciseNum();
      // debugger
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/custom.scss";
.collect {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  margin-top: 3px;
  vertical-align: text-bottom;
  margin-right: 5px;
  position: absolute;
  top: 1.5vw;
  right: 2vw;
}
.collect-active {
  background-image: url("../../../assets/images/homeworkDetail/collect.png");
}
.collect-default {
  background-image: url("../../../assets/images/homeworkDetail/collect-default.png");
}
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
