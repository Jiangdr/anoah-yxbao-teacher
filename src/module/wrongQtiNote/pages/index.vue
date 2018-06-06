<template>
  <div id="wrong-qti-note">
    <header-bar @back="$router.back(-1)">
      <div slot="title-name">三年级一班</div>
      <div slot="right-area" @click="filterShow = true" style="color:#4a4a4a">筛选</div>
    </header-bar>
    <div class="content">
      <div class="qti-count">
        <div>
          <span>全部题目</span>
          <span>( <span style="color:#1a1a1a">10</span> )</span>
        </div>
        <div class="all-select" :class="{active: allSelect === true}" @click="selectAll">全选</div>
      </div>
      <div class="qti-list">
        <div class="qti-item" :class="{'van-hairline--bottom': index !== 29}" v-for="(item, index) in 30" :key="index">{{item}}</div>
      </div>
    </div>
    <div class="footer-bar van-hairline--top">
      <div>
        <span>已选中</span>
        <span style="color:#ff8d15">100</span>
        <span>道题</span>
      </div>
      <div class="create-btn">布置</div>
    </div>
    <transition name="van-fade">
      <filter-limit class="filter-wrapper" v-show="filterShow" @closeFilter="filterShow = false" :filterData="filterData"></filter-limit>
    </transition>
  </div>
</template>
<script>
import headerBar from '@/components/headerBar'
import filterLimit from '@/module/wrongQtiNote/pages/filter'
import api from '@/module/wrongQtiNote/axios/index'
import {mapGetters} from 'vuex'
export default {
  name: 'WrongQtiNote',
  data() {
    return {
      filterShow: false, // 筛选页显示
      allSelect: false // 是否全选
    }
  },
  computed: {
    ...mapGetters({
      classes: 'wrongQtiNote/getClass'
    }),
    filterData() {
      return {
        '班级': [...this.classes],
        '题目类型': [
          {
            name: '试题类',
            type: 0,
            active: true
          },
          {
            name: '组件类',
            type: 1,
            active: false
          }
        ],
        '错误率': [
          {
            name: '全部',
            type: 0,
            active: true
          },
          {
            name: '41%-100%',
            type: 4,
            active: false
          },
          {
            name: '21%-40%',
            type: 3,
            active: false
          },
          {
            name: '10%-20%',
            type: 2,
            active: false
          },
          {
            name: '10%以下',
            type: 4,
            active: false
          }
        ],
        '攻克率': [
          {
            name: '全部',
            type: 0,
            active: true
          },
          {
            name: '41%-100%',
            type: 4,
            active: false
          },
          {
            name: '21%-40%',
            type: 3,
            active: false
          },
          {
            name: '10%-20%',
            type: 2,
            active: false
          },
          {
            name: '10%以下',
            type: 4,
            active: false
          }
        ],
        '时间': [
          {
            name: '全部',
            type: 0,
            active: true
          },
          {
            name: '最近一周',
            type: 1,
            active: false
          },
          {
            name: '最近一个月',
            type: 2,
            active: false
          },
          {
            name: '最近三个月',
            type: 3,
            active: false
          },
          {
            name: '最近半年',
            type: 4,
            active: false
          }
        ]
      }
    }
  },
  mounted() {
    // api.getList({
    // })
  },
  methods: {
    // 全选
    selectAll() {
      this.allSelect = !this.allSelect
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.filterShow) {
      this.filterShow = false
      next(false)
    } else {
      next()
    }
  },
  components: {
    headerBar,
    filterLimit
  }
}
</script>
<style lang="scss" scoped>
#wrong-qti-note{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 16px;
  position: relative;
  .content{
    width: 100%;
    height: calc(100% - 45px);
    .qti-count{
      width: 100%;
      height: 45px;
      line-height: 45px;
      padding: 0 13px;
      background-color: #f5f8f8;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      color: #4d5050;
      .all-select.active{
        color: #23c08e;
      }
    }
    .qti-list{
      height: calc(100% - 45px);
      padding: 0 13px 65px 13px;
      box-sizing: border-box;
      width: 100%;
      overflow-y: scroll;
      .qti-item{
        min-height: 100px;
      }
    }
  }
  .footer-bar{
    position: fixed;
    width: 100%;
    height: 65px;
    line-height: 65px;
    bottom: 0;
    left: 0;
    display: flex;
    padding: 0 13px;
    box-sizing: border-box;
    justify-content: space-between;
    background-color: #fff;
    .create-btn{
      width: 100px;
      height: 50px;
      line-height: 50px;
      margin-top: 7.5px;
      background-color: #08b884;
      border-radius: 10px;
      color: #fff;
      text-align: center;
    }
  }
  .filter-wrapper{
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: scroll;
    position: absolute;
    top: 45px;
    left: 0;
    background-color: #fff;
    z-index: 1;
  }
}
</style>
