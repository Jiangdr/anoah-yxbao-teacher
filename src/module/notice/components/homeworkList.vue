<template>
<div class="homeworkList">
  <div class="title">
    <header-bar @back="goBack">
        <div slot="title-name">
          <div>作业通知</div>
        </div>
      </header-bar>
  </div>
    <div class="container">
      <div class="wrapper">
      <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
          <teacher-notice :list="list" v-if="$route.params.role==='teacher'"></teacher-notice>
        </van-list>
      </van-pull-refresh>
      </div>
    </div>
</div>
</template>

<script>
import notice from '../axios/notice.js'
import headerBar from '@/components/headerBar.vue'
import teacherNotice from './common/teacherNotice.vue'
import studentNotice from './common/studentNotice.vue'
export default {
  name: 'homeworkList',
  data () {
    return {
      loading: false,
      refreshLoading: false,
      finished: false,
      params: {
        type: 2, //  作业列表
        page: 1, // 页码
        per_page: 10, // 每页显示条数
        role: this.$route.params.role,
        user_id: JSON.parse(localStorage.userinfo).userid
      },
      list: [],
      totalPage: 0
    }
  },
  activated() {
    this.getNoticelist();
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goDetail () {
      this.$router.push({
        name: 'noticeDetail'
      })
    },
    getNoticelist () {
      notice.getList(this.params).then((r) => {
        this.totalPage = r.totalPage
        if (this.params.page === 1) {
          this.list = r.list
        } else {
          for (let i = 0; i < r.list.length; i++) {
            this.list.push(r.list[i])
          }
        }
        this.loading = false;
      })
    },
    onRefresh () {
      this.params.page = 1
      this.getNoticelist()
      setTimeout(() => {
        this.refreshLoading = false
      }, 500)
    },
    onLoad () {
      if (this.params.page >= this.totalPage) {
        this.loading = false
        this.finished = true
      } else {
        this.params.page++
        this.getNoticelist();
      }
    }
  },
  components: {
    headerBar,
    teacherNotice,
    studentNotice
  }
}
</script>

<style scoped>
.homeworkList .container>.wrapper {
  overflow: scroll;
  height: calc(100vh - 45px);
  box-sizing: border-box;
  background: #f5f7f8;
}
</style>
