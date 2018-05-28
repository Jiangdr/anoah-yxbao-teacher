<template>
<div class="homeworkList">
  <div class="title">
    <header-bar @back="goBack">
        <div slot="title-name">
          <div>作业通知</div>
        </div>
        <div slot="right-area">
          <i @click="clear" :class="{disable:this.list.length<=0}" class="clear" :style="{'background-image':'url('+imgUrl('clear')+')'}"></i>
        </div>
      </header-bar>
  </div>
    <div class="container">
      <div class="wrapper">
      <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
          <div v-if="list.length===0" class="no-data">
            <img :src="imgUrl('nodata')" alt="">
            <p>暂时还没有通知哦～</p>
          </div>
          <homework-notice-list :list="list" v-else></homework-notice-list>
        </van-list>
      </van-pull-refresh>
      </div>
    </div>
</div>
</template>

<script>
import notice from '../axios/notice.js'
import headerBar from '@/components/headerBar.vue'
import homeworkNoticeList from './common/teacherNotice.vue'
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
    clear() {
      if (this.list.length <= 0) {
        return false;
      }
      let params = {
        user_id: this.params.user_id
      }
      notice.clearMsg(params).then(r => {
        if (r.rs) {
          this.list.splice(0)
        }
      })
    },
    imgUrl(name) {
      return require('@/assets/images/notice/' + name + '.png')
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
    homeworkNoticeList
  }
}
</script>

<style scoped>
.homeworkList{
  height: 100%;
}
.homeworkList .title .clear{
  display: inline-block;
  width:20px;
  height: 20px;
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  vertical-align: middle;
}
.homeworkList .container{
  height: calc(100% - 45px);
}
.homeworkList .container>.wrapper {
  overflow: scroll;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 13px;
  background: #f5f7f8;
}
.homeworkList .container .no-data{
  text-align: center;
  margin-top:25vh;
}
.homeworkList .container .no-data img{
  width:100px;
}
</style>
