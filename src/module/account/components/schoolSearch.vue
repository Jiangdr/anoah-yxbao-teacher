<template>
  <div id="school-search">
    <form action="/">
    <van-search
      v-model="value"
      placeholder="请输入学校名称"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>
  </div>
</template>
<script>
export default {
  name: 'SchoolSearch',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {
    },
    onCancel () {
    }
  }
}
</script>
<style scoped>
</style>
