<template>
  <div class="cube-page cube-view button-view">
    <header class="header">
      <h1>暑假作业</h1>
      <i class="cubeic-back" @click="goChooseTextbook">返回</i>
    </header>

    <!-- <cube-checkbox-group v-model="checkList" :options="options"></cube-checkbox-group> -->

    <!-- <el-tree :data="data2" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps"></el-tree> -->
    <!-- <cube-button style="position:absolute;bottom:0px;" :outline="true" @click="clickSelectAll">全选</cube-button> -->
    <div style="position:absolute;bottom:0px;background: transparent;border:1px solid rgb(102, 102, 102); background-color: rgba(102, 102, 102, 1);" class="cube-btn">
      <div style="float:left;font-size:13px;">已选试卷30份，共100道题</div>
      <div style="background-color:rgba(22, 155, 213, 1);width:59px;height:22px;line-height:22px;font-size:13px;float:right;border-radius:5px;" @click="clickPublish">布&nbsp;&nbsp;&nbsp;&nbsp;置</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "publishHomework",
  data() {
    return {
      checkList: [],
      data2: [
        {
          id: 1,
          label: "第一单元",
          children: [
            {
              id: 4,
              label: "快乐作业1"
            }
          ]
        },
        {
          id: 2,
          label: "第二单元",
          children: [
            {
              id: 5,
              label: "快乐作业2"
            },
            {
              id: 6,
              label: "快乐作业3"
            }
          ]
        },
        {
          id: 3,
          label: "第三单元",
          children: [
            {
              id: 7,
              label: "快乐作业4"
            },
            {
              id: 8,
              label: "快乐作业5"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {},
  methods: {
    goChooseTextbook() {
      this.$router.push({
        path: "/chooseTextbook"
      });
    },
    clickPublish() {
      this.$router.push({
        path: "/homeworkPublishSetting"
      });
    },
    clickTab(name) {
      this.activeTabName = name;
    },
    clickSelectAll() {
      this.checkList = [];
      var array = this.options;
      for (let i = 0; i < array.length; i++) {
        this.checkList.push(array[i].value);
      }
      console.log(this.checkList);
    }
  }
};
</script>

<style scoped>
.activeTabClass {
  color: #fc9153;
}
</style>
