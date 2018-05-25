<template>
  <div class="error-msg-div" v-if="isShow">
    <img src="@/assets/images/account/icon-error.png" width="16px" alt="">
    <span class="msg-content">{{msg}}</span>
  </div>
</template>

<script>
export default {
  name: "error-msg",
  data() {
    return {
    }
  },
  props: {
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .error-msg-div * {
    vertical-align: middle;
  }
.msg-content{
  font-size: 12px;
  padding-left: 6px;
  color: #ff5266;
}
</style>
