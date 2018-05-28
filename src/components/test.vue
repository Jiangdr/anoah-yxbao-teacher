<template>
  <div id="test">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>1</swiper-slide>
      <swiper-slide>2</swiper-slide>
      <swiper-slide>3</swiper-slide>
      <swiper-slide>4</swiper-slide>
      <swiper-slide>5</swiper-slide>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      swiperOption: {
        // virtual: true
        // slidesPerView: 3
      }
    }
  },
  mounted() {
  },
  methods: {
    slideEnd(num) {
      console.log(num)
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="scss" scoped>
#test{
  height: 100%;
  overflow: scroll;
}
</style>
