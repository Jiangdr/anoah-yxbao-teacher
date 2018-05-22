<template>
  <div id="test">
    <slide @slideEnd="slideEnd">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </slide>
  </div>
</template>
<script>
import slide from './slide'
export default {
  data() {
    return {}
  },
  methods: {
    slideEnd(num) {
      console.log(num)
    }
  },
  components: {
    slide
  }
}
</script>
<style lang="scss" scoped>
</style>
