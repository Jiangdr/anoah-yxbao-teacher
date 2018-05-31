<template>
  <div v-if="info.qti_question_type_id !== '33' && info.version === 0"
    :id="id"
    :caller="caller"
    class="qti"
    :icom_id="icom_id"
    :dcom_id="dcom_id"
    :user_id="user_id"
    :setting="encodeURI(JSON.stringify(setting))"
    :app_name="app_name"
    :package_name="package_name"
    :type="type"
    :appclass="appclass"
  ></div>
  <div v-else>
    <Qti :setting="newSetting"></Qti>
  </div>
</template>
<script>
export default {
  name: 'RenderQti',
  props: {
    id: {
      type: String,
      required: true
    },
    caller: {
      type: String,
      default: 'mobile'
    },
    icom_id: {
      required: true
    },
    dcom_id: {
      required: true
    },
    // 取学习记录需要传对应的学生id 显示正确答案user_id = 0
    user_id: {
      default: '0'
    },
    setting: {
      type: Object,
      required: true
    },
    app_name: {
      type: String,
      default: 'qti'
    },
    package_name: {
      type: String,
      default: 'QTI'
    },
    type: {
      type: String,
      default: 'jsicom'
    },
    appclass: {
      type: String,
      default: 'qti'
    },
    info: {
      type: Object
    }
  },
  computed: {
    newSetting() {
      return {
        caller: 'PREVIEWOR',
        course_resource_id: this.setting.course_resource_id,
        dcom_entity: '',
        dcom_entity_id: this.setting.dcom_entity_id,
        domain: window.bus.$store.getters['runEnv/old'],
        in_class: 0,
        num: -1,
        publish_id: this.setting.publish_id,
        qid: this.info.source_pk_id,
        show_answer: 0,
        user_id: this.user_id,
        view_id: '',
        resource_type: this.info.resource_type
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      $i(this.id, '', () => {});
    })
  },
  watch: {
    dcom_id(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$nextTick(() => {
          $i(this.id, '', () => {});
        })
      }
    },
    newSetting(newVal, oldVal) {
      console.log(11111, newVal, oldVal)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
