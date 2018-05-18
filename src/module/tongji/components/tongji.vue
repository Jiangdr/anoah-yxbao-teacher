<template>
<v-touch
  class="tongji"
  v-on:swipeleft="onSwipeLeft"
  v-on:swiperight="onSwipeRight"
>
    <router-view></router-view>
  </v-touch>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  name: 'tongji',
  created() {
    this.detail();
  },
  activated() {
    this.detail();
  },
  computed: {
    ...mapState({
      'params': (state) => state.homeworkDetail.params
    })
  },
  methods: {
    detail() {
      console.log(this.params.qti_question_type_id)
      let type = parseInt(this.params.qti_question_type_id);
      let name = "";
      if (type === 1 || type === 2 || type === 3 || type === 6 || type === 15) {
        name = "answerColumn";
        // 客观填空、选择填空统计页面
      } else if (type === 4 || type === 20) {
        name = "correctTable";
        // 主观填空统计页面
      } else if (type === 5) {
        name = "Subjective";
        // 连线题、连词成句、加法竖式、减法竖式、乘法竖式、除法竖式
      } else if (type === 9 || type === 21 || type === 23 || type === 24 || type === 25 || type === 26) {
        name = "correctColumn";
      } else if (type === 11) {
        name = "choiceTable";
      } else if (parseInt(curr.icom_id) || type === 17) {
        name = "hanzitingxie";
      }
      this.$router.push({
        name: name
      });
    },
    onSwipeLeft() {
      this.$store.commit('homeworkDetail/setIndex', 1, this.detail)
      this.detail()
    },
    onSwipeRight() {
      this.$store.commit('homeworkDetail/setIndex', -1, this.detal)
      this.detail()
    }
  }
}
</script>

<style>

</style>
