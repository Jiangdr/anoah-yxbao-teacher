<template>
  <div class="spa">
    <div class="top">
      <div @click="message">
        <i class="red-icon" v-if="newMsg"></i>
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
        <span class="font-h4">近一个月{{version}}</span>
      </div>

      <div class="scroll">
        <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="offset" :immediate-check="false" >
            <div v-if="list.length===0 && !refreshLoading && !loading" class="no-data">
              <img :src="imgUrl('no-data')" alt="">
              <p>暂无待处理事项</p>
            </div>

              <div class="item" v-for="(item, index) in list" :key="index"  v-else>
                <div class="font-h2 one">{{item.title}}</div>
                <div class="flex">
                  <div class=" font-h3 l ">{{item.task_prompt}}</div>
                  <div class=" btn bg-blue btn-width r">待批改</div>
                </div>

                <div class="c font-h4 ">{{item.class_name}}</div>
                <div class="t font-h4 ">{{item.time}}</div>
              </div>
              <div style="height:20px;"></div>

          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <footer-bar activeType="home" @tabChange="tabChange"></footer-bar>
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
import footerBar from '@/components/footerBar'
import api from '@/axios/iclass'
import homeApi from '@/module/home/axios/home'
import { mapGetters, mapState } from 'vuex'
import { Dialog } from 'vant'
import mqtt from '@/utils/LMQqtt.js'
export default {
  name: 'Home',
  data() {
    return {
      version: window.version,
      active: 0,
      showPopup: false,
      loading: false,
      refreshLoading: false,
      finished: false,
      offset: 0,

      page: 1, // 页码
      per_page: 20, // 每页显示条数

      list: [],
      totalPage: 0
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    }),
    ...mapState({
      'newMsg': state => state.notice.newMsg
    })
  },
  created() {
    console.log(mqtt)
    this.onRefresh();
    mqtt.connect();
  },
  methods: {
    imgUrl(name) {
      return require('@/assets/images/homeworkDetail/' + name + '.png')
    },
    message() {
      this.$store.commit('notice/setMsg', false)
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
    onLoad() {
      console.log('onload');
      this.getItems();
    },
    onRefresh() {
      console.log('onRefresh');
      this.getItems(true);
    },
    getItems(isRefresh) {
      if (isRefresh === true) {
        this.finished = true;
        // this.list.splice(0, this.list.length);
        this.page = 1;
      }

      let data = {
        page: this.page,
        per_page: this.per_page,
        user_id: this.userId
      }

      homeApi.task(data).then(r => {
        this.page++;
        if (isRefresh === true) {
          this.refreshLoading = false;
          this.list = r.lists;
        } else {
          for (var i = 0; i < r.lists.length; i++) {
            this.list.push(r.lists[i]);
          }
          this.loading = false;
        }
        if (r.lists.length === 0) {
          this.finished = true;
        } else {
          this.finished = false;
        }
      });
    },
    tabChange(type) {
      if (type === 'home') {
        return false
      }
      this.$router.push({path: '/user-center'})
    }

  },
  components: {
    footerBar
  }

}
</script>
<style lang="scss" scoped>
@import "@/style/base.scss";
.spa {
  background-image: url("../../assets/images/home/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.top {
  padding-top: 3vh;
  height: 8vh;
  text-align: right;

  & > div {
    display: inline-block;
    padding: 7px;
    position: relative;
    .red-icon {
      display: inline-block;
      width: 7px;
      height: 7px;
      background: url("../../assets/images/public/red-icon.png") no-repeat;
      background-size: 100% auto;
      position: absolute;
      top: 7px;
      right: 7px;
    }
  }

  .icon {
    width: 21px;
    height: 20px;
  }
}

.pannel {
  background: $white;
  width: 96%;
  // margin: $gap-small;
  border-radius: 15px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin: 0 auto;

  .line {
    height: 1px;
    width: 80%;
    background-color: $gray5;
    padding: 0;
    margin: 0 auto;
    opacity: 0.4;
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

  div.font-h1 {
    width:96%;
    margin:0 auto;
    padding:8px 0;
  }

  span.font-h4 {
    color: $gray5;
    padding: 0 6px;
  }

  .van-list,.van-pull-refresh {
     min-height: calc(100vh - 358px);
  }

  .scroll {
    height: calc(100vh - 358px);
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0 13px;
    margin: 0 -13px;
  }

  .no-data {
    text-align: center;
  }

  .item {
    box-sizing: border-box;
    background: $white;
    border-radius: 5px;
    width: 96%;
    margin: $gap-small-x auto 0;
    padding: $gap-small-x;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

    .flex {
      justify-content: center;
      height: 30px;
      align-items: center;

      .l {
        flex: 4 2 0;
      }
      .r {
        flex: 1 1 0;
      }
    }

    .t,
    .c {
      display: inline-block;
      color: $gray4;
    }
    .t {
      padding-right: 10px;
    }

    .btn {
      height: 25px;
      line-height: 25px;
      width: 65px;
      font-size: $font-size-small;
      border-radius: 25px;
    }

    .font-h3{
      color:$gray4;
    }
  }

  .item > div:not(:first-child) {
    padding-top: $gap-small;
  }
}

.run-env > div {
  text-align: center;
  height: 38px;
  line-height: 38px;
  border-bottom: 1px solid #ccc;
}
</style>
