<template>
  <div id="about-us">
    <header-bar @back="back"><span slot="title-name">{{title}}</span></header-bar>
    <div class="restcontainer">
      <div class="restconheaderarea">
        <div class="imgiconarea">
          <img src="@/assets/images/usercenter/yxprecticon.jpg" style="position: relative;top: 50%; transform: translateY(-50%)"/>
        </div>
        <span style="font-size: 20px;margin-bottom: 15px">优学宝</span>
        <span class="versiontextfont cl-mark">V1.0.0</span>
      </div>
      <div class="restconmiddlerarea">
        <van-cell border class="indexvancell aboutus-van-cell" value="028-23659986">
          <template slot="title">
            <div class="item-choice"><img src="@/assets/images/usercenter/personmineicon_01.png" class="item-choice-icon halfscaleelement"/> 电话</div>
          </template>
        </van-cell>
        <van-cell border class="indexvancell aboutus-van-cell" value="youxuebao@bao.com">
          <template slot="title">
            <div class="item-choice"><img src="@/assets/images/usercenter/personmineicon_02.png" class="item-choice-icon halfscaleelement"/> 邮箱</div>
          </template>
        </van-cell>
        <van-cell border class="indexvancell aboutus-van-cell" value="Youxuebaoba">
          <template slot="title">
            <div class="item-choice"><img src="@/assets/images/usercenter/personmineicon_03.png" class="item-choice-icon halfscaleelement"/> 公众号</div>
          </template>
        </van-cell>
      </div>
      <div class="restconbottomarea" :style="background">
        <span style="position:absolute;bottom: 19px;white-space: nowrap; left: 50%;;transform: translateX(-50%)">深圳市优学天下教育发展股份有限公司©版权所有</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import headerBar from '@/components/headerBar.vue'
export default {
  name: 'AboutUs',
  data () {
    return {
      title: '关于我们',
      hasBack: true,
      background: {
        backgroundImage: 'url(' + require('@/assets/images/usercenter/personminebottombg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  },
  components: {
    NavBar,
    headerBar
  }
}
</script>

<style scoped>
  div#about-us
  {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  div.restcontainer{
    background-color: #F5F7F6;
    flex-grow: 1;
    display: inherit;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  .versiontextfont
  {
    font-size: 17px;
  }
  .restconheaderarea
  {
    display: inherit;
    flex-direction:column;
    align-items: center;
    height:165px;
    margin-top:30px;
  }
  .restconmiddlerarea
  {
    width:100%;
  }
  .restconbottomarea
  {
    width: 100%;
    flex-grow: .65;
  }
  .imgiconarea
  {
    width: 70px;
    height: 70px;
    border-radius: 15px;
    background:#ffffff;
    margin: auto;
    box-shadow: 1px 1px 10px #EBECEB;
    text-align: center;
  }
  .indexvancell
  {
    width:100%;
  }
  div.item-choice
  {
    display: flex;
    align-items: center;
    height: 30px;
  }

  div.item-choice img.item-choice-icon
  {
    padding-right: 10px;
  }
</style>
