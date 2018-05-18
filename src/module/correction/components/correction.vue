<template>
<div class="correction">
  <div class="title border-bottom-1px">
    <span
      class="back"
      @click="goBack"
    >
      <van-icon name="arrow-left"></van-icon>
      <span>返回</span>
      </span>
      <span class="text">纠错</span>
  </div>
  <div class="classify">
    <div>
      <span
        v-for="(item,index) in classify"
        :key="index"
        :class="{'checked':isChecked(item)}"
        @click="checkItem(item)"
      >
        {{item}}
        </span>
    </div>
  </div>
  <div class="describe">
        <!-- <textarea ></textarea> -->
        <textarea
          name="describe"
          v-model="msg"
          placeholder="请描述错误内容，我们会尽快处理"
          :maxlength=maxLength
        ></textarea>
  </div>
  <div class="upload">
    <van-row class="total">
      <van-col
        span="22"
        offset="1"
      >
        上传问题截图<span class="num">（<b>{{imgs.length}}</b>/8）</span>
        </van-col>
    </van-row>
    <van-row>
      <van-col
        offset="1"
        span="2"
      >
        <i
          class="cubeic-alert"
          @click="togglePopup"
        ></i>
          </van-col>
    </van-row>
  </div>
  <cube-popup
    type="my-popup"
    :center="false"
    ref="myPopup"
    v-show="this.showPopup"
    @mask-click="togglePopup"
  >
    <div class="popupWrapper">
      <div class="border-bottom-1px popupItem">拍照</div>
      <div class="border-bottom-1px popupItem">从相册获取</div>
      <div
        class="border-bottom-1px popupItem"
        @click="togglePopup"
      >取消</div>
</div>

</cube-popup>
<div class="submitBtn">
  <!-- <van-button type="primary" bottom-action>提交</van-button> -->
  提交
</div>
</div>
</template>

<script>
export default {
  name: 'correction',
  data() {
    return {
      msg: '',
      imgs: [],
      classify: [
        '内容超纲',
        '答案错误',
        '题干错误',
        '题目过时',
        '解析错误',
        '知识点不符',
        '其他'
      ],
      checked: [],
      showPopup: false,
      maxLength: 100
    }
  },
  created() {},
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    togglePopup() {
      this.showPopup = !this.showPopup
    },
    isChecked(item) {
      return this.checked.indexOf(item) >= 0
    },
    checkItem(item) {
      if (this.checked.indexOf(item) < 0) {
        this.checked.push(item)
      } else {
        this.checked.splice(this.checked.indexOf(item), 1)
      }
    }
  }
}
</script>

<style scoped>
.correction {
  height: 100vh;
}

.correction>.title {
  text-align: center;
  line-height: 50px;
  height: 50px;
  padding: 0 13px;
}

.correction>.title .back {
  display: inline-block;
  float: left;
}

.correction>.title .text {
  display: inline-block;
  width: calc(100% - 100px);
  font-weight: 600;
}

.correction>.title p {
  font-weight: bold;
}

.correction>.title>span {
  float: left;
}

.correction>.title span i {
  top: 2px;
}

.correction>.classify {
  text-align: center;
  padding: 18px 13px 0px;
}

.correction>.classify>div{
  display: flex;
  flex-wrap: wrap;
}
.correction>.classify>div>span{
  display: inline-block;
  width:110px;
  height: 40px;
  flex:0 auto auto;
  line-height: 40px;
  border-radius: 5px;
  background: rgb(246,247,249);
  margin-right: 9px;
  margin-bottom: 18px;
}
.correction>.classify>div>span:nth-child(3),
.correction>.classify>div>span:nth-child(6){
  margin-right: 0px;
}
.correction>.classify>div>span.checked{
  background: rgb(118,189,255);
  color:#fff;
}
.correction>.describe{
  padding:0 13px;
  margin-bottom: 10px;
}
.correction>.describe textarea {
  width: 100%;
  height: 148px;
  resize: none;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  border:1px solid rgb(231,235,238);
}

.correction>.describe ::placeholder {
  color: #ccc;
}

.correction>.upload>.total {
  margin: 8px 0;
}

.correction>.upload>.total b {
  font-weight: normal;
}
.correction>.upload>.total span.num{
  color:rgb(128,129,131);
}
.correction .popupItem {
  line-height: 50px;
  text-align: center;
}

.correction .popupWrapper {
  background: #fff;
}

.correction .cube-popup-content {
  background: #fff;
}

.correction>.submitBtn {
  position: fixed;
  bottom: 34px;
  width: calc(100% - 75px);
  left:calc(75px / 2);
  border-radius: 10px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: rgb(11,189,137);
  color:#fff;
}
</style>
