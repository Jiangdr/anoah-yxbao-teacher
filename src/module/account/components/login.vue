<template>
  <div id="login">
    <van-cell-group class="login-box">
      <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''" validate="username" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required icon="clear" @click-icon="password = ''" validate="password" />
    </van-cell-group>
    <van-button type="primary" size="large" @click="doLogin" class="tt" :loading="loading" >登录</van-button>
    <router-link :to="{path:'/forgetPassword'}">忘记密码?</router-link>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      validate: {
        username: [{ 'required': '请输入用户名' }],
        password: [{ 'required': '请输入密码' }]
      }
    }
  },
  created () {
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
  methods: {
    doLogin () {
      this.loading = true
      this.doValidate()
      this.$store.dispatch('account/doLogin').then(r => {
        this.loading = false
        this.afterLogin()
      }, j => {
        this.loading = false
      })
    },
    afterLogin () {
      let path = this.$route.query.redirect || '/'
      this.$router.push(
        {path: path}
      )
    },
    doValidate () {
      for (let i in this.validate) {
        this.validate[i].forEach((m, n) => {
          // console.log(m, n, this[i])
          if (m.required && !this[i]) {
            console.log(this)
          }
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
