<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>作业</h1>
      <i class="cubeic-back" @click="goHome"></i>
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
      <div class="homework_list_inline_list">今天 周三</div>
      <div class="homework_list_inline_list">暑假作业 22份</div>
      <div class="homework_list_inline_list">数学 三年级1班</div>
      <div class="homework_list_inline_list">截止：2018-08-30 20:00</div>
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
.cube-page {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efeff4;
}
.cube-view {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
.cube-page .header {
  position: relative;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #edf0f4;
  box-shadow: 0 1px 6px #ccc;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 5;
  margin-bottom: 4px;
}
.cube-page .header h1 {
  font-size: 16px;
  font-weight: 700;
}
.cube-page .header .cubeic-back {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 15px;
  color: #fc9153;
}
.cubeic-back:before {
  content: "\E608";
}

</style>
