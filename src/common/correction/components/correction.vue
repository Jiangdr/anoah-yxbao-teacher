<template>
  <div class="correction">
    <div class="van-hairline--bottom title">纠错</div>
    <div class="classify">
      <van-row>
        <van-col span="8">内容超纲</van-col>
        <van-col span="8">答案错误</van-col>
        <van-col span="8">题干错误</van-col>
      </van-row>
      <van-row>
        <van-col span="8">题目过时</van-col>
        <van-col span="8">解析错误</van-col>
        <van-col span="8">知识点不符</van-col>
      </van-row>
      <van-row>
        <van-col span="8">其他</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  computed: {},
  methods: {}
}

</script>
<style scoped>
  .correction>.title {
    text-align: center;
  }

  .correction>.classify {
    text-align: center;
  }

</style>
