<template>
  <div>
    <van-popup v-model="show" position="bottom" @click-overlay='toggle'>
      <div class="popup-container">
        <div class="bar">{{title}}</div>
        <div class="container">
          <span v-for="(stu, index) in list" :key="index" class="van-hairline--surround">{{stu.real_name}}</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'studenList',
  props: ['title', 'list'],
  data() {
    return {
      show: true
    }
  },
  methods: {
    toggle() {
      this.$emit('toggleAllCorrec')
      return false;
    }
  }
}
</script>
<style scoped>
.popup-container{
    height: 500px;
  }
 .popup-container>.bar{
    height: 50px;
    line-height: 50px;
    background: #f7f8f8;
    text-align: center;
    font-size: 18px;
  }
 .popup-container>.container{
    padding:10px 0px 10px 10px;
    margin-top:15px;
    box-sizing: border-box;
    height: calc(100% - 50px);
    text-align: left;
  }
 .popup-container>.container>span{
    display: inline-block;
    box-sizing: border-box;
    height: 40px;
    line-height: 24px;
    padding:8px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
