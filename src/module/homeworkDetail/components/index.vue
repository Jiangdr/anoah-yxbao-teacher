<template>
  <div id="homework-content">
    <header-bar>
      <div slot="title-name" class="tab">
        <span class="tab-item" :class="{active: tabType === 'detail'}" @click="tabChange('detail')">作业详情</span>
        <span class="tab-item" :class="{active: tabType === 'report'}" @click="tabChange('report')">作业报告</span>
      </div>
      <div slot="right-area" class="more-btn">
        <span>...</span>
      </div>
    </header-bar>
    <div class="content">
      <homework-report v-if="tabType === 'report'"></homework-report>
      <homework-detail v-if="tabType === 'detail'"></homework-detail>
    </div>
  </div>
</template>
<script>
// 单个作业详情，包括作业详情和作业报告
import headerBar from '@/components/headerBar.vue'
import homeworkDetail from './homeworkDetail'
import homeworkReport from './homewordReport'
export default {
  name: 'HomeContent',
  data() {
    return {
      tabType: 'report'
    }
  },
  methods: {
    tabChange(type) {
      this.tabType = type
    }
  },
  components: {
    headerBar,
    homeworkDetail,
    homeworkReport
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
}
</style>
