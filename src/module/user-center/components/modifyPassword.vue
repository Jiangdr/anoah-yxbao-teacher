<template>
  <div id="modify-password">
    <header-bar @back="back"><span slot="title-name">{{title}}</span></header-bar>
    <van-cell-group>
      <van-cell title="原密码" :border="false"/>
      <van-field class="modifyPasswordVanField" v-model.trim="oldPassword" center placeholder="请输入原密码" icon="clear" @click-icon="oldPassword = ''" :error-message="oldValid" type="password"/>
      <van-cell title="新密码" :border="false"/>
      <van-field class="modifyPasswordVanField" v-model.trim="newPassword" center placeholder="请输入新密码" icon="clear" @click-icon="newPassword = ''"  :error-message="newValid" type="password"/>
      <van-cell title="确认密码" :border="false"/>
      <van-field class="modifyPasswordVanField" v-model.trim="newPassword2" center placeholder="请再次确认新密码" icon="clear" @click-icon="newPassword2 = ''" :error-message="newValid2" type="password"/>
    </van-cell-group>
    <bottom-button-area :disabled="isDisabled" @click="sureModify" buttonText="确 定"></bottom-button-area>
  </div>
</template>

<script>
import api from '@/module/user-center/axios/usercenter'
import NavBar from '@/module/user-center/components/common/navbar'
import headerBar from '@/components/headerBar.vue'
import BottomButtonArea from '@/module/user-center/components/common/bottomButtonArea'
import {mapGetters} from 'vuex'
import {Toast} from 'vant'
export default {
  name: 'ModifyPassword',
  data () {
    return {
      title: '修改密码',
      hasBack: true,
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      isDisabled: true,
      oldValid: '密码不能为空',
      newValid: '密码需要由6-20位英文字母、数字或符号组成',
      newValid2: '确认密码需要与新密码相同'
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
        if (!this.newValid && !this.newValid2) {
          this.isDisabled = false
        } else {
          this.isDisabled = true
        }
      } else {
        this.oldValid = '密码不能为空'
        this.isDisabled = true
      }
    },
    newPassword (value) {
      if (value.length >= 6 && value.match(/^[\x21-\x7E]{6,20}$/)) {
        this.newValid = ''
      } else {
        this.newValid = '密码需要由6-20位英文字母、数字或符号组成'
      }
      this.validateConfirmPwd()
    },
    newPassword2 (value) {
      this.validateConfirmPwd()
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
    },
    back () {
      this.$router.back(-1)
    },
    validateConfirmPwd () {
      let confirmPwd = this.newPassword2
      if (confirmPwd.length >= 6 && confirmPwd.match(/^[\x21-\x7E]{6,20}$/) && confirmPwd === this.newPassword) {
        this.newValid2 = ''
        if (this.oldValid) {
          this.isDisabled = true
        } else {
          this.isDisabled = false
        }
      } else {
        this.newValid2 = '确认密码需要与新密码相同'
        this.isDisabled = true
      }
    }
  },
  components: {
    NavBar,
    headerBar,
    BottomButtonArea
  }
}
</script>

<style scoped>
  .van-cell{
    color: #9c9ea1;
  }
  .modifyPasswordVanField{
    width: 97%;
  }
</style>
