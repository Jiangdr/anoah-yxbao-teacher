<template>
<div class="share">
  <header-bar @back="goBack">
    <div slot="title-name">分享到班级空间</div>
    <div slot="right-area" @click="share">分享</div>
  </header-bar>
  <div class="wrapper">
    <textarea name="content"  placeholder="说点什么吧" :maxlength="maxLength" v-model="content"></textarea>
    <p>
      <span>还可以输入<b>{{maxLength-content.length}}</b>个字</span>
      <span class="clear" @click="clear">清空</span>
    </p>
    <div class="info">
      {{student}}的答案
    </div>
    <div class="answer">
      {{answer}}
    </div>
  </div>
</div>
</template>

<script>
import axios from './axios/share.js'
import headerBar from '@/components/headerBar.vue'
export default {
  name: "share",
  data() {
    return {
      content: '',
      maxLength: 120,
      classId: this.$route.classId,
      answer: this.$route.answer,
      studentInfo: this.$route.studentInfo
    }
  },
  computed: {
    title() {
      let teachr = JSON.parse(localStorage.userinfo).nicknm;
      return teachr + '分享了' + this.student + '的答案'
    },
    shareParma() {
      let param = {'userAnswer': this.studentInfo};
      return JSON.stringify(param)
    },
    student() {
      return JSON.parse(this.studentInfo).real_name
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    share() {
      let params = {
        class_id: this.classId,
        user_id: JSON.parse(localStorage.userinfo).userid,
        title: this.title,
        content: this.content,
        share_param: this.shareParma
      }
      axios.share(params).then(r => {
        console.log(r)
      })
    },
    clear() {
      this.content = "";
    }
  },
  components: {
    headerBar
  }
};
</script>

<style lang="scss">
.share{
  padding:0 13px;
  .wrapper{
    margin-top:13px;
    textarea{
      width: 100%;
      height: 148px;
      resize: none;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 10px;
      border:1px solid #e8ebee;
    }
    p{
      margin:10px auto;
      color:#4e4e50;
      font-size: 14px;
      b{
        color:#ff5266;
      }
      span.clear{
        float:right;
      }
    }
  }
  .info{
    margin:30px auto 20px;
  }
}
</style>
