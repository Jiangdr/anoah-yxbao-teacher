
<template>
<!-- 接收参数 发布ID：publishId、是否发送结果给学生：send/ 0:不发送，1:发送 -->
<!-- 接收函数  关闭弹出框：toggle   回调函数：callback -->
  <van-popup v-model="correct" class="tip-popup van-hairline--surround">
    <div class="tip-container">
      <van-row class="title van-hairline--bottom">
        <van-col span="18" offset="3">
          <h2>
            以下操作针对全部待批改的题目
          </h2>
          <!-- <h2 v-else>
            以下操作针对本题中的待批改题目
          </h2> -->
        </van-col>
        <van-col span="3"><p @click="toggle">x</p></van-col>
      </van-row>

      <div class="tip-content">
        <p @click="commit(1)">
          标记为已阅
        </p>
        <p @click="commit(2)">
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
import API from '@/axios/_api'
import { Toast } from 'vant'
export default{
  name: 'correct',
  props: ['publishId', 'send'],
  data() {
    return {
      correct: true,
      teacherId: JSON.parse(localStorage.userinfo).userid
    }
  },
  mounted() {
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    commit(type) {
      let params = {
        publish_id: this.publishId,
        teacher_id: this.teacherId,
        type: type,
        send: this.send
      }
      let api = new API();
      api.fetch('/jwt/homework/correct/batchMark', params).then((r) => {
        if (r.hasNoComment) {
          Toast('有学生作业没有互评！')
          this.toggle()
          return false
        }
        this.$emit('callback');
        this.toggle()
      })
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
