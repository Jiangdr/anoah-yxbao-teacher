<template>
  <div class="info">
      <p class="name">
        {{title}}
        <span style="float:right">共<b>{{total}}</b>份</span>
      </p>
      <p class="times">
        截止时间：{{endTime}}
      </p>
    </div>
</template>
<script>
export default {
  name: "info",
  props: {
    title: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped lang="scss">
.info {
  padding: 10px;
  line-height: 30px;
  background: #fff;
  height: 75px;
  box-sizing: border-box;
  .name {
    font-weight: bold;
    span{
      color:#c8c9c9;
      font-size: 14px;
      b{
        color:#9c9ea1;
      }
    }
  }
  .times {
    font-size: 14px;
  }
}
</style>
