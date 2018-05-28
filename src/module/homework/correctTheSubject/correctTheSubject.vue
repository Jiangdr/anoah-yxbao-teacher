<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>点击切换学生</h1>
      <i class="cubeic-back" @click="goHomework"><i class="fa fa-angle-left"></i></i>
    </header>
    <!-- <div style="overflow-y:auto;overflow-x:hidden;" v-bind:style="listContainerStyle">
      <div v-for="(value,key) in setting" :key="key">
      </div>
    </div> -->
      <studentMutualComments :listObj="listObj"></studentMutualComments>
  </div>
</template>

<script>
import api from "@/module/homework/axios/correctTheSubject.js";
import studentMutualComments from "@/components/common/studentMutualComments.vue";
import {mapGetters} from 'vuex'

export default {
  name: "correctTheSubject",
  components: { studentMutualComments },
  data() {
    return {
      listObj: {},
      listContainerStyle: {
        height: window.innerHeight - 50 + 'px'
      }
    };
  },
  computed: {
    ...mapGetters({
      env: 'runEnv/old'
    })
  },
  created: function() {
    this.userInfo = this.$store.state.account.userInfo;
    this.homeworkOneListInfoObj = this.$store.state.homework.homeworkOneListInfoObj;
    this.getList();
  },
  methods: {
    goHomework() {
      this.$router.push({
        path: "/homework"
      });
    },
    getList: function(value) {
      var self = this;
      var data = {
        publish_id: '309002511527229000001f',
        view_userid: self.userInfo.userid,
        course_resource_id: '9002511527228900001',
        qti_question_id: '9002511502880300001',
        user_id: '1024625',
        page: '1',
        perpage: '5'
      };
      api.studentMutualCommentsGetLists(data).then(
        response => {
          const listObj = response;
          var array = response.lists;
          array.forEach(element => {
            element.rank = Number(element.rank);
            if (element.avatar.indexOf('http://') === -1) {
              element.avatar = self.env + element.avatar
            }
          });
          listObj.score = Math.round(Number(listObj.score))
          listObj.lists = array;
          listObj.studentsNum = listObj.lists.length;
          self.listObj = listObj;
        },
        err => {
          console.log(err);
          self.$toast("网络异常");
        }
      );
    }
  }
};
</script>

<style scoped>
.activeTabClass {
  color: #2ec2a9;
}
</style>
