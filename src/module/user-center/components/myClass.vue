<template>
  <div id="my-class">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <van-cell-group v-if="classes" v-for="(item,index) in classes" :key="index">
      <van-cell :title="item.class_name" :label="item.student_counter" center is-link @click="link(item.class_id)"/>
    </van-cell-group>
  </div>
</template>
<script>
import api from '@/module/user-center/axios/usercenter'
import NavBar from '@/module/user-center/components/common/navbar'
import {mapGetters} from 'vuex'
export default {
  name: 'MyClass',
  data () {
    return {
      title: '我的班级',
      hasBack: true,
      classes: null
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    })
  },
  mounted () {
    api.obtainclasses({
      user_id: this.userId
    }).then(succ => {
      succ.forEach(element => {
        element.student_counter = `班级人数:${element.student_counter}`
      })
      this.classes = succ
    })
  },
  methods: {
    link (classId) {
      this.$router.push({path: `/classInfo/${classId}`})
    },
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
</style>
