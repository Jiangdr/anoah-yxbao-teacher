<template>
<van-nav-bar :title="title" :left-text="text" left-arrow @click-left="goBack">
   <slot  slot="right"></slot>
</van-nav-bar>
</template>

<script>
export default {
  props: ['title', 'text'],
  data: function () {
    return {

    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }

}
</script>

<style>

</style>
