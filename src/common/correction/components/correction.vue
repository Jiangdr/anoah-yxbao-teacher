<template>
<div class="correction">
    <div class="title van-hairline--bottom">
        <van-row>
            <van-col  span="24">
                <span class="back" @click="goBack">
                  <van-icon name="arrow-left"></van-icon>
                  <span>返回</span>
                </span>
                <span class="text">纠错</span>
            </van-col>
        </van-row>
    </div>
    <div class="classify">
        <van-row>
            <van-col span="6" class="van-hairline--surround" offset="1" >
              <div @click="checkItem($event)">内容超纲</div>
              </van-col>
            <van-col span="6" class="van-hairline--surround" offset="2">
               <div @click="checkItem($event)">答案错误</div>
            </van-col>
            <van-col span="6" class="van-hairline--surround" offset="2">
               <div @click="checkItem($event)">题干错误</div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="6" class="van-hairline--surround" offset="1">
              <div @click="checkItem($event)">题目过时</div>
              </van-col>
            <van-col span="6" class="van-hairline--surround" offset="2">
              <div @click="checkItem($event)">解析错误</div>
            </van-col>
            <van-col span="6" class="van-hairline--surround" offset="2">
              <div @click="checkItem($event)">知识点不符</div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="6" class="van-hairline--surround" offset="1">
              <div @click="checkItem($event)">其他</div>
            </van-col>
        </van-row>
    </div>
    <div class="describe">
        <van-row>
            <van-col span="22" offset="1">
                <textarea name="describe" v-model="msg" placeholder="请描述错误内容，我们会尽快处理"></textarea>
            </van-col>
        </van-row>
    </div>
    <div class="upload">
        <van-row class="total">
            <van-col span="22" offset="1">
                上传问题截图（<b>{{imgs.length}}</b>/8）
            </van-col>
        </van-row>
        <van-row>
            <van-col offset="1" span="2">
                <van-icon name="photograph" @click="togglePopup" />
            </van-col>
        </van-row>
    </div>
    <van-popup v-model="showPopup" position="bottom">
        <div class="van-hairline--bottom popupItem">拍照</div>
        <div class="van-hairline--bottom popupItem">从相册获取</div>
        <div class="van-hairline--bottom popupItem" @click="togglePopup">取消</div>
    </van-popup>
</div>
</template>
<script>
export default {
    name: 'correction',
    data () {
        return {
            msg: '',
            imgs: [],
            showPopup: false
        }
    },
    created () {},
    computed: {},
    methods: {
      goBack () {
          this.$router.go(-1)
      },
      togglePopup () {
          this.showPopup = !this.showPopup
      },
      checkItem ($event) {
        console.log($event.target.parentNode)
      }
    }
}
</script>
<style scoped>
.correction>.title {
    text-align: center;
    line-height: 50px;
}
.correction>.title .back {
    float: left;
}
.correction>.title .text {
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
    padding: 20px 0 10px;
}
.correction>.classify .van-row {
    margin-bottom: 10px;
}
.correction>.classify .van-col {
    line-height: 35px;
}
.correction>.classify [class*="van-hairline"]::after {
    border-radius: 10px;
}
.correction>.describe textarea {
    width: 100%;
    height: 100px;
    resize: none;
    border-radius: 5px;
    box-sizing: border-box;
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
.correction>.van-popup .popupItem {
    line-height: 50px;
    text-align: center;
}
</style>
