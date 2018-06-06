<template>
  <div id="filter-limit">
    <div class="content">
      <div class="filter-item" v-for="(val, key) in filterData" :key="key">
        <div class="name">{{key}}</div>
        <div class="item-wrapper">
          <div class="item-list ellipsis" :class="{active: item.active}" v-for="(item, index) in val" :key="index" @click="filterItem(key, item)">
            <span>{{item.name || item.class_name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="operation-bar van-hairline--top">
      <button type="button" class="cancel" @click="$emit('closeFilter')">取消</button>
      <button type="button" class="sure">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterLimit',
  props: ['filterData'],
  data() {
    return {
    }
  },
  methods: {
    filterItem(key, item) {
      if (item.active) {
        return false
      }

    }
  }
}
</script>
<style lang="scss" scoped>
#filter-limit{
  .content{
    width: 100%;
    height: calc(100% - 65px);
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 0 13px;
    .filter-item{
      .name{
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #1e1e1e;
      }
      .item-wrapper{
        display: flex;
        flex-wrap: wrap;
        .item-list{
          background: #f5f5f8;
          flex: 0 0 80px;
          margin-bottom: 8px;
          margin-right: 7px;
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          border-radius: 5px;
          color: #4c4f4f;
          text-align: center;
          &.active{
            background: #08b884;
            color: #fff;
          }
        }
      }
    }
  }
  .operation-bar{
    width: 100%;
    height: 65px;
    box-sizing: border-box;
    padding: 0 13px;
    display: flex;
    justify-content: space-between;
    button{
      outline: none;
      border: 1px solid #08b884;
      background: #fff;
      width: 160px;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;
      margin-top: 7.5px;
      &.sure{
        background-color: #08b884;
        color: #fff;
      }
    }
  }
}
</style>
