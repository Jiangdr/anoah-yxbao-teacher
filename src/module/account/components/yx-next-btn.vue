<template>
  <div id="yx-login-btn">
    <button type="button" class="login-btn" :class="{disable: disabled}" :disabled="disabled" @click="$emit('click')">
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
    text: String
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  $gradient-left: #08b783;
  $gradient-right: #13d098;
  .login-btn{
    width: 100%;
    left: 100%;
    background: linear-gradient(to right, $gradient-left ,$gradient-right);
    outline:none;
    border:none;
    height: 45px;
    line-height: 45px;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    border-radius: 10px;
    &.disable{
      background: #eee;
      color: #999;
    }
  }
</style>
