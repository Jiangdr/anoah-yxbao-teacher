<template>
  <van-popup v-model="remind" class="urge-popup">
        <div class="urge-container">
          <p>提醒发送成功，“未订正学生”将收到提醒</p>
        </div>
        </van-popup>
</template>
<script>
export default{
  name: 'remind',
  data() {
    return {
      remind: true
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>
<style scoped>
  .detail .urge-popup {
    width: calc(100vw - 40px);
    border-radius: 10px;
    padding: 30px 20px;
    box-sizing: border-box;
  }
</style>
