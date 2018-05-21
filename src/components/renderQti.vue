<template>
  <div
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
