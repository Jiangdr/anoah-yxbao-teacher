<template>
<!-- 接收参数 发布ID：publishId、课时资源ID:resourceId、试题ID：questionId、实体ID：entityId-->
<!-- 接收函数  关闭弹出框：toggle   回调函数：callback -->
<van-popup
  v-model="correct"
  class="tip-popup van-hairline--surround"
>
  <div class="tip-container">
    <van-row class="title van-hairline--bottom">
      <van-col
        span="18"
        offset="3"
      >
        <h2>
          以下操作针对本题中的待批改题目
        </h2>
        <!-- <h2 v-else>
            以下操作针对本题中的待批改题目
          </h2> -->
        </van-col>
        <van-col span="3">
          <p @click="toggle">x</p>
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
export default {
  name: 'itemCorrect',
  props: ['publishId', 'resourceId', 'questionId', 'entityId'],
  data() {
    return {
      correct: true,
      teacherId: JSON.parse(localStorage.userinfo).userid
    }
  },
  mounted() {},
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    commit(type) {
      let params = {
        publish_id: this.publishId,
        course_resource_id: this.resourceId,
        qti_question_id: this.questionId,
        dcom_entity_id: this.entityId,
        teacher_id: this.teacherId,
        type: type
      }
      let api = new API();
      api.fetch('/jwt/homework/correct/batchMarkForMinRs', params).then((r) => {
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

.tip-container .warm {
  font-size: 14px;
  text-align: center;
  padding-bottom: 20px;
}
</style>
