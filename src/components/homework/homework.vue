<template>
  <cube-button>Button</cube-button>
</template>

<script>
export default {
  name: 'Homework',
  data () {
    return {
      list: [],
      loading: false,
      refreshLoading: false,
      finished: false
    }
  },
  computed: {

  },
  methods: {
    goHomework () {
      this.$router.push({
        path: '/homework'
      })
    },
    onClickLeft () {

    },
    onClickRight () {

    }
  }
}
</script>
<style scoped>

</style>
