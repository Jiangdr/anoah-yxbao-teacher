<template>
  <van-popup v-model="correct" class="tip-popup van-hairline--surround">
    <div class="tip-container">
      <van-row class="title van-hairline--bottom">
        <van-col span="18" offset="3">
          <h2  v-if="type==='all'">
            以下操作针对全部待批改的题目
          </h2>
          <h2 v-else>
            以下操作针对本题中的待批改题目
          </h2>
        </van-col>
        <van-col span="3"><p @click="toggle">x</p></van-col>
      </van-row>

      <div class="tip-content">
        <p>
          标记为已阅
        </p>
        <p>
          采用学生互评分数
        </p>
      </div>
      <div class="warm">
        *一键批阅后，后面新增学生评分将不被计算在内
      </div>
    </div>
  </van-popup>
</template>
<script>
export default{
  name: 'correct',
  props: ['resource', 'type'],
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
.tip-popup {
    width: calc(100vw - 40px);
    border-radius: 10px;
  }
 .tip-popup[class*="van-hairline"]::after {
    border-radius: 20px;
  }

.tip-container>.title {
    line-height: 60px;
    height: 60px;
    text-align: center;
    font-weight: 400;
    font-size: 16px;
  }

.tip-container>.tip-content {
    padding: 15px 20px;
    text-align: center;
  }
.tip-container>.tip-content>p {
    line-height: 25px;
    margin-bottom: 30px;
  }
  .tip-container .warm{
    font-size: 14px;
    text-align: center;
    padding-bottom: 20px;
  }
</style>
