<template>
  <div class="notice">
    <div class="title">
      <header-bar @back="goBack">
        <div slot="title-name">
          <div>通知中心</div>
        </div>
      </header-bar>
    </div>
    <div class="wrapper">
      <div class="items">
        <router-link to="/notice/homeworkList">
        <i class="icon homework"></i>
          <span>
            作业消息
            <b class="redIcon" v-show="isNewWorkMsg"></b>
          </span>
          <van-icon name="arrow" class="icon-right"></van-icon>
        </router-link>
      </div>
      <div class="items">
        <router-link to="/notice/schoolList">
        <i class="icon school"></i>
          <span>
            学校消息
            <b class="redIcon" v-show="isNewSchoolMsg"></b>
          </span>
          <van-icon name="arrow" class="icon-right"></van-icon>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar.vue'
export default {
  name: 'noticeList',
  data () {
    return {
      isNewWorkMsg: true,
      isNewSchoolMsg: true
    }
  },
  created () {},
  computed: {},
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  components: {
    headerBar
  }
}
</script>
<style scoped>
.notice{
  height: 100vh;
}
.wrapper{
  padding:13px 13px 0;
  background: #f5f7f8;
  height: calc(100% - 45px);
}
.notice .items{
  height: 45px;
  line-height: 45px;
  background: #fff;
  border-radius: 8px;
  padding:0 13px;
  display: flex;
  box-sizing: border-box;
}
.notice .items a{
  display:inline-block;
  width:100%;
  position: relative;
}
.notice .items:first-child{
  margin-bottom: 13px;
  color:#1e1e1e;
}
.notice .items .icon{
  vertical-align: middle;
  display: inline-block;
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
}
.notice .items .icon.homework{
  background-image: url('../../../assets/images/notice/homework.png')
}
.notice .items .icon.school{
  background-image: url('../../../assets/images/notice/school.png')
}
.notice .items b.redIcon{
  display: inline-block;
  width:6px;
  height: 6px;
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  vertical-align: text-top;
  background-image: url('../../../assets/images/public/red-icon.png')
}
.notice .items .icon-right{
  position: absolute;
  right: 0;
  top:50%;
  transform: translateY(-50%);
}
</style>
