<template>
  <div id="class-info" style="height:100%;overflow-y:auto" class="cl-bgc">
    <header-bar @back="back" class="bg-white"><span slot="title-name">{{title}}</span></header-bar>
    <div v-if="classDetail">
      <div class="teacher bg-white">
        <div class="header">
          <span class="cl-dec">教师:</span><span>({{classDetail.teachers.length}}人)</span>
        </div>
        <div v-for="(teacher, index) in classDetail.teachers" :key="index" class="item-teacher van-hairline--bottom ft17">
          <img class="avatar" :src="teacher.avatar" alt="...">
          <span class="name">{{teacher.nicknm}}老师</span>
          <span v-for="(major,i) in teacher.major" :key="i" class="cl-dec ft16">{{major}}&nbsp;</span>
        </div>
      </div>
      <div class="student bg-white">
        <div class="header">
          <span class="cl-dec">学生:</span><span>({{classDetail.students.length}}人)</span>
        </div>
        <div v-for="(student, index) in classDetail.students" :key="index" class="item-teacher van-hairline--bottom ft17">
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
import headerBar from '@/components/headerBar.vue'
export default {
  name: 'classInfo',
  data () {
    return {
      title: '班级详情',
      hasBack: true,
      classDetail: null
    }
  },
  mounted () {
    api.obtainclassDeatail({
      class_id: this.$route.params.class_id
    }).then(succ => {
      succ.teachers.forEach(item => {
        if (item.avatar) {
          if (item.avatar.indexOf('http://') === -1) {
            item.avatar = this.$store.getters['runEnv/old'] + item.avatar
          }
        } else {
          item.avatar = require('@/assets/images/usercenter/defaultHeadericon.jpg')
        }
      })
      succ.students.forEach(item => {
        if (item.avatar) {
          if (item.avatar.indexOf('http://') === -1) {
            item.avatar = this.$store.getters['runEnv/old'] + item.avatar
          }
        } else {
          item.avatar = require('@/assets/images/usercenter/defaultHeadericon.jpg')
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
    NavBar,
    headerBar
  }
}
</script>

<style scoped>
  .header{
    height: 30px;
    padding: 19px 0px 0px 20px;
    line-height: 30px;
  }
  .item-teacher{
    height: 65px;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .avatar{
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .name{
    flex: 1;
    padding-left: 20px;
  }
  .student{
    margin-top: 10px;
  }
</style>
