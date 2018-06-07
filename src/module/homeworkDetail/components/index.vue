<template>
  <div id="homework-content">
    <header-bar @back="back">
      <div slot="title-name" class="tab">
        <span class="tab-item" :class="{active: tabType === 'detail'}" @click="tabChange('detail')">作业详情</span>
        <span class="tab-item" :class="{active: tabType === 'report'}" @click="tabChange('report')">作业报告</span>
      </div>
      <div slot="right-area" class="more-btn">
        <span @click="toggleMorePopup">...</span>
      </div>
    </header-bar>
    <div v-if="!loading" class="content">
      <homework-report v-if="tabType === 'report'"></homework-report>
      <homework-detail v-if="tabType === 'detail'"
        :homeworkInfo="homeworkInfo"
        :resourceList="resourceList"
        :homeworkStatus="homeworkStatus"
        @getresource="getresource"
        >
        </homework-detail>
    </div>
    <div v-if="loading" class="place-holder">
      <i class="fa fa-spinner fa-spin"></i>
      <span>加载中...</span>
    </div>
    <more v-if="morePopup" @toggle="toggleMorePopup" :info="homeworkInfo" @back="back" :favorite="homeworkInfo.favorite" @collect="collect" :list="resourceList"></more>
  </div>
</template>
<script>
// 单个作业详情，包括作业详情和作业报告
import headerBar from '@/components/headerBar.vue'
import homeworkDetail from './homeworkDetail'
import homeworkReport from './homewordReport'
import more from './common/more.vue'
import homeworkDetil from '../axios/detail.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'HomeContent',
  data() {
    return {
      refresh: false,
      homeworkInfo: {}, // 作业信息
      resourceList: [], // 作业列表
      homeworkStatus: 0,
      tabType: 'detail',
      morePopup: false,
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      env: 'runEnv/old'
    })
  },
  mounted() {
    this.getresource();
  },
  activated() {
    if (this.refresh) {
      this.getresource()
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Homework' && from.name === 'homeworkDetail') {
        this.refresh = true
        this.tabType = 'detail'
      } else {
        this.refresh = true
      }
    }
  },
  methods: {
    ...mapMutations({
      saveHomeworkInfo: 'homeworkDetail/homeworkInfo',
      saveHomeworkQuestionInfo: 'homeworkDetail/homeworkQuestionInfo'
    }),
    // 返回
    back() {
      this.$router.back(-1)
    },
    // 顶部tab切换
    tabChange(type) {
      this.tabType = type
    },
    // 弹出或收起更多
    toggleMorePopup() {
      this.morePopup = !this.morePopup
    },
    // 获取作业详情所需资源
    getresource() {
      this.loading = true
      let params = {
        publish_id: this.$route.params.publishId,
        class_id: this.$route.params.classId
      };
      // 获取作业信息
      homeworkDetil.getinfo(params).then(succ => {
        this.loading = false
        succ.student_list.forEach(ele => {
          if (ele.avatar.indexOf('http://') === -1) {
            ele.avatar = this.env + ele.avatar
          }
        });
        this.saveHomeworkInfo(succ)
        this.homeworkInfo = succ
      })
      // 获取作业资源
      homeworkDetil.getResourceList(params).then(d => {
        this.resourceList = d.list
        this.homeworkStatus = d.status
        this.saveHomeworkQuestionInfo(d)
      })
    },
    // 收藏
    collect(num) {
      this.homeworkInfo.favorite = num
    }
  },
  components: {
    headerBar,
    homeworkDetail,
    homeworkReport,
    more
  }
}
</script>
<style lang="scss" scoped>
#homework-content{
  width: 100%;
  height: 100%;
  .tab{
    position: relative;
    left: 15px;
    display: inline-flex;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    width: 200px;
    font-size: 16px;
    color: #08b884;
    border: 1px solid #08b884;
    border-radius: 5px;
    overflow: hidden;
    .tab-item{
      flex: 1;
      text-align: center;
      &.active{
        background-color: #08b884;
        color: #fff;
      }
    }
  }
  .more-btn{
    line-height: 36px;
    font-size: 18px;
    font-weight: 800;
    color: #4e4e4e
  }
  .content{
    width: 100%;
    height: calc(100% - 45px);
    overflow: hidden;
    box-sizing: border-box;
  }
  .place-holder{
    text-align: center;
    @extend .content
  }
}
</style>
