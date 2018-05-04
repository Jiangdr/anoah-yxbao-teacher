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
      <van-picker v-show="chooseArea" :columns="columns" @change="onChange" class="choose-area"/>
    </transition>
  </div>
</template>
<script>
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
}
export default {
  name: 'FormList',
  data () {
    return {
      userAccount: '',
      userName: '',
      schoolArea: '',
      schoolName: 'baisha',
      className: '',
      phoneNum: '',
      chooseArea: false,
      columns: [
        {
          values: Object.keys(citys),
          className: 'column1'
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2
        }
      ]
    }
  },
  methods: {
    areaChange (e) {
      e.target.blur()
      this.chooseArea = true
    },
    fillSchoolName (e) {
      e.target.blur()
      this.$router.push({path: '/contactUs/schoolSearch'})
    },
    onChange (picker, values) {
      picker.setColumnValues(1, citys[values[0]])
    },
    closeChooseArea () {
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
