<template>
  <div class="bottombuttonarea">
    <div style="position: relative;top: 50%;transform: translateY(-50%);">
      <yx-login-btn :disabled="disabled" @click="$emit('btnClick')" :text="buttonText" class="login-btn"></yx-login-btn>
    </div>
  </div>
</template>
<script>
import YxLoginBtn from '@/module/account/components/yx-login-btn.vue'
export default {
  name: 'bottom-button-area',
  data () {
    return {}
  },
  props: ['buttonText', 'disabled'],
  components: {
    YxLoginBtn: YxLoginBtn
  }
}
</script>
<style lang="scss" scoped>
  .login-btn{
    width: 60% !important;
    margin:0 auto;
  }
  .close-button{
   outline:none;
   border:none;
  }
  .bottombuttonarea
  {
    position: absolute;
    text-align: center;
    width: 100%;
    height:62px;
    bottom:0px;
    border-top:1px solid #EAEFF1;
  }
</style>
