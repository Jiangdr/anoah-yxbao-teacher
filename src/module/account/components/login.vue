<template>
  <!--<div id="login">
    <div class="tt"></div>
    <cube-input v-model="username" placeholder="请输入用户名" type="text"  :clearable="clearable"></cube-input>
    <cube-input v-model="password" placeholder="请输入密码" type="password" :clearable="clearable"></cube-input>
    <router-link :to="{path:'/forgetPassword'}">忘记密码?</router-link>
    <cube-button :disabled="isDisabled" @click="doLogin">登录{{version}}</cube-button>
  </div>-->
  <div id="login" class="page" :class="{slideUp: slideUp}">
    <img class="icon-box" :class="{slideUp: slideUp}" src="/static/img/account/logo.png" alt="">
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
      version: window.version
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
        console.log("===");
        console.log(r);
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
  }
}
</script>
<!--<style scoped>
#login{
  padding: 0 20px
}
.tt{
  height: 300px;
}
</style>-->
<style lang="scss" scoped>
  #login{
    background: url("/static/img/account/login-back.png");
    background-size:100% 100%;
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
