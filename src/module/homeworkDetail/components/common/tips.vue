<template>
  <van-popup v-model="showTips" class="tip-popup van-hairline--surround">
    <div class="tip-container">
      <h2 class="title">班级平均正确率：</h2>
      <div class="tip-content">
        <p>
          班级正确率统计的是当前已经部分的学生平均正确率，未完成部分和已完成学生中暂未批改的题目暂不统计。
        </p>
        <div class="btn">
          <van-button size="large" @click="toggle">知道了~</van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script>
export default{
  name: 'tips',
  data() {
    return {
      showTips: true
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
  .tip-popup {
    width: calc(100vw - 40px);
    border-radius: 10px;
    padding:35px;
    box-sizing: border-box;
  }
  .tip-popup[class*="van-hairline"]::after {
    border-radius: 20px;
  }

  .tip-container>.title {
    font-weight: bold;
    font-size: 20px;
    line-height: 35px;
  }
  .tip-container>.tip-content>p {
    text-indent: 40px;
    line-height: 25px;
    font-size: 18px;
    margin-bottom: 30px;
    color:rgb(87,85,86)
  }
  .tip-container .btn{
    width:100px;
    margin:0 auto;
  }
  .tip-container .btn .van-button{
    border-radius: 10px;
    background: rgb(10, 184, 133);
    color:#fff;
    height: 45px;
    line-height: 45px;
  }
</style>
