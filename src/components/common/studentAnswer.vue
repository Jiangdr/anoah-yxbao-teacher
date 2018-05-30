<template>
  <div>
    <div v-for="(item, index) in answerList" :key="index">
      <div style="height: 28px;line-height: 28px;background-color: #fff;padding: 5px 10px;">
        {{item.answer_detail.characters}}
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "studentAnswer",
  props: ['answerList'],
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
