<template>
  <div class="spa">
    <topbar title="首页" text="" :isHome="true" >
      <van-icon class="icon" name="sign" @click="message" />
      <van-icon class="icon" name="search"  @click="showPopup =true"/>
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

  <van-popup v-model="showPopup" position="bottom" class="run-env" :overlay="true" :lock-scroll="true">
    <div @click="getEnv('.dev')">dev</div>
       <div  @click="getEnv('.dt')">dt</div>
          <div  @click="getEnv('.test')">test</div>
             <div @click="getEnv('.t')">t</div>
              <div  @click="getEnv('')">外网</div>
</van-popup>

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
      active: 0,
      showPopup: false
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    })
  },
  methods: {
    message () {
      this.$router.push({
        path: '/notice'
      })
    },
    scan () {
      alert('扫码')
    },

    getEnv(env) {
      // window.runEnv = env;
      this.showPopup = false;
      this.$store.dispatch('runEnv/changeEnv', env);
    },

    go (type) {
      // 代码走本地
      let href = window.location.href.split('#')[0]
      let userInfo = JSON.parse(localStorage.getItem('user'))
      let baseUrl = ''
      let param = {}
      // 作业
      if (type === 'homework') {
        this.$router.push({
          path: '/homework'
        })

        // 互动课堂
      } else if (type === 'iclass') {
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
            param = JSON.stringify({
              apiDomain: window.bus.$store.getters['runEnv/old'], // api地址
              jsDomain: '', // js地址
              userInfo: userInfo, // 用户信息
              referer: window.location.href, // 回跳地址
              time: new Date().getTime()
            });
            baseUrl = href + "/../../TP/index" + (window.platform ? '-' + window.platform : '') + ".html";
            href = baseUrl + "?param=" + encodeURIComponent(param)
            if (window.TeacherUtil && window.TeacherUtil.loadUrl) {
              window.TeacherUtil.loadUrl(href);
              return;
            }
            window.location.href = href;
          }
        })
      // 问答
      } else if (type === 'qa') {
        param = JSON.stringify({
          userid: parseInt(this.$store.state.account.userInfo.userid),
          domain: window.bus.$store.getters['runEnv/old'],
          domain_icom: href + "/../../QA",
          status: 1,
          lasthref: window.location.href,
          time: new Date().getTime()
        });
        baseUrl = href + "/../../QA/index" + (window.platform ? '-' + window.platform : '') + ".html";
        // cordova.exec(null, null, "HaleyPlugin", "startNewHtmlWithURL", [href]);
        href = baseUrl + "?param=" + encodeURIComponent(param)
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

.run-env  >div{
  text-align:center;
  height:38px;
  line-height:38px;
border-bottom:1px solid #ccc;
}
</style>
