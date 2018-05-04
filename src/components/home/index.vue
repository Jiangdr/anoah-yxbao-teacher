<template>
  <div class="spa">
    <topbar title="首页" text="">
      <van-icon name="sign" @click="aa" />
      <van-icon name="search" @click="bb" />
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
      finished: false
    }
  },
  computed: {

  },
  methods: {
    aa () {
      alert(1)
    },
    bb () {
      alert(2)
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
        this.finished = false
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.$toast('刷新成功')
        this.refreshLoading = false
      }, 500)
    },
    change (active) {
      this.active = active
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
  height: calc(100vh - 180px);
  overflow-y: scroll;
}
</style>
