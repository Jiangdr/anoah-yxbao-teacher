<template>
  <div id="login">
    <!-- <van-cell-group class="login-box">
      <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''" validate="username" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required icon="clear" @click-icon="password = ''" validate="password" />
    </van-cell-group>
    <van-button type="primary" size="large" @click="doLogin" class="tt" :loading="loading" >登录</van-button>
    <router-link :to="{path:'/forgetPassword'}">忘记密码?</router-link> -->
    <div class="tt"></div>
    <cube-input v-model="username" placeholder="请输入用户名" type="text"  :clearable="clearable"></cube-input>
    <cube-input v-model="password" placeholder="请输入密码" type="password" :clearable="clearable"></cube-input>
    <router-link :to="{path:'/forgetPassword'}">忘记密码?</router-link>
    <cube-button :disabled="isDisabled" @click="doLogin">登录{{version}}</cube-button>

  </div>
</template>

<script>
// import {mapState} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      clearable: true,
      eye: true,
      isDisabled: true,
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
  }
}
</script>
<style scoped>
#login{
  padding: 0 20px
}
.tt{
  height: 300px;
}
</style>
