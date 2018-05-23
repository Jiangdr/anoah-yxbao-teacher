<template>
  <div class="more">
    <cube-popup
    type="my-popup"
    :center="false"
    ref="myPopup"
    v-show="this.showPopup"
    @mask-click="togglePopup"
  >
    <div class="popupWrapper">
      <div class="border-bottom-1px popupItem">查看作业内容</div>
      <div class="border-bottom-1px popupItem">再次布置</div>
      <div class="border-bottom-1px popupItem">收藏作业</div>
      <div class="border-bottom-1px popupItem">删除作业</div>
      <div
        class="border-bottom-1px popupItem"
        @click="togglePopup"
      >取消</div>
</div>

</cube-popup>
  </div>
</template>
<script>
export default{
  name: 'more',
  data() {
    return {
      showPopup: true
    }
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup
    }
  }
}
</script>
<style>
 .popupItem {
  line-height: 50px;
  text-align: center;
}

 .popupWrapper {
  background: #fff;
}

.cube-popup-content {
  background: #fff;
}
</style>
