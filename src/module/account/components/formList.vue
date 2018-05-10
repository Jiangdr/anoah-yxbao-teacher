<template>
  <div id="form-list">
    <van-cell-group>
      <van-field v-model="userAccount" label="登录账号" icon="clear" placeholder="请输入用户名" required @click-icon="userAccount = ''" />
      <van-field v-model="userName" label="姓名" icon="clear" placeholder="必填,否则无法查找您的信息" required @click-icon="userName = ''" />
      <van-field v-model="schoolArea" @focus="areaChange" label="学校所在地" icon="clear" placeholder="必填,否则无法查找学校" required @click-icon="schoolArea = ''" />
      <van-field v-model="schoolName" @focus = "fillSchoolName" label="学校名称" icon="clear" placeholder="必填,否则无法查找学校" required @click-icon="schoolName = ''" />
      <van-field v-model="className" label="班级名称" icon="clear" placeholder="必填,否则无法查找学校" required @click-icon="className = ''" />
      <van-field v-model="phoneNum" label="联系方式" icon="clear" placeholder="必填,否则无法查找学校" required @click-icon="phoneNum = ''" />
    </van-cell-group>
    <transition name="van-fade">
      <div class="model" v-show="chooseArea" @click="closeChooseArea"></div>
    </transition>
    <transition name="van-slide-bottom">
      <van-picker show-toolbar :loading="areaLoading" @cancel="chooseArea=false" @confirm="confirm" v-show="chooseArea" :columns="columns" @change="onChange" class="choose-area"/>
    </transition>
  </div>
</template>
<script>
import api from '@/module/account/axios/user'
export default {
  name: 'FormList',
  data () {
    return {
      userAccount: '',
      userName: '',
      schoolArea: '',
      areaId: '',
      schoolName: '',
      className: '',
      phoneNum: '',
      chooseArea: false,
      areaLoading: true,
      citys: null,
      area: null,
      columns: []
    }
  },
  methods: {
    areaChange (e) {
      e.target.blur()
      this.chooseArea = true
      api.area()
        .then((succ) => {
          this.area = succ
          this.productArea()
          this.areaLoading = false
        })
    },
    productArea () {
      let citys = this.area
      let result = {}
      citys.forEach(el => {
        if (result[el.province]) {
          result[el.province].push(el.nm)
        } else {
          result[el.province] = []
          result[el.province].push(el.nm)
        }
      })
      this.citys = result
      this.columns = [
        {
          values: Object.keys(this.citys),
          className: 'column1'
        },
        {
          values: this.citys['北京'],
          className: 'column2',
          defaultIndex: 0
        }
      ]
    },
    fillSchoolName (e) {
      e.target.blur()
      if (this.schoolArea) {
        this.$router.push({path: '/contactUs/schoolSearch/' + this.areaId})
      }
    },
    onChange (picker, values) {
      picker.setColumnValues(1, this.citys[values[0]])
    },
    closeChooseArea () {
      this.chooseArea = false
    },
    confirm (value, index) {
      console.log(value, index)
      this.schoolArea = value[1]
      this.area.filter(el => {
        if (el.nm === value[1]) {
          this.areaId = el.cityid
        }
      })
      this.chooseArea = false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.chooseArea) {
      this.chooseArea = false
      next(false)
    } else {
      next()
    }
  }
}
</script>
<style scoped>
.choose-area{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2019;
}
.model{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: calc(100% - 220px);
  background-color: rgba(0,0,0,.6);
  z-index: 2018;
}
</style>
