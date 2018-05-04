<template>
  <div class="spa">
    <topbar title="" text="">
      <van-icon name="sign" @click="message" />
      <van-icon name="search" @click="scan" />
    </topbar>

    <van-row>
      <van-col span="12">
        <van-button type="primary" block>互动课堂</van-button>
      </van-col>
      <van-col span="12">
        <van-button type="primary" block @click="tt">作业</van-button>
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
        <van-button type="primary" block>问答</van-button>
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

  },
  methods: {
    message () {
      alert('消息')
    },
    scan () {
      alert('扫描')
    },

    tt () {
      this.$router.push({
        path: '/list'
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

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.$toast('刷新成功')
        this.refreshLoading = false
        this.finished = false
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
.van-list {
  height: calc(100vh - 62vw);
  overflow-y: scroll;
}
.van-icon {
  font-size: 18px;
  padding: 0 5px;
}
</style>
