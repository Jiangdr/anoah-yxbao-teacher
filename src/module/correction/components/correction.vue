<template>
<div class="correction">
  <div class="title van-hairline--bottom">
    <van-row>
      <van-col span="24">
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
      <van-col span="6" class="van-hairline--surround" :offset="index==0||index%3==0?1:2" v-for="(item,index) in classify" :key="index" :class="{'checked':isChecked(item)}">
        <div @click="checkItem(item)">{{item}}</div>
      </van-col>
    </van-row>
  </div>
  <div class="describe">
    <van-row>
      <van-col span="22" offset="1">
        <textarea name="describe" v-model="msg" placeholder="请描述错误内容，我们会尽快处理" maxlength="50"></textarea>
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
  <div class="submitBtn">
    <van-button type="primary" bottom-action>提交</van-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'correction',
  data () {
    return {
      msg: '',
      imgs: [],
      classify: ['内容超纲', '答案错误', '题干错误', '题目过时', '解析错误', '知识点不符', '其他'],
      checked: [],
      showPopup: false
    }
  },
  created () {},
  computed: {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    togglePopup () {
      this.showPopup = !this.showPopup
    },
    isChecked (item) {
      return this.checked.indexOf(item) >= 0
    },
    checkItem (item) {
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

.correction>.classify .van-col {
  line-height: 35px;
  margin-bottom: 10px;
}

.correction>.classify .van-col.checked[class*=van-hairline]::after {
  border-color: #06bb9c;
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
  padding:10px;
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

.correction>.submitBtn {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
