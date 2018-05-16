<template>
  <div class="groupDetail">
    <div class="title border-bottom-1px">
      <van-row>
        <van-col span="2">
          <span class="back" @click="goBack">
              <van-icon name='arrow-left'></van-icon>
              </span>
        </van-col>
        <van-col span="18">
          <span class="text">组件详情</span>
        </van-col>
        <van-col span="4"></van-col>
      </van-row>
    </div>
    <div class="title-bar">
      <van-row>
        <van-col span="16">
          <span v-html="title"></span>
        </van-col>
        <van-col span="8" class="info-right">
          正确率：<span class="correct">{{correct}}</span>
        </van-col>
      </van-row>
    </div>
    <div class="wrapper">
      <div class="van-hairline--bottom">
        <van-row>
          <van-col span="8">姓名</van-col>
          <van-col span="8">答案</van-col>
          <van-col span="8">结果</van-col>
        </van-row>
      </div>
      <div>
        <div v-for="(user,index) in users" :key="index" v-if="user.status>=3" class="van-hairline--bottom">
          <van-row >
            <van-col span="8">{{user.real_name}}</van-col>
            <van-col span="8">{{decodeURI(user.answer.items[0][0].fact_entity)}}</van-col>
            <van-col span="8" :class='user.answer.items[0][1]'>{{user.answer.items[0][1]==="right"?'正确':'错误'}}</van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'groupDetail',
  data() {
    return {
      title: this.$route.params.name,
      users: this.$route.params.data,
      correctRate: this.$route.params.correct_rate
    }
  },
  computed: {
    correct() {
      if (this.correctRate === '') {
        return '--'
      } else {
        return Math.round(this.correctRate * 100) + '%'
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .groupDetail>.title {
    text-align: center;
    line-height: 50px;
    height: 50px;
  }

  .groupDetail>.title .back {
    display: inline-block;
    float: left;
  }

  .groupDetail>.title .text {
    display: inline-block;
    width: calc(100% - 100px);
    font-weight: 600;
  }

  .groupDetail>.title-bar {
    padding: 0 10px;
    line-height: 50px;
    height: 50px;
    box-sizing: border-box;
  }

  .groupDetail>.title-bar .info-right {
    text-align: right;
  }

  .groupDetail>.title-bar .info-right .correct {
    color: #ff4e00;
  }
.groupDetail>.wrapper{
  text-align: center;
  line-height: 50px;
}
</style>
