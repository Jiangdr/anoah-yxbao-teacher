
<template>
<!-- 接收参数 发布ID：publishId、是否发送结果给学生：send/ 0:不发送，1:发送 -->
<!-- 接收函数  关闭弹出框：toggle   回调函数：callback -->
  <van-popup v-model="correct" class="tip-popup van-hairline--surround">
    <div class="tip-container">
    <p @click="toggle" style="text-align:right">x</p>
      <van-row class="title">
        <van-col span="24">
          <p>
            以下操作针对全部待批改的题目
          </p>
        </van-col>
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
    width: calc(100vw - 85px);
    border-radius: 10px;
    padding:15px;
    box-sizing: border-box;;
  }
 .tip-popup[class*="van-hairline"]::after {
    border-radius: 20px;
  }

.tip-container>.title {
    line-height: 38px;
    text-align: center;
    font-weight: 400;
    font-size: 16px;
  }

.tip-container>.tip-content {
    text-align: center;
  }
.tip-container>.tip-content>p {
    line-height: 50px;
    margin-bottom: 15px;
    border:1px solid #08b783;
    color:#08b783;
    border-radius: 13px;
  }
  .tip-container .warm{
    font-size: 14px;
    text-align: center;
    padding-bottom: 20px;
  }
</style>
