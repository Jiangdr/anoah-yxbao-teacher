<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>选择教材</h1>
      <i class="cubeic-back" @click="goHomework"><i class="fa fa-angle-left"></i> 返回</i>
    </header>

    <div class="gradelist">
        <div v-for="items in gradeLists" :key="items.grade_name">
            <p>{{items.grade_name}}</p>
           <div v-for='item in items.grade_list' :key="item.name" v-bind:class="{activeGradeSelClass:activeGradeId === item.id}"  @click="clickGrade(item.id)">
             <p v-bind:class="{activeTxtClass:activeGradeId === item.id}">
               {{item.name}}
              </p>
          </div>
        </div>
    </div>

    <div style="width: 75%;float: left;padding-top: 2vw;height: 100%;text-align: center;background-color: #fff;">
      <div class="unitTabDiv">
        <div class="unitTabClass" @click="clickTerm(1)" v-bind:class="{cubeBtnActive:activeTermId === 1}">上册</div>
        <div class="unitTabClass" @click="clickTerm(2)" v-bind:class="{cubeBtnActive: activeTermId === 2}">下册</div>
        <div class="unitTabClass" @click="clickTerm(3)" v-bind:class="{cubeBtnActive: activeTermId === 3}">全册</div>
      </div>

      <div style="margin-top: 2vw;overflow-y: auto;height:calc(100% - 40vw)">
            <van-list v-model="loading" loading-text="加载中。。。" :finished="finished" @load="loadMore" :offset="100" :immediate-check="false">
              <div class="textBook" v-for="(textBook, index) in textBookList" :key="index" @click="clickTextBook(textBook)"
            v-bind:class="{activeRightTabClass: chooseTextbookId === textBook.edu_book_id}">{{textBook.name}}</div>
            </van-list>
          <div v-if="textBookList.length==0" style="height: 200px;line-height: 200px;text-align: center;">
            没有数据
          </div>
      </div>
    </div>
    <cube-button style="position:absolute;bottom:0px;height:100px" :outline="true" @click="goSummerHomework">确认</cube-button>
  </div>
</template>

<script>
import api from "@/axios/publishHomeWork.js";

export default {
  name: "chooseTextbook",
  data() {
    return {
      page: 0,
      activeGradeId: 1,
      loading: false,
      finished: false,
      noMore: false,
      activeTermId: 1,
      textBookList: [],
      gradeLists: [],
      chooseTextbookId: ""
    };
  },
  mounted: function() {
    this.getTextBookLists();
    this.getGradeLists();
  },
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
  },
  methods: {
    goHomework() {
      this.$router.push({
        path: "/homework"
      });
    },
    reset() {
      this.noMore = false;
      this.finished = false;
      this.loading = false;
      this.page = 0;
      this.chooseTextbookId = "";
      this.textBookList.length = 0;
    },
    clickGrade(id) {
      this.activeGradeId = id;
      this.reset();
      this.getTextBookLists();
    },
    clickTerm(id) {
      this.activeTermId = id;
      this.reset();
      this.getTextBookLists();
    },
    loadMore() {
      console.log("loadMore......");
      if (this.noMore) {
        this.finished = true;
        this.loading = false;
      } else {
        this.getTextBookLists();
      }
    },
    getGradeLists() {
      var self = this;
      var data = {
        user_id: self.userInfo.userid
      };
      api.getGradeLists(data).then(function(r) {
        self.gradeLists = r;
      });
    },
    getTextBookLists() {
      var self = this;
      self.page++;
      var data = {
        page: self.page,
        per_page: 15,
        grade_id: self.activeGradeId,
        term_id: self.activeTermId
      };
      api.getBookLists(data).then(function(r) {
        self.loading = false;
        if (r.lists.length < 1) {
          self.noMore = true;
          return;
        }
        self.textBookList = self.textBookList.concat(r.lists);
      });
    },
    clickTextBook(book) {
      this.chooseTextbookId = book.edu_book_id;
      this.$store.dispatch("chooseTextBookObj", book);
    },
    goSummerHomework() {
      if (!this.chooseTextbookId) {
        this.$toast({
          message: "请选择教材！",
          duration: 500
        });
        return;
      }
      this.$router.push({
        path: "/publishHomework"
      });
    }
  }
};
</script>

<style scoped lang="scss">
$primary-color: #2ec2a9;
$border-state: 1px solid rgb(234, 237, 240);
.unitTabClass {
  @extend .singleLine;
  background-color: #ffffff;
  color: #000;
  border: 1px solid #eaedf0;
  display: inline-block;
  width: 27%;
  padding: 2vw;
  border-radius: 1vw;
  margin: 0 1.5vw;
  text-align: center;
  cursor: pointer;
  font-size: 4.26667vw;
  line-height: 1;
  outline: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.singleLine {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gradelist {
  width: 25%;
  float: left;
  height: calc(100% - 28vw);
  overflow: auto;
  padding-top: 2vw;
  div {
    line-height: 35px;
    height: 35px;
    p {
      padding-left: 20px;
      margin: 7px 0 0 0;
    }
  }
}
.activeTabClass {
  color: $primary-color;
}
.unitTabDiv {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  .cubeBtnActive {
    background-color: #2ec2a9 !important;
    color: #fff !important;
  }
  .cube-btn {
    background-color: #ffffff;
    color: #000;
    border: $border-state;
    display: inline-block;
    width: 30%;
    padding: 2vw;
    border-radius: 1.3vw;
  }
}
.comfirmTxtBtn {
  position: absolute;
  right: 0px;
  top: 0%;
  height: 100%;
  background: #fff;
  color: $primary-color;
  padding: 0 4vw;
}
.textBook {
  @extend .singleLine;
  border-bottom: $border-state;
  line-height: 10vw;
  margin: 0 auto;
  width: 93%;
  text-align: left;
}
.activeRightTabClass {
  background-color: $primary-color;
  color: #ffffff;
}
.activeGradeSelClass {
  background-color: #fff;
  color: #000;
}
.activeTxtClass {
  @extend .singleLine;
  border-left: 2px solid $primary-color;
}
</style>
