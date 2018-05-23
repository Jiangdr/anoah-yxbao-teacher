<template>
  <div id="report-tab">
    <span class="tab-item" :class="{active: tabType === 1}" @click="reportTabChange(1)">全部成绩</span>
    <span class="tab-item" :class="{active: tabType === 2}" @click="reportTabChange(2)">答案情况</span>
    <span class="tab-item" :class="{active: tabType === 3}" @click="reportTabChange(3)">知识点分析</span>
  </div>
</template>
<script>
export default {
  name: 'ReportTab',
  props: ['tabType'],
  data() {
    return {}
  },
  methods: {
    reportTabChange(type) {
      this.$emit('tabChange', type)
    }
  }
}
</script>
<style lang="scss" scoped>
#report-tab{
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: space-around;
  padding: 0 13px;
  .tab-item{
    color: #4f4f50;
    font-size: 16px;
    &.active{
      color: #08b884;
      border-bottom: 2px solid #08b884;
    }
  }
}
</style>
