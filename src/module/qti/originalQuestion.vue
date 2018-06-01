<template>
  <div id="original-question">
    <header-bar @back="$router.back(-1)">
      <div slot="title-name">
        {{$route.query.title && $route.query.title}}
      </div>
    </header-bar>
    <div class="content">
      <render-qti v-if="$route.query.question_info" :info="$route.query.question_info && JSON.parse($route.query.question_info)" :user_id="$route.query.user_id && $route.query.user_id"></render-qti>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import headerBar from '@/components/headerBar.vue'
import RenderQti from '@/components/renderQti.vue'
export default {
  name: 'OriginalQuestion',
  data() {
    return {}
  },
  computed: {
  },
  components: {
    headerBar,
    RenderQti
  }
}
</script>
<style lang="scss" scoped>
#original-question{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.content{
  width: 100%;
  height: calc(100% - 45px);
  overflow-y: scroll;
}
</style>
