<template>
  <div id="user-center">
    <router-link  tag="div" :to="{path:'/personal'}">
      <img src="@/assets/images/usercenter/bg-green.png" width="100%" alt="">
      <div class="user-center-header">
        <img src="@/assets/images/usercenter/bg-white.png" width="100%" alt="">
        <img src="@/assets/images/usercenter/edit.png" class="img-edit" alt="">
        <p class="person-data person-name">{{userName}}</p>
        <p class="person-data person-school">{{school_name}}</p>
        <p class="person-data person-phone">{{phone}}</p>
        <!--<van-icon name="arrow" color="#ffffff"></van-icon>-->
      </div>
      <div class="div-img">
        <img :src="avatar" alt="..." class="avatar">
      </div>
    </router-link>
    <van-cell is-link border class="indexvancell">
      <router-link class="item-choice" tag="div" :to="{path:'/myClass'}"><img src="@/assets/images/usercenter/persionindexlisticon_01.png" class="item-choice-icon halfscaleelement"/>我的班级</router-link>
    </van-cell>
    <van-cell is-link border class="indexvancell">
      <router-link class="item-choice" tag="div" :to="{path:'/feedback'}"><img src="@/assets/images/usercenter/persionindexlisticon_02.png" class="item-choice-icon halfscaleelement"/>意见反馈</router-link>
    </van-cell>
    <van-cell is-link border class="indexvancell">
      <router-link class="item-choice" tag="div" :to="{path:'/setting'}"><img src="@/assets/images/usercenter/persionindexlisticon_03.png" class="item-choice-icon halfscaleelement"/>设置</router-link>
    </van-cell>
    <van-cell is-link border class="indexvancell">
      <router-link class="item-choice" tag="div" :to="{path:'/aboutUs'}"><img src="@/assets/images/usercenter/persionindexlisticon_04.png" class="item-choice-icon halfscaleelement"/>关于我们</router-link>
    </van-cell>
    <footer-bar activeType="my" @tabChange="tabChange"></footer-bar>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
import footerBar from '@/components/footerBar'
import {mapState} from 'vuex'
// import HeaderBar from '@/components/common/header-bar'
export default {
  name: 'UserCenter',
  data () {
    return {
      active: 1,
      hasBack: false
    }
  },
  created () {},
  computed: {
    ...mapState({
      userInfo: state => state.account.userInfo
    }),
    avatar () {
      alert(111)
      return this.$store.getters['runEnv/old'] + this.userInfo.avatar
    },
    userName () {
      return this.userInfo.nicknm
    },
    school_name () {
      return this.userInfo.school_name
    },
    phone () {
      return this.userInfo.phone
    }
  },
  methods: {
    tabChange (type) {
      if (type === 'my') {
        return false
      }
      this.$router.back(-1)
    }
  },
  components: {
    NavBar,
    footerBar
  }
}
</script>

<style scoped>
  #user-center{
    font-size: 16px;
  }
  #user-center .item-choice{
    line-height: 50px;
    height: 50px;
    padding: 0 15px;
  }
  .user-center-header{
    margin-top: -60px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .div-img{
    position: absolute;
    top: 80px;
    text-align: center;
    width: 100%;
  }
  .avatar{
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border: 2px solid #ffffff;
    display: inline-block;
  }
  .img-edit{
    height:30px;
    display: inline-block;
    position: absolute;
    right: 30px;
    top: 140px;
  }
  .person-data{
    text-align: center;
  }
  .person-name{
    margin-top: 12px;
  }
  .person-school{
    margin-top: 6px;
    color: #c8c9c9;
  }
  .person-phone{
    margin-top: 12px;
  }
  #user-center .item-choice{
    padding: 0 5px;
    display: flex;
    align-items: center;
    height: 30px;
  }
  .item-choice-icon{
    padding-right: 10px;
  }
  indexvancell
  {
    width:99%;
  }
</style>
