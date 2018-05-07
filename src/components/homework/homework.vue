<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>作业</h1>
      <i class="cubeic-back" @click="goHome">返回</i>
    </header>
    <div class="select-container">
      <span class="select-span">
        <cube-select :options="options" placeholder="班级" title="班级"></cube-select>
      </span>
      <span class="select-span">
        <cube-select :options="options" placeholder="状态" title="状态"></cube-select>
      </span>
      <span class="select-span">
        <cube-select :options="options" placeholder="时间" title="时间"></cube-select>
      </span>
    </div>

    <div class="homework_list">
      <div>
        <div class="homework_list_inline_list">今天 周三<i class="fa fa-amazon"></i></div>
        <div class="homework_list_inline_list">暑假作业 22份</div>
        <div class="homework_list_inline_list">数学 三年级1班</div>
        <div class="homework_list_inline_list">截止：2018-08-30 20:00</div>
      </div>
    </div>
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
    goHome() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scoped>
.homework_list{
  margin-top:5px;
  padding: 7px;
  background: #fff;
  border-bottom: 1px solid #111;
}
.select-span{
  width:60px;
  display:inline-block;
}

.select-container{
  display: flex;
  justify-content: space-between;
}
.homework_list_inline_list{
  line-height:25px;
}
</style>
