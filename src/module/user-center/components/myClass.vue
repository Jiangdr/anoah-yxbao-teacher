<template>
  <div id="my-class">
    <van-cell-group v-if="classes" v-for="(item,index) in classes" :key="index">
      <van-cell :title="item.class_name" :label="item.student_counter" center is-link @click="link(item.class_id)"/>
    </van-cell-group>
  </div>
</template>
<script>
import api from '@/module/user-center/axios/usercenter'
import {mapGetters} from 'vuex'
export default {
  name: 'MyClass',
  data () {
    return {
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
    }
  }
}
</script>

<style scoped>
</style>
