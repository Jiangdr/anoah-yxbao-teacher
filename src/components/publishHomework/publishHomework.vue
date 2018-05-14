<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>布置作业</h1>
      <i class="cubeic-back" @click="goHomework"><i class="fa fa-angle-left"></i> 返回</i>
    </header>

    <div style="border-bottom: 1px solid #111;">
      <span style="width:49%;text-align:center;display:inline-block;border-right: 1px solid #111;" v-bind:class="{activeTabClass : activeTabName == '推荐'}" @click="clickTab('推荐')">推荐</span>
      <span style="width:49%;text-align:center;display:inline-block;" v-bind:class="{activeTabClass : activeTabName == '校本库'}" @click="clickTab('校本库')">校本库</span>
    </div>

    <div style="background-color:#fff;margin-bottom:20px;"><i class="fa fa-book"></i> 【人教版】三年级上</div>

    <div style="height:50px;line-height:50px;background-color:#fff;border-bottom:1px solid #111;">
      <div style="width:95%;display: inline-block;"><i class="fa fa-book"></i>  暑假作业</div>
      <div style="width:3%;display: inline-block;border-bottom: 1px solid #111;"><i class="fa fa-angle-right"></i></div>
    </div>

    <div style="height:50px;line-height:50px;background-color:#fff;border-bottom:1px solid #111;">
      <div style="width:95%;display: inline-block;"><i class="fa fa-book"></i>  暑假作业</div>
      <div style="width:3%;display: inline-block;border-bottom: 1px solid #111;"><i class="fa fa-angle-right"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "publishHomework",
  data() {
    return {
      activeTabName: '推荐'
    };
  },
  computed: {},
  methods: {
    goHomework () {
      this.$router.push({
        path: "/homework"
      });
    },
    clickTab (name) {
      this.activeTabName = name;
    }
  }
};
</script>

<style scoped>
.activeTabClass{
  color: #fc9153;
}
</style>
