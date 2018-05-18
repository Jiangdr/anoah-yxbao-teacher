<template>
<van-popup v-model="urge" class="urge-popup">
      <div class="urge-container">
        <p>催促发送成功，“未完成学生”将收到提醒</p>
      </div>
</van-popup>
</template>
<script>
export default{
  name: 'urge',
  data() {
    return {
      urge: true
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
