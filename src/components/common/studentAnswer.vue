<template>
  <div>
    <!-- <div v-bind:style="listContainerStyle"> -->
    <div class="containerHeight">
      <div style="height: 28px;line-height: 28px;background-color: #fff;padding: 5px 10px;">
        {{answerInfo.characters}}
      </div>

      <div v-for="item in answerInfo.video" :key="item">
        <div>
          <video width="320" height="240" controls>
            <source :src="item"  type="video/mp4">
          </video>
        </div>
      </div>

      <div v-for="item in answerInfo.images" :key="item">
        <div style="width: 100%;">
          <img style="width: 50%;" :src="item" alt="">
        </div>
      </div>

      <div v-for="item in answerInfo.audio" :key="item">
        <div>
          <audio width="320" height="240" controls :src="item"></audio>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "studentAnswer",
  props: ['answerInfo'],
  data() {
    return {
      peopleNum: 0,
      listContainerStyle: {
        'height': window.innerHeight - 110 + "px",
        // 'overflow-y': 'auto',
        'background': '#fff'
      }
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.containerHeight {
  height: calc(100% - 130px);
}
</style>
