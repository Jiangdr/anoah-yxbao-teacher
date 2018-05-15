<template>
  <div id="class-info" style="height:100%;overflow-y:auto">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <div v-if="classDetail">
      <div class="teacher">
        <div class="header van-hairline--bottom">
          <span>教师:</span><span>{{classDetail.teachers.length}}人</span>
        </div>
        <div v-for="(teacher, index) in classDetail.teachers" :key="index" class="item-teacher van-hairline--bottom">
          <img class="avatar" :src="teacher.avatar" alt="...">
          <span class="name">{{teacher.nicknm}}老师</span>
          <span v-for="(major,i) in teacher.major" :key="i">{{major}}/</span>
        </div>
      </div>
      <div class="student">
        <div class="header van-hairline--bottom">
          <span>学生:</span><span>{{classDetail.students.length}}人</span>
        </div>
        <div v-for="(student, index) in classDetail.students" :key="index" class="item-teacher van-hairline--bottom">
          <img class="avatar" :src="student.avatar" alt="...">
          <span class="name">{{student.nicknm}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/module/user-center/axios/usercenter'
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'classInfo',
  data () {
    return {
      title: '班级成员',
      hasBack: true,
      classDetail: null
    }
  },
  mounted () {
    api.obtainclassDeatail({
      class_id: this.$route.params.class_id
    }).then(succ => {
      succ.teachers.forEach(item => {
        if (item.avatar.indexOf('http://') === -1) {
          item.avatar = this.config.old + item.avatar
        }
      })
      succ.students.forEach(item => {
        if (item.avatar.indexOf('http://') === -1) {
          item.avatar = this.config.old + item.avatar
        }
      })
      this.classDetail = succ
    })
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .header{
    height: 30px;
    padding: 0 20px;
    line-height: 30px;
  }
  .item-teacher{
    height: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .avatar{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .name{
    flex: 1;
    padding-left: 20px;
  }
</style>
