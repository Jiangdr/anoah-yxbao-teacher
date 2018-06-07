<template>
  <div v-if="info.qti_question_type_id !== '33' && info.version === 0"
    :id="info.source_pk_id + ''"
    caller="mobile"
    class="qti"
    :icom_id="info.icom_id"
    :dcom_id="info.source_pk_id"
    :user_id="user_id"
    :setting="encodeURI(JSON.stringify(oldSetting))"
    app_name="qti"
    package_name="QTI"
    type="jsicom"
    appclass="qti"
    :dcom_entity="dcomentity"
  ></div>
  <div v-else>
    <Qti :setting="newSetting"></Qti>
  </div>
</template>
<script>
export default {
  name: 'RenderQti',
  props: {
    // 取学习记录需要传对应的学生id 显示正确答案user_id = 0
    user_id: {
      default: '0'
    },
    info: {
      type: Object
    },
    num: {
      type: Number,
      default: -1
    },
    hideResult: {
      type: String,
      default: '0'
    },
    qtiData: {
      default: ''
    }
  },
  computed: {
    newSetting() {
      return {
        caller: 'PREVIEWOR',
        course_resource_id: this.info.course_resource_id,
        dcom_entity_id: this.info.dcom_entity_id,
        domain: window.bus.$store.getters['runEnv/old'],
        in_class: 0,
        num: this.num,
        publish_id: this.info.course_hour_publish_id,
        qid: this.info.source_pk_id,
        show_answer: 0,
        user_id: this.user_id,
        view_id: '',
        dcom_entity: this.qtiData,
        resource_type: this.info.resource_type,
        hide_result: this.hideResult
      }
    },
    oldSetting() {
      return {
        'smt': 'no_self_smt',
        'publish_id': this.info.course_hour_publish_id,
        'course_resource_id': this.info.course_resource_id,
        'caller': 'ICLASS',
        'dcom_entity_id': this.info.dcom_entity_id,
        'titleflag': 1,
        'num': this.num
      }
    },
    dcomentity() {
      return escape(JSON.stringify(this.qtiData))
    }
  },
  mounted () {
    this.$nextTick(() => {
      $i(this.info.source_pk_id, '', () => {});
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
