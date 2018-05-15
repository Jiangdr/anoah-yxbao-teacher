<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>布置作业</h1>
      <i class="cubeic-back" @click="goChooseTextbook"><i class="fa fa-angle-left"></i> 返回</i>
    </header>

    <div style="border-bottom: 1px solid #111;">
      <span style="width:49%;text-align:center;display:inline-block;border-right: 1px solid #111;" v-bind:class="{activeTabClass : activeTabName == '推荐'}" @click="clickTab('推荐')">推荐</span>
      <span style="width:49%;text-align:center;display:inline-block;" v-bind:class="{activeTabClass : activeTabName == '校本库'}" @click="clickTab('校本库')">校本库</span>
    </div>

    <div style="background-color:#fff;margin-bottom:20px;line-height: 35px;" @click="goChooseTextbook">
      <div style="width:95%;display: inline-block;">
        <i class="fa fa-book"></i>{{chooseTextBookObj.name}}
      </div>
      <div style="width:3%;display: inline-block;">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>

    <div style="height:50px;line-height:50px;background-color:#fff;border-bottom:1px solid #111;" v-for="(list, index) in lists" :key="index" @click="goSummerHomework(list)">
      <div style="width:95%;display: inline-block;"><i class="fa fa-book"></i>  {{list.NAME}}</div>
      <div style="width:3%;display: inline-block;border-bottom: 1px solid #111;"><i class="fa fa-angle-right"></i></div>
    </div>
  </div>
</template>

<script>
import api from '@/axios/publishHomeWork.js'

export default {
  name: "publishHomework",
  data() {
    return {
      activeTabName: '推荐',
      lists: []
    };
  },
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.chooseTextBookObj = this.$store.state.homework.chooseTextBookObj;
  },
  mounted: function() {
    this.getList();
  },
  methods: {
    goChooseTextbook () {
      this.$router.push({
        path: "/chooseTextbook"
      });
    },
    goSummerHomework (list) {
      this.$store.dispatch("summerHomeworkPackId", list.pack_id);
      this.$router.push({
        path: "/summerHomework"
      });
    },
    getList: function() {
      var self = this;
      var data = {
        user_id: 33737,
        edu_book_id: 33250,
        type: 1
      };
      api.getLists(data)
        .then(function(r) {
          self.lists = r.lists;
        })
    },
    clickTab (name) {
      this.activeTabName = name;
    }
  }
};
</script>

<style scoped>
.activeTabClass{
  color: #fc9153;
}
</style>
