<template>
  <van-popup v-model="correct" class="tip-popup van-hairline--surround">
    <div class="tip-container">
      <h2 class="title van-hairline--bottom">班级正确率</h2>
      <div class="tip-content">
        <p>
          班级正确率统计的是当前已经部分的学生平均正确率，未完成部分和已完成学生中暂未批改的题目暂不统计。
        </p>
        <van-button type="primary" size="large" @click="toggle">知道了</van-button>
      </div>
    </div>
  </van-popup>
</template>
<script>
export default{
  name: 'tips',
  props: ['resource'],
  data() {
    return {
      correct: true
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>
<style scoped>
  .detail .tip-popup {
    width: calc(100vw - 40px);
    border-radius: 10px;
  }
  .detail .tip-popup[class*="van-hairline"]::after {
    border-radius: 20px;
  }

  .detail .tip-container>.title {
    line-height: 60px;
    height: 60px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }

  .detail .tip-container>.tip-content {
    padding: 15px 20px;
  }

  .detail .tip-container>.tip-content>p {
    line-height: 25px;
    margin-bottom: 30px;
  }

</style>
