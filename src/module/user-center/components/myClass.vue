<template>
  <div id="my-class">
    <header-bar @back="back"><span slot="title-name">{{title}}</span></header-bar>
    <van-cell-group v-if="classes" v-for="(item,index) in classes" :key="index">
      <van-cell class="aboutus-van-cell" is-link @click="link(item.class_id)">
        <template slot="title">
          <div class="item-choice ft19"><img :src="item.class_icon?item.class_icon:defaultClassIcon" class="halfscaleelement"/>{{item.class_name}}</div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import api from '@/module/user-center/axios/usercenter'
import NavBar from '@/module/user-center/components/common/navbar'
import headerBar from '@/components/headerBar.vue'
import {mapState} from 'vuex'
export default {
  name: 'MyClass',
  data () {
    return {
      title: '我的班级',
      hasBack: true,
      classes: null,
      defaultClassIcon: require('@/assets/images/usercenter/myclassdefaulticon.png')
    }
  },
  computed: {
    ...mapState({
      userId: state => state.account.userInfo.userid
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
    NavBar,
    headerBar
  }
}
</script>

<style scoped>
  div.item-choice
  {
    display: flex;
    align-items: center;
    height: 30px;
  }
</style>
