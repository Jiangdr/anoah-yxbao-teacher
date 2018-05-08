<template>
  <div id="modify-name">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <van-field v-model.trim="newName" :placeholder="name" icon="clear" @click-icon="newName = ''" :error-message="errMsg"/>
    <van-button type="primary" size="large" :disabled="noInput" @click="set">保存</van-button>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import api from '@/module/user-center/axios/usercenter'
import {mapGetters} from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'ModifyName',
  data () {
    return {
      title: '修改姓名',
      hasBack: true,
      name: this.$route.params.name,
      newName: '',
      errMsg: '',
      noInput: true
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userCenter/userId'
    })
  },
  watch: {
    newName (value) {
      if (value.length) {
        this.noInput = false
        this.errMsg = ''
      } else {
        this.noInput = true
        this.errMsg = '输入内容不能为空'
      }
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    set () {
      api.modify({
        user_id: this.userId,
        data: {
          nicknm: this.newName
        }
      }).then(succ => {
        Toast({position: 'bottom', message: '修改成功'})
        setTimeout(() => {
          this.back()
        }, 1000)
      }, err => {
        console.log(err)
      })
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
  #modify-name{
    width: 100%;
    height: 100%;
  }
</style>
