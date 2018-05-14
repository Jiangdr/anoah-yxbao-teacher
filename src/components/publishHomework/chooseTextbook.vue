<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>选择教材</h1>
      <i class="cubeic-back" @click="goHomework"><i class="fa fa-angle-left"></i> 返回</i>
    </header>

    <div style="width: 25%;display: inline-block;">
        <div class="leftTab" @click="clickGrade('一年级')" v-bind:class="{activeTabClass : activeTabName == '一年级'}">一年级</div>
        <div class="leftTab" @click="clickGrade('二年级')" v-bind:class="{activeTabClass : activeTabName == '二年级'}">二年级</div>
        <div class="leftTab" @click="clickGrade('三年级')" v-bind:class="{activeTabClass : activeTabName == '三年级'}">三年级</div>
        <div class="leftTab" @click="clickGrade('四年级')" v-bind:class="{activeTabClass : activeTabName == '四年级'}">四年级</div>
        <div class="leftTab" @click="clickGrade('五年级')" v-bind:class="{activeTabClass : activeTabName == '五年级'}">五年级</div>
        <div class="leftTab" @click="clickGrade('六年级')" v-bind:class="{activeTabClass : activeTabName == '六年级'}">六年级</div>
    </div>
    <cube-button style="position:absolute;bottom:0px;" :outline="true" @click="goSummerHomework">确认</cube-button>
  </div>
</template>

<script>
export default {
  name: "chooseTextbook",
  data() {
    return {
      activeTabName: "一年级"
    };
  },
  computed: {},
  methods: {
    goHomework() {
      this.$router.push({
        path: "/homework"
      });
    },
    clickGrade(name) {
      this.activeTabName = name;
    },
    goSummerHomework() {
      this.$router.push({
        path: "/summerHomework"
      });
    }
  }
};
</script>

<style scoped>
.leftTab {
  line-height: 35px;
}
.activeTabClass {
  color: #fc9153;
}
</style>
