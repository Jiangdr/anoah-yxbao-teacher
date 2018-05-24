<template>
<div class="homeworkList">
  <div class="title">
    <header-bar>
        <div slot="title-name">
          <div>作业通知</div>
        </div>
      </header-bar>
  </div>
    <div class="container">
      <div class="wrapper">
      <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad" immediate-check="false">
          <div v-for="(item, index) in list" :key="index" class="item">
              <div class="date">{{item.push_time}}</div>
              <div class="container">
                <p class="title"><i class="icon"></i>{{item.title}}</p>
                <div class="content" v-html="item.content"></div>
              </div>
          </div>
        </van-list>
      </van-pull-refresh>
      </div>
    </div>
</div>
</template>

<script>
import notice from '../axios/notice.js'
import headerBar from '@/components/headerBar.vue'

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
        role: 'teacher',
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
        for (let i = 0; i < r.list.length; i++) {
          this.list.push(r.list[i])
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
    headerBar
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

.homeworkList .container>.wrapper>.date {
  text-align: center;
}

.item .date{
  height: 30px;
  line-height: 30px;
  margin: 10px;
  text-align: center;
}
.item .container{
  margin: 0 13px;
  background: #fff;
  padding:13px;
  border-radius: 8px;
  line-height: 25px;
}
.item .container .title{
  height: 35px;
  line-height: 35px;
}
.item .container .title .icon{
  display: inline-block;
  height: 20px;
  width:20px;
  background-image: url('./images/icon.png');
  background-position: center center;
  background-size: 100% 100%;
  vertical-align: text-top;
  margin-right: 5px;
}
</style>
