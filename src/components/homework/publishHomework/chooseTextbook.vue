<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>选择教材</h1>
      <i class="cubeic-back" @click="goHomework"><i class="fa fa-angle-left"></i> 返回</i>
    </header>

    <div style="width: 25%;float: left;">
        <div class="leftTab" @click="clickGrade(1)" v-bind:class="{activeTabClass: activeGradeId === 1}">一年级</div>
        <div class="leftTab" @click="clickGrade(2)" v-bind:class="{activeTabClass: activeGradeId === 2}">二年级</div>
        <div class="leftTab" @click="clickGrade(3)" v-bind:class="{activeTabClass: activeGradeId === 3}">三年级</div>
        <div class="leftTab" @click="clickGrade(4)" v-bind:class="{activeTabClass: activeGradeId === 4}">四年级</div>
        <div class="leftTab" @click="clickGrade(5)" v-bind:class="{activeTabClass: activeGradeId === 5}">五年级</div>
        <div class="leftTab" @click="clickGrade(6)" v-bind:class="{activeTabClass: activeGradeId === 6}">六年级</div>
    </div>

    <div style="width: 75%;float: left;">
      <div style="display:inline-block;vertical-align:top;">
        <div style="display:inline-block;padding:10px;" @click="clickTerm(1)" v-bind:class="{activeRightTabClass: activeTermId === 1}">上册</div>
        <div style="display:inline-block;padding:10px;" @click="clickTerm(2)" v-bind:class="{activeRightTabClass: activeTermId === 2}">下册</div>
        <div style="display:inline-block;padding:10px;" @click="clickTerm(3)" v-bind:class="{activeRightTabClass: activeTermId === 3}">全册</div>
      </div>

      <div>
        <div style="border-bottom:1px solid black;padding: 5px;"
        v-for="(textBook, index) in textBookList" :key="index" @click="clickTextBook(textBook)"
        v-bind:class="{activeRightTabClass: chooseTextbookId === textBook.edu_book_id}">{{textBook.name}}</div>
      </div>
    </div>

    <cube-button style="position:absolute;bottom:0px;" :outline="true" @click="goSummerHomework">确认</cube-button>
  </div>
</template>

<script>
import api from "@/axios/publishHomeWork.js";

export default {
  name: "chooseTextbook",
  data() {
    return {
      activeGradeId: 1,
      activeTermId: 1,
      textBookList: [],
      chooseTextbookId: ""
    };
  },
  mounted: function() {
    console.log('aaa');
    this.getTextBookLists();
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
    clickGrade(id) {
      this.activeGradeId = id;
      this.getTextBookLists();
    },
    clickTerm(id) {
      this.activeTermId = id;
      this.getTextBookLists();
    },
    getTextBookLists() {
      var self = this;
      var data = {
        user_id: self.userInfo.userid,
        grade_id: self.activeGradeId,
        term_id: self.activeTermId
      };
      api.getBookLists(data).then(function(r) {
        self.textBookList = r.lists;
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

<style scoped>
.leftTab {
  line-height: 35px;
}
.activeTabClass {
  color: #fc9153;
}
.activeRightTabClass {
  background-color: #fc9153;
}
</style>
