<template>
  <div id="afterQRscan">
    <header-bar @back="$router.back(-1)">
      <div slot="title-name">二维码扫描</div>
    </header-bar>
    <div class="content">
      <!-- <div class="succ-qr">
        <div class="icon icon-succ"></div>
        <p>即将在电脑端登录优学派智慧教育平台</p>
      </div> -->
      <div class="err-qr">
        <div class="icon icon-err"></div>
        <p>登录确认已失效，请重新扫码登录</p>
      </div>
      <div class="login-btn">确认登录</div>
    </div>
  </div>
</template>
<script>
import headerBar from '@/components/headerBar'
export default {
  name: 'AfterScan',
  components: {
    headerBar
  }
}
</script>
<style lang="scss" scoped>
#afterQRscan{
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  font-size: 16px;
  .content{
    width: 100%;
    height: calc(100% - 45px);
    overflow: hidden;
    position: relative;
    padding: 0 13px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .icon{
      display: inline-block;
      width: 160px;
      height: 159px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      margin-bottom: 20px;
    }
    .succ-qr{
      text-align: center;
      flex: 1;
      margin-top: 30%;
      .icon-succ{
        background-image: url('../../../assets/images/home/qrcode-success.png')
      }
      p{
        color: #666
      }
    }
    .err-qr{
      text-align: center;
      flex: 1;
      margin-top: 30%;
      .icon-err{
        background-image: url('../../../assets/images/home/qrcode-fail.png')
      }
      p{
        color: #666
      }
    }
    .login-btn{
      position: absolute;
      bottom: 30px;
      left: 13px;
      width: calc(100% - 26px);
      height: 45px;
      line-height: 45px;
      text-align: center;
      background: linear-gradient(to right, #08b884 ,#12d198);
      color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
