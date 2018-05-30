<template>
  <div id="login" class="page" :class="{slideUp: slideUp}" :style="background">
    <img class="icon-box" :class="{slideUp: slideUp}" src="@/assets/images/account/logo.png" alt="">
    <div>
      <yx-field @focus="slideUp=true" @blur="slideUp=false" v-model.trim="username" label="用户名" label-icon="user" placeholder="请输入用户名" @click-clear="username = ''"></yx-field>
      <yx-field @focus="slideUp=true" @blur="slideUp=false" v-model.trim="password" type="password" label="密码" label-icon="password" placeholder="请输入密码" @click-clear="password = ''"></yx-field>
    </div>
    <yx-login-btn :loading="loading" :disabled="isDisabled" @click="doLogin" class="login-btn" text="登 录"></yx-login-btn>
    <div class="forget-pwd" :class="{slideUp: slideUp}">
      <router-link :to="{path:'/forgetPassword'}">忘记密码?</router-link>
    </div>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import YxField from '@/module/account/components/yx-field'
import YxLoginBtn from '@/module/account/components/yx-login-btn'
export default {
  name: 'Login',
  data () {
    return {
      clearable: true,
      eye: true,
      loading: false,
      isDisabled: true,
      slideUp: false,
      validate: {
        username: [{ 'required': '请输入用户名' }],
        password: [{ 'required': '请输入密码' }]
      },
      version: window.version,
      background: {
        backgroundImage: "url(" + require("@/assets/images/account/login-back.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    }
  },
  computed: {
    username: {
      get  () {
        return this.$store.state.account.username
      },
      set (val) {
        this.$store.commit('account/setUsername', val)
      }
    },
    password: {
      get () {
        return this.$store.state.account.password
      },
      set (val) {
        this.$store.commit('account/setPassword', val)
      }
    }
  },
  mounted() {
    if (this.username && this.password) {
      this.isDisabled = false
    }
  },
  watch: {
    username (newVal) {
      newVal.length && this.password.length ? this.isDisabled = false : this.isDisabled = true
    },
    password (newVal) {
      newVal.length && this.username.length ? this.isDisabled = false : this.isDisabled = true
    }
  },
  methods: {
    doLogin () {
      this.doValidate()
      this.$store.dispatch('account/doLogin').then(r => {
        this.afterLogin()
      }, j => {
      })
    },
    afterLogin () {
      let path = this.$route.query.redirect || '/'
      this.$router.push(
        {path: path}
      )
    },
    doValidate () {
    }
  },
  components: {
    YxField,
    YxLoginBtn
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'setNewPassword') { // 重置过密码后，清空密码框
        vm.password = ''
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  #login{
    padding: 25px 35px;
    position: relative;
    top: 0;
    transition: all .3s ease;
    &.slideUp{
      top: -250px;
    }
    .icon-box{
      display: block;
      margin: 0 auto;
      padding-top: 50px;
      padding-bottom: 20px;
      height: 200px;
      opacity: 1;
      transition: all .3s ease;
      &.slideUp{
        opacity: 0;
      }
    }
    .login-btn{
      margin-top: 46px;
    }
    .forget-pwd{
      text-align: center;
      color: #666;
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 1;
      transition: all .3s ease;
      &.slideUp{
        opacity: 0;
      }
    }
  }
</style>
