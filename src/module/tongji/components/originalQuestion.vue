<template>
  <div id="original-question">
    <render-qti
      id="qti"
      icom_id="4629"
      :dcom_id="questionId"
      user_id="0"
      :setting="setting"
    ></render-qti>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import RenderQti from '@/components/renderQti.vue'
export default {
  name: 'OriginalQuestion',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      qtiInfo: state => state.homeworkDetail.params,
      userId: state => state.account.userInfo.userid
    }),
    questionId() {
      return this.qtiInfo.source_pk_id
    },
    setting() {
      let result = {
        'smt': 'no_self_smt',
        'publish_id': this.qtiInfo.course_hour_publish_id,
        'course_resource_id': this.qtiInfo.course_resource_id,
        'caller': 'ICLASS',
        'dcom_entity_id': this.qtiInfo.dcom_entity_id,
        'show_answer': 0
      }
      return result
    }
  },
  mounted () {
    this.$nextTick(() => {
      $i('qti', '', () => {});
    })
  },
  components: {
    RenderQti
  }
}
</script>
<style lang="scss" scoped>
</style>
