<template>
  <van-popup v-model="answer" class="urge-popup">
        <div class="urge-container">
          <p>公布答案后，学生完成作答后可查看题目答案和解析，是否公布答案</p>
          <div class="btn-group">
            <p class="cancel" @click="toggle">取消</p>
            <p class="confirm" @click="confirm">确认</p>
          </div>
        </div>
        </van-popup>
</template>
<script>
import homeworkDetil from "../../axios/detail.js";
export default{
  name: 'answer',
  props: ['publishId', 'classID', 'teacherId'],
  data() {
    return {
      answer: true
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    confirm() {
      let params = {
        'publish_id': this.publishId,
        'class_id': this.classID,
        'teacher_id': this.teacherId
      }
      // homeworkDetil.sendAnswer(params).then((r) => {
      //   console.log(r)
      // })
      this.toggle()
    }
  }
}
</script>
<style scoped>
  .urge-popup {
    width: calc(100vw - 40px);
    border-radius: 10px;
    padding: 30px 20px;
    box-sizing: border-box;
  }
  .urge-container>p{
    line-height: 25px;
  }
  .btn-group{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  .btn-group>p{
    width:90px;
    color:#fff;
    height: 40px;
    line-height: 40px;
    background: #999;
    border-radius: 5px;
    text-align: center;
  }
  .btn-group>p.confirm{
    background: #169db5
  }
</style>
