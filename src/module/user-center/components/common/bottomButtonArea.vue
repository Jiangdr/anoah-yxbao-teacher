<template>
  <div class="bottombuttonarea">
    <div style="position: relative;top: 50%;transform: translateY(-50%);">
      <yx-next-btn :disabled="disabled" :loginBtnColor="color" @click="$emit('click')" :text="buttonText" class="login-btn"></yx-next-btn>
    </div>
  </div>
</template>
<script>
import YxNextBtn from '@/module/account/components/yx-next-btn.vue'
export default {
  name: 'bottom-button-area',
  data () {
    return {}
  },
  props: ['buttonText', 'disabled', 'color'],
  components: {
    YxNextBtn
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
