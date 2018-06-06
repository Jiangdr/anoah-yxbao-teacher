<template>
  <div id="yx-login-btn">
    <button type="button" :class="[loginBtnClass,{disable: disabled}]" :disabled="disabled" @click="$emit('click')">
      <span v-show="!loading">{{text}}</span>
      <i v-show="loading" class="fa fa-spinner  fa-spin"></i>
    </button>
  </div>
</template>
<script>
export default {
  name: 'yx-login-btn',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: true
    },
    text: String,
    loginBtnColor: String
  },
  data () {
    return {}
  },
  computed: {
    loginBtnClass () {
      let v
      if (this.loginBtnColor) {
        v = 'login-btn' + '-' + this.loginBtnColor
      } else {
        v = 'login-btn'
      }
      return v
    }
  }
}
</script>
<style lang="scss" scoped>
  $gradient-left: #08b783;
  $gradient-right: #13d098;
  $gradient-left-disabled: #c8c9c9;
  $gradient-right-disabled: #e8ebee;
  $gradient-left-red: #FF5266;
  $gradient-right-red: #FF7181;

  .login-btn{
    width: 100%;
    left: 100%;
    background: linear-gradient(to right, $gradient-left ,$gradient-right);
    outline:none;
    border:none;
    height: 50px;
    line-height: 45px;
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    border-radius: 15px;
    &.disable{
      background: linear-gradient(to right, $gradient-left-disabled ,$gradient-right-disabled);
      color: #999;
    }
  }
  .login-btn-red{
    @extend .login-btn;
    background: linear-gradient(to right, $gradient-left-red ,$gradient-right-red);
  }
</style>
