<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>作业发布</h1>
      <i class="cubeic-back" @click="goHomework">返回</i>
    </header>

    <div>
        <!-- <cube-input v-model="value" :prepend='prepend' ></cube-input> -->
        <van-cell-group>
            <van-field v-model="value" placeholder="请输入作业名称" label="作业名称" />
        </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "publishHomework",
  data() {
    return {
      value: '',
      prepend: '作业名称'
    };
  },
  computed: {},
  methods: {
    goHomework () {
      this.$router.push({
        path: "/homework"
      });
    }
  }
};
</script>

<style scoped>
.activeTabClass{
  color: #fc9153;
}
</style>
