<template>
  <div class="spa">
    <div class="top">
      <div @click="message">
        <i class="icon message"></i>
      </div>
      <div @click="showPopup =true">
        <i class="icon scan"></i>
      </div>
    </div>

    <div class="pannel">
      <div>
        <div @click="go('iclass')">
          <i class="icon iclass"></i>
          <span class="font-h2">互动课堂</span>
        </div>
        <div @click="go('homework')">
          <i class="icon homework"></i>
          <span class="font-h2">作业</span>
        </div>
      </div>
      <div class="line"></div>
      <div>
        <div>
          <i class="icon wrong"></i>
          <span class="font-h4">错题本</span>
        </div>
        <div>
          <i class="icon iclass-record"></i>
          <span class="font-h4">课堂记录</span>
        </div>
        <div @click="go('qa')">
          <i class="icon ask"></i>
          <span class="font-h4">问答</span>
        </div>
      </div>
    </div>

    <div class="todo-box">
      <div class="font-h1">待处理
        <span class="font-h4">近一个月</span>
      </div>
      <cube-scroll ref="scroll" :data="items" :options="options" @pulling-down="onRefresh" @pulling-up="onLoad">
        <template slot="pulldown" slot-scope="props">
          <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper" :style="props.pullDownStyle">
            <div v-if="props.beforePullDown" class="before-trigger" :style="{paddingTop: props.bubbleY + 'px'}">
              <span :class="{rotate: props.bubbleY > 40}">↓</span>
            </div>
            <div class="after-trigger" v-else>
              <div v-if="props.isPullingDown" class="loading">
                <cube-loading></cube-loading>
              </div>
              <div v-else>
                <span>刷新成功</span>
              </div>
            </div>
          </div>
        </template>
      </cube-scroll>
    </div>

    <van-tabbar v-model="active" @change="change" class="bar">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="chat">我的</van-tabbar-item>
    </van-tabbar>

    <van-popup v-model="showPopup" position="bottom" class="run-env" :overlay="true" :lock-scroll="true">
      <div @click="getEnv('.dev')">dev</div>
      <div @click="getEnv('.dt')">dt</div>
      <div @click="getEnv('.test')">test</div>
      <div @click="getEnv('.t')">t</div>
      <div @click="getEnv('')">外网</div>
    </van-popup>

  </div>
</template>

<script>
import topbar from '@/components/common/topbar'
import api from '@/axios/iclass'
import { mapGetters } from 'vuex'
import { Dialog } from 'vant'
export default {
  name: 'Home',
  data() {
    return {
      items: [],
      loading: false,
      refreshLoading: false,
      finished: false,
      active: 0,
      showPopup: false,
      options: {
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '已经显示全部'
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    })
  },
  methods: {
    message() {
      this.$router.push({
        name: 'notice',
        params: { role: 'teacher' }
      })
    },
    scan() {
      alert('扫码')
    },

    getEnv(env) {
      // window.runEnv = env;
      this.showPopup = false;
      this.$store.dispatch('runEnv/changeEnv', env);
    },

    go(type) {
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
    onClickLeft() {

    },
    onClickRight() {

    },
    onLoad() {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // If have new data, just update the data property.
          let newPage = [
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex
          ]
          this.items = this.items.concat(newPage)
        } else {
          // If no new data, you need use the method forceUpdate to tell us the load is done.
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    onRefresh() {
      setTimeout(() => {
        this.items = [];
        let newPage = [
          'I am line ' + ++this.itemIndex,
          'I am line ' + ++this.itemIndex,
          'I am line ' + ++this.itemIndex,
          'I am line ' + ++this.itemIndex,
          'I am line ' + ++this.itemIndex
        ]
        this.items = newPage;
      }, 500)
    },
    change() {
      this.$router.push({ name: 'userCenter' })
    }

  },
  components: {
    topbar

  }

}
</script>
<style lang="scss" scoped>
@import "@/style/base.scss";
.spa {
  background: url("../../assets/images/home/bg.jpg") no-repeat;
  background-size: 100% auto;
}
.top {
  padding-top: 3vh;
  height: 8vh;
  text-align: right;
  & > div {
    display: inline-block;
    padding: 7px;
  }

  .icon {
    width: 21px;
    height: 20px;
  }
}

.pannel {
  background: $white;
  width: 100%;
  // margin: $gap-small;
  border-radius: 8px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;

  .line {
    height: 1px;
    width: 80%;
    background-color: $gray5;
    padding: 0;
    margin: 0 auto;
    opacity: 0.8;
  }

  & > div {
    padding: 10px;
    display: flex;
    justify-content: center;
    text-align: center;
    height: 70px;
    align-items: center;
  }

  & > div > div {
    flex: 1 0 0;

    span {
      padding: 5px;
    }
  }

  .iclass,
  .homework {
    width: 50px;
    height: 50px;
    vertical-align: middle;
  }

  .iclass-record,
  .wrong,
  .ask {
    width: 35px;
    height: 35px;
    vertical-align: middle;
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}

.todo-box {
  margin-top: 18px;
  span.font-h4 {
    color: $gray5;
    padding: 0 12px;
  }
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

.run-env > div {
  text-align: center;
  height: 38px;
  line-height: 38px;
  border-bottom: 1px solid #ccc;
}
</style>
