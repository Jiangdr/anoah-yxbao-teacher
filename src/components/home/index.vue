<template>
  <div class="spa">
    <topbar title="首页" text="">
      <van-icon class="icon" name="sign" @click="message" />
      <van-icon class="icon" name="search" @click="scan" />
    </topbar>
    <van-row>
      <van-col span="12">
        <van-button type="primary" block @click="go('iclass')">互动课堂</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" block @click="go('homework')">作业</van-button>
      </van-col>
    </van-row>
    <div class="space"></div>
    <van-row>
      <van-col span="8">
        <van-button type="primary" block>错课本</van-button>
      </van-col>
      <van-col span="8">
        <van-button type="primary" block>课堂记录</van-button>
      </van-col>
      <van-col span="8">
        <van-button type="primary" block @click="go('qa')">问答</van-button>
      </van-col>
    </van-row>

    <div>
      <div>待处理</div>
      <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item + ''" />
        </van-list>
      </van-pull-refresh>
    </div>

    <van-tabbar v-model="active" @change="change" class="bar">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="chat">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import topbar from '@/components/common/topbar'
import api from '@/axios/iclass'
import {mapGetters} from 'vuex'
import {Dialog} from 'vant'
export default {
  name: 'Home',
  data () {
    return {
      list: [],
      loading: false,
      refreshLoading: false,
      finished: false,
      active: 0
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    })
  },
  methods: {
    message () {
      alert('消息')
    },
    scan () {
      alert('扫码')
    },

    go (type) {
      // 代码走本地
      let localCode = window.location.protocol === 'file:';
      let localUrl = 'file:///android_asset/www/';
      let href = '';
      let userInfo = JSON.parse(localStorage.getItem('user'))
      // 互动课堂
      if (type === 'iclass') {
        api.judgeIclassLive({
          teacher_id: this.userId
        }).then(succ => {
          if (!succ.length) {
            Dialog.alert({
              message: '请确认电脑端已“开始上课”'
            }).then(() => {
              // on close
            });
          } else {
            let param = JSON.stringify({
              userid: parseInt(this.$store.state.account.userInfo.userid),
              domain: 'http://e.dev.anoah.com',
              userInfo: userInfo,
              lasthref: window.location.href
            });
            let baseUrl = localCode ? localUrl + "TP/index.html" : this.config.origin + '/ebag/iclass/teacher2/index.html'
            // let baseUrl = 'http://192.168.41.157/company/ebag/iclass/teacher2/index.html'
            href = baseUrl + "?param=" + encodeURIComponent(param);
            if (window.TeacherUtil && window.TeacherUtil.loadUrl) {
              window.TeacherUtil.loadUrl(href);
              return;
            }
            window.location.href = href;
          }
        })
      // 作业
      } else if (type === 'homework') {
        this.$router.push({
          path: '/homework'
        })
      // 问答
      } else if (type === 'qa') {
        let param = JSON.stringify({
          userid: parseInt(this.$store.state.account.userInfo.userid),
          domain: 'http://e.dev.anoah.com',
          domain_icom: 'file:///android_asset/www/QA',
          status: 1,
          lasthref: window.location.href
        });
        let baseUrl = localCode ? localUrl + "QA/index.html" : this.config.origin + '/qa/www/index.html'
        href = baseUrl + "?param=" + encodeURIComponent(param);
        if (window.TeacherUtil && window.TeacherUtil.loadUrl) {
          window.TeacherUtil.loadUrl(href);
          return;
        }
        window.location.href = href;
      }
    },
    onClickLeft () {

    },
    onClickRight () {

    },
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.list = []
        this.finished = false
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.$toast('刷新成功')
        this.refreshLoading = false
      }, 500)
    },
    change () {
      this.$router.push({ name: 'userCenter' })
    }

  },
  components: {
    topbar

  }

}
</script>
<style scoped>
.icon{
  font-size:18px;
  padding:10px;
}
.space {
  height: 20px;
}
.van-pull-refresh {
  height: calc(100vh - 62vw);
}
.van-list {
  height: calc(100vh - 180px);
  overflow-y: scroll;
}
</style>
