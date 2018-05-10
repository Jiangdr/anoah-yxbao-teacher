<template>
  <div id="school-search">
    <form action="/">
    <van-search
      v-model="value"
      placeholder="请输入学校名称"
    />
    <van-cell-group v-if="schoolList && !searchList.length">
      <van-cell v-for="(item,index) in schoolList" :key="index" @click="choose(item.school_id, item.name)" :title="item.name"></van-cell>
    </van-cell-group>
    <van-cell-group v-if="searchList.length">
      <van-cell v-for="(item,index) in searchList" :key="index" @click="choose(item.school_id, item.name)" :title="item.name"></van-cell>
    </van-cell-group>
  </form>
  </div>
</template>
<script>
import api from '@/module/account/axios/user'
export default {
  name: 'SchoolSearch',
  data () {
    return {
      value: '',
      schoolList: null,
      searchList: []
    }
  },
  watch: {
    value (value) {
      this.searchList = []
      this.schoolList.filter(el => {
        if (el.name.indexOf(value) > 0) {
          this.searchList.push(el)
        }
      })
    }
  },
  mounted () {
    api.schoolList({
      city_id: this.$route.params.cityId
    }).then(succ => {
      this.schoolList = succ
    })
  },
  methods: {
    choose (id, name) {
      window.bus.$emit('choose', {id: id, name: name})
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped>
</style>
