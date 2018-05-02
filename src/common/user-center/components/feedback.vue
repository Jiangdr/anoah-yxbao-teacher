<template>
  <div id="feedback">
    <div v-for="(item,index) in 6" :key="index">勾选表单</div>
    <router-link tag="div" :to="{name:'otherProblem'}">其他问题</router-link>
  </div>
</template>

<script>
export default {
  name: 'Feedback'
}
</script>

<style scoped>
</style>
