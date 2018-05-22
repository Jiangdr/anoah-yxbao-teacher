<template>
  <div id="yx-field" class="van-hairline--bottom">
    <div class="label-text" v-if="label">{{label}}</div>
    <div class="input-box">
      <!--<i class="fa fa-user label-icon" v-show="labelIcon==='user'"></i>
      <i class="fa fa-unlock-alt label-icon" v-show="labelIcon==='password'"></i>-->
      <img class="login-input-icon" :src="getIcon()"/>
      <input class="login-input" :type="type" :value="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)" @focus="$emit('focus')" @blur="$emit('blur')">
      <i class="fa fa-times-circle clear-icon" v-show="value.length > 0" @click="$emit('click-clear')"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'yx-field',
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String
    },
    labelIcon: {
      type: String
    },
    clearIcon: {
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getIcon () {
      let url = ''
      if (this.labelIcon === 'user') {
        url = require('@/assets/images/account/icon-user.png')
      } else {
        url = require('@/assets/images/account/icon-pwd.png')
      }
      return url
    }
  }
}
</script>
<style lang="scss" scoped>
  #yx-field{
    margin: 20px 0;
    .label-text{
      font-size: 16px;
      color: #c8c8c8;
      height: 16px;
      line-height: 16px;
    }
    .login-input-icon{
      width: 18px;
      position: relative;
      top: 50%;
      transform: translateY(-100%);
      margin-right: 10px;
    }
    .input-box{
      width:100%;
      height: 50px;
      line-height:50px;
      font-size: 20px;
      position: relative;
      /* .label-icon{
         width:50px;
         text-align:center;
       }*/
      input{
        width:calc(100% - 60px);
        height: 30px;
        color:#222525;
        font-size: 16px;
        overflow-x:auto;
      }
      .clear-icon{
        position:absolute;
        right: 0px;
        top: 16px;
        font-size: 16px;
      }
    }
  }
</style>
