<template>
  <div id="other-question">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <van-field v-model="msg" type="textarea" placeholder="请简要描述你的问题和意见" rows="6" class="otherquestionta"/>
    <div style="width: 90%; margin:10px auto; ">上传问题截图<span class="graytext"> ({{selImagesNumber}}/8)</span></div>
    <van-row style="width:95%;margin: auto">
      <van-col v-for="(item,index) in selectImages" :key="index" style="margin-bottom: 10px;" span="8"><div class="roundrectarea"><img :src="item" style="width: 100%;height:100%"/><uc-close-btn @click="deleteSelPic(index)" style="position:absolute;right: -10px;top: -10px"></uc-close-btn></div></van-col>
      <van-col v-show="selectImages.length < maxImageNum" span="8"><div class="roundrectarea" @click="clickSubmitImage"><div style="position: absolute;left:50%;top:50%;transform: translate(-50%,-50%)"><img src="@/assets/images/public/submitimage.png" style="position: relative;left:50%;transform: translateX(-50%)"/><br/><div style="white-space: nowrap">点击上传</div></div></div></van-col>
    </van-row>
    <bottom-button-area :disabled="disabled" @click="complete" buttonText="完 成"></bottom-button-area>
    <van-actionsheet v-model="showActionSheet" :actions="actions" cancel-text="取消" />
  </div>
</template>
<script>
import NavBar from '@/module/user-center/components/common/navbar'
import UcCloseBtn from '@/module/user-center/components/common/closeButton.vue'
import BottomButtonArea from '@/module/user-center/components/common/bottomButtonArea'
export default {
  name: 'OtherQuestion',
  data () {
    return {
      title: '其他问题',
      hasBack: true,
      msg: '',
      showActionSheet: false,
      maxImageNum: 8,
      actions: [
        {
          name: '拍照',
          callback: this.capturePhoto
        },
        {
          name: '从手机相册选择',
          callback: this.selectImagesFromLocal
        }
      ],
      selectImages: []
    }
  },
  computed: {
    selImagesNumber () {
      return this.selectImages.length
    },
    disabled () {
      let bool = true
      if (this.selectImages.length > 0 || this.msg !== '') {
        bool = false
      }
      return bool
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.meta.isclear === true) {
        vm.msg = ''
        vm.selectImages.splice(0, vm.selectImages.length)
        vm.$route.meta.isclear = false
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$route.meta.msg = this.msg
    this.$route.meta.selectImgs = this.selectImages
    next()
  },
  methods: {
    complete () {
      this.$router.back(-1)
    },
    back () {
      this.$router.back(-1)
    },
    deleteSelPic (index) {
      this.selectImages.splice(index, 1)
    },
    clickSubmitImage () {
      if (this.selectImages.length < this.maxImageNum) {
        this.showActionSheet = true
      }
    },
    selectImagesFromLocal () {
      window.appPlug.getImage(this.selectImagesSuc, this.selectImagesFail, true, 1)
    },
    selectImagesSuc (v) {
      this.selectImages.push(v)
      if (this.selectImages.length >= this.maxImageNum) {
        this.showActionSheet = false
      }
    },
    selectImagesFail (e) {
      alert(e)
    }
  },
  components: {
    BottomButtonArea,
    NavBar,
    UcCloseBtn
  }
}
</script>
<style lang="scss" scoped>
  $bordercolor:#EAEFF1;
  .otherquestionta
  {
    width: 90%;
    margin:10px auto;
    border: 1px solid;
    border-color:$bordercolor;
    border-radius: 7px;
  }
  .roundrectarea
  {
    position: relative;
    width: 105px;
    height: 105px;
    border: none;
    border-radius: 7px;
    background-color: #F3F7F6;
    display:block;
    color:#676B6C;
    overflow: hidden;
    margin: auto;
  }
  .graytext
  {
    color: #676B6C ;
  }
</style>
