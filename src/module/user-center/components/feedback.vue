<template>
  <div id="feedback">
    <nav-bar :title="title" :hasBack="hasBack" @historyBack="back"></nav-bar>
    <van-cell-group border>
      <van-cell @click="check(item)" center border v-for="(item,index) in msgs" :key="index" :label="item.label" :title="item.title">
        <van-icon slot="right-icon" name="checked" class="van-cell__right-icon" :class="{checked: item.isChecked}"/>
      </van-cell>
      <van-field v-model="userLink" placeholder="留下您的电话号码/QQ/邮箱" label="联系方式(选填)"/>
      <van-cell title="其他问题" :value="other" is-link @click="addQuestion">
        <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon"></van-icon>
      </van-cell>
    </van-cell-group>
    <van-button type="primary" size="large" :disabled="isDisabled" @click="post">提交</van-button>
  </div>
</template>

<script>
import NavBar from '@/module/user-center/components/common/navbar'
export default {
  name: 'Feedback',
  data () {
    return {
      title: '问题反馈',
      hasBack: true,
      msgs: [
        {
          title: '软件太难操作',
          label: '',
          isChecked: false
        },
        {
          title: '软件风格不太喜欢',
          label: '',
          isChecked: false
        },
        {
          title: '功能太少不实用',
          label: '',
          isChecked: false
        },
        {
          title: '太卡,流畅度不好',
          label: '',
          isChecked: false
        },
        {
          title: '资源利用率低',
          label: '资源陈旧,相关度不高,数量太少,质量不高等',
          isChecked: false
        }
      ],
      other: '请添加问题描述或问题截图',
      userLink: '',
      isDisabled: true
    }
  },
  activated() {
    window.bus.$once('complete', (msg) => {
      this.other = msg ? '已添加' : '请添加问题描述或问题截图'
    })
  },
  watch: {
    userLink (value) {
      if (value.length || this.msgs.some(val => val.isChecked)) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  },
  methods: {
    check (item) {
      item.isChecked = !item.isChecked
      this.isDisabled = !this.msgs.some(val => val.isChecked)
    },
    addQuestion () {
      this.$router.push({path: '/otherQuestion'})
    },
    post () {
      setTimeout(() => {
        this.$router.back(-1)
      }, 2000)
    },
    back () {
      this.$router.back(-1)
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .checked{
    color: cornflowerblue;
  }
</style>
