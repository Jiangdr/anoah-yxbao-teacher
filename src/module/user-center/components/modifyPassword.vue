<template>
  <div id="modify-password">
    <van-field v-model.trim="oldPassword" center label="原密码" placeholder="原密码" icon="clear" @click-icon="oldPassword = ''" :error-message="oldValid"/>
    <van-field v-model.trim="newPassword" center label="新密码" placeholder="新密码" icon="clear" @click-icon="newPassword = ''"  :error-message="newValid"/>
    <van-field v-model.trim="newPassword2" center label="确认密码" placeholder="确认密码" icon="clear" @click-icon="newPassword2 = ''" :error-message="newValid2"/>
    <van-button type="primary" size="large" :disabled="isDisabled" @click="sureModify">确认</van-button>
  </div>
</template>

<script>
import api from '@/module/user-center/axios/usercenter'
import {mapGetters} from 'vuex'
import {Toast} from 'vant'
export default {
  name: 'ModifyPassword',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      isDisabled: true,
      oldValid: '',
      newValid: '密码需要由6-20位英文字母、数字或符号组成',
      newValid2: ''
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    })
  },
  watch: {
    oldPassword (value) {
      if (value) {
        this.oldValid = ''
      } else {
        this.oldValid = '密码不能为空'
      }
    },
    newPassword (value) {
      if (value.length >= 6 && this.newPassword.match(/^[\x21-\x7E]{6,20}$/)) {
        this.newValid = ''
      } else {
        this.newValid = '密码需要由6-20位英文字母、数字或符号组成'
      }
    },
    newPassword2 (value) {
      if (value === this.newPassword && this.oldPassword) {
        this.isDisabled = false
      }
    }
  },
  methods: {
    sureModify () {
      api.modifyPassword({
        user_id: this.userId,
        password: this.newPassword,
        old_password: this.oldPassword
      }).then(succ => {
        Toast({position: 'bottom', message: '密码修改成功'})
        setTimeout(() => {
          sessionStorage.clear()
          this.$router.push({path: '/login?redirect=/user-center'})
        }, 2000)
      })
    }
  }
}
</script>

<style scoped>
</style>
