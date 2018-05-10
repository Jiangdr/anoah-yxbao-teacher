<template>
  <div class="spa">
    <topbar title="首页" text="">
      <van-icon name="sign" @click="aa" />
      <van-icon name="search" @click="bb" />
    </topbar>

    <cube-button>Button</cube-button>
<cube-button type="submit">Submit Button</cube-button>

    <van-row>
      <van-col span="12">
        <van-button type="primary" block>互动课堂</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" block @click="goHomework">作业</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" block @click="change">我的</van-button>
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
        <van-button type="primary" block @click="linkQaAnswer">问答</van-button>
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

  </div>
</template>

<script>
import topbar from '@/components/common/topbar'
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      list: [],
      loading: false,
      refreshLoading: false,
      finished: false
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    })
  },
  methods: {
    linkQaAnswer () {
      let href
      if (window.navigator.userAgent.indexOf('iPhone') > -1) {
        href = "/qa/www/index_ios.html?param=" + encodeURIComponent(JSON.stringify({
          userid: parseInt(this.userId),
          domain: window.location.host.replace('http:\\', ''),
          status: 1,
          lasthref: window.location.href
        }))
      } else {
        href = "/qa/www/index.html?param=" + encodeURIComponent(JSON.stringify({
          userid: parseInt(this.userId),
          domain: 'http://e.dev.anoah.com',
          status: 1,
          lasthref: window.location.href
        }))
      }
      if (window.TeacherUtil && window.TeacherUtil.loadUrl) {
        window.TeacherUtil.loadUrl(href)
        return false
      }
      window.location.href = href
      return false
    },
    aa () {
      alert(1)
    },
    bb () {
      alert(2)
    },

    goHomework () {
      this.$router.push({
        path: '/homework'
      })
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
