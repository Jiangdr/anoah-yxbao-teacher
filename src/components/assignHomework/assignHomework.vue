<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>选择教材</h1>
      <i class="cubeic-back" @click="goHomework">返回</i>
    </header>
  </div>
</template>

<script>
export default {
  name: "Homework",
  data() {
    return {
      options: [2013, 2014, 2015, 2016, 2017, 2018],
      value: 2016,
      title: '班级'
    };
  },
  computed: {},
  methods: {
    goHomework() {
      this.$router.push({
        path: "/homework"
      });
    }
  }
};
</script>

<style scoped>
</style>
