<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>布置作业</h1>
      <i class="cubeic-back" @click="goBack"><i class="fa fa-angle-left back-up-arrow"></i> </i>
    </header>

    <div class="header-tab">
      <div><p v-bind:class="{activeTabClass : activeTabName == 0}" @click="clickTab(0)">&emsp;推荐&emsp;</p></div>
      <div><p v-bind:class="{activeTabClass : activeTabName == 1}" @click="clickTab(1)">&emsp;校本库&emsp;</p></div>
    </div>

    <div class="choose-textbook" @click="goChooseTextbook">
       <img src="@/assets/images/homework/textbook-icon.png"/>
       <p>{{chooseTextBookObj.name}}</p>
       <i class="fa fa-angle-right"></i>
    </div>

    <div class="list-container">
      <van-list v-model="loading" loading-text="加载中。。。" :finished="finished" @load="loadMore" :offset="100" :immediate-check="false">
        <div class="list-item" v-for="(list, index) in lists" :key="index" @click="goSummerHomework(list)">
          <div style="width:95%;"><img src="@/assets/images/homework/summer-work-icon.png"/><p>{{list.NAME}}</p></div>
          <div class="arrow-div"><i class="fa fa-angle-right"></i></div>
        </div>
      </van-list>
      <div v-if="lists.length==0" class="text-font">
        暂无内容
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/module/homework/axios/publishHomeWork.js";

export default {
  name: "publishHomework",
  data() {
    return {
      activeTabName: 0,
      loading: false,
      finished: false,
      page: 0,
      noMore: false,
      lists: []
    };
  },
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.chooseTextBookObj = this.$store.state.homework.chooseTextBookObj;
  },
  mounted: function() {
    this.getList(0);
  },
  methods: {
    goBack() {
      var tempStr =
        this.$store.state.homework.publishHWBackPage.length > 0
          ? this.$store.state.homework.publishHWBackPage
          : "chooseTextbook";
      this.$router.push({
        path: "/" + tempStr
      });
    },
    goChooseTextbook() {
      this.$store.state.homework.chooseBackPage = "publishHomework";
      this.$router.push({
        path: "/chooseTextbook"
      });
    },
    goSummerHomework(list) {
      this.$store.dispatch("summerHomeworkPackId", list.pack_id);
      this.$router.push({
        path: "/summerHomework"
      });
    },
    loadMore() {
      if (this.noMore) {
        this.finished = true;
        this.loading = false;
      } else {
        this.getList();
      }
    },
    getList: function(type) {
      var self = this;
      self.loading = true;
      self.page++;
      var data = {
        page: self.page,
        per_page: 15,
        user_id: self.userInfo.userid,
        edu_book_id: self.chooseTextBookObj.edu_book_id,
        type: type
      };
      api.getLists(data).then(
        success => {
          self.loading = false;
          if (success.lists.length < 1) {
            self.noMore = true;
          } else {
            self.lists = self.lists.concat(success.lists);
          }
        },
        err => {
          console.log(err);
          self.$toast("网络异常");
        }
      );
    },
    clickTab(type) {
      this.noMore = false;
      this.finished = false;
      this.loading = false;
      this.page = 0;
      this.lists.length = 0;
      this.activeTabName = type;
      this.getList(type);
    }
  }
};
</script>

<style scoped  lang="scss">
@import "@/assets/css/custom.scss";
.header-tab {
  height: $header-height;
  line-height: $header-height;
  border-bottom: $border-state;
  text-align: center;
  background: #fff;
  div {
    width: 49%;
    display: inline-block;
  }
  p {
    display: inline-block;
    font-size: 20px;
    line-height: $header-height;
  }
  .activeTabClass {
    color: $green-primary-color;
    border-bottom: 2px solid $green-primary-color;
  }
}
.choose-textbook {
  background-color: #fff;
  height: calc(#{$header-height} + 10px);
  padding: 0 14px;
  i,
  p {
    line-height: calc(#{$header-height} + 10px);
  }
  p {
    @extend .single-line;
    width: 87%;
    display: inline-block;
    font-size: 16px;
  }
  i {
    float: right;
    font-size: 7.46667vw;
  }
  img {
    width: 15px;
    height: 18px;
    float: left;
    top: 4.5vw;
    position: relative;
    padding-right: 7px;
  }
}
.list-container {
  margin-top: 3vw;
  overflow-y: scroll;
  height: calc(100% - #{$header-height} * 3 - 10px - 3vw);
  background-color: #fff;
}
.list-item {
  p {
    @extend .single-line;
    line-height: 15vw;
    padding-top: 1vw;
  }
  div {
    display: inline-block;
  }
  img {
    width: 30px;
    height: 33px;
    float: left;
    top: 3.6vw;
    position: relative;
    padding-right: 7px;
  }
  i {
    float: right;
    font-size: 7.46667vw;
  }
  .arrow-div {
    width: 3%;
    float: right;
    padding-top: 5vw;
  }
  border-bottom: $border-state;
  height: 16vw;
  margin: 0 auto;
  width: 93%;
  text-align: left;
  font-size: 16px;
  background-color: #fff;
}
</style>
