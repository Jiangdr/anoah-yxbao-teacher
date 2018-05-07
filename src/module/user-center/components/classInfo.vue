<template>
  <div id="class-info" style="height:100%;overflow-y:auto">
    <div v-if="classDetail">
      <div class="teacher">
        <div>
          <span>教师:</span><span>{{classDetail.teachers.length}}人</span>
        </div>
        <div v-for="(teacher, index) in classDetail.teachers" :key="index">
          <img :src="teacher.avatar" alt="...">
          <span>{{teacher.nicknm}}</span>
          <span v-for="(major,i) in teacher.major" :key="i">{{major}}</span>
        </div>
      </div>
      <div class="student">
        <div>
          <span>学生:</span><span>{{classDetail.students.length}}人</span>
        </div>
        <div v-for="(student, index) in classDetail.students" :key="index">
          <img :src="student.avatar" alt="...">
          <span>{{student.nicknm}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/module/user-center/axios/usercenter'
export default {
  name: 'classInfo',
  data () {
    return {
      classDetail: null
    }
  },
  mounted () {
    api.obtainclassDeatail({
      class_id: this.$route.params.class_id
    }).then(succ => {
      console.log(succ)
      this.classDetail = succ
    })
  }
}
</script>

<style scoped>
</style>
