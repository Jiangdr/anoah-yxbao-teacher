<template>
  <div>
    <div style="height: 35px;
    line-height: 35px;border-bottom: 1px solid #ccc;padding: 0 10px;">
      <div style="float: left;">学生评价(<span style="color: #ff4e00">{{listObj.studentsNum}}</span>人)</div>
      <div style="float: right;">
        <van-rate v-model="listObj.score" :size="18" :count="5" void-color="#ceefe8" />
      </div>
      <div style="clear: both;"></div>
    </div>
    <div style="padding: 2% 10px;border-bottom: 1px solid #e1e1e1;" v-for="(item, index) in listObj.lists" :key="index">
      <div style="float: left;width: 20%;">
        <div style="display: inline-block;">
          <img style="border-radius: 50%;box-sizing: border-box;" :src="item.avatar" alt="" width="50" height="50">
        </div>
      </div>
      <div style="float: right;width: 80%;">
        <div style="float: left;">{{item.real_name}}</div>
        <div style="float: right;">
          <van-rate v-model="item.rank" :size="18" :count="5" void-color="#ceefe8" />
        </div>
        <div style="clear: both;line-height: 28px;">{{item.comment}}</div>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>
<script>

export default {
  name: "studentMutualComments",
  props: ['listObj'],
  data() {
    return {
      peopleNum: 0
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
