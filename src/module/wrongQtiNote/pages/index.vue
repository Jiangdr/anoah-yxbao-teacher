<template>
  <div id="wrong-qti-note">
    <header-bar @back="$router.back(-1)">
      <div slot="title-name">{{className || classes[0].class_name}}</div>
      <div slot="right-area" @click="filterShow = true" style="color:#4a4a4a">筛选</div>
    </header-bar>
    <div v-show="listLoading" class="loading">
      <i class="fa fa-spinner fa-spin"></i>
      <span>加载中...</span>
    </div>
    <div v-show="!listLoading" class="content">
      <div class="qti-count" v-show="qtiList.length">
        <div>
          <span>全部题目</span>
          <span>( <span style="color:#1a1a1a">{{totalPage}}</span> )</span>
        </div>
      </div>
      <div class="qti-list" v-show="qtiList.length" @scroll="loadMore">
        <div id="scroller" ref="scroller">
          <div class="qti-item" v-for="(item, index) in qtiList" :key="index" @click="linkTo(item)">
            <render-qti :info="item" :num="index + 1" :qtiData="item.qti_data" v-if="type === 0"></render-qti>
            <div class="qti-type" :class="{'van-hairline--bottom': index !== qtiList.length - 1}" v-if="type === 0">
              <div class="info">
                <span class="qti-type-name">{{item.qtypeName}}</span>
                <span>{{item.diffName}}</span>
                <span class="input" :class="{active: item.checked}" @click.stop="choose(item, index)"></span>
              </div>
              <div class="percent">
                <span style="color:#8a8a8d;margin-right:5px;">错误率:</span>{{Math.round(item.wrong_rate * 100)}}%
                <span style="color:#8a8a8d;margin-right:5px;">攻克率:</span>{{Math.round(item.conquer_rate * 100)}}%
              </div>
            </div>
            <div v-if="type === 1">{{item | questionName(item)}}</div>
          </div>
          <div class="loading" v-show="currentPage < pageCount">
            <i class="fa fa-spinner fa-spin"></i>
            <span>加载中...</span>
          </div>
          <div class="loading" v-show="currentPage >= pageCount">
            没有更多数据了
          </div>
        </div>
      </div>
      <div class="no-data" v-show="!qtiList.length">
        <div class="no-data-img"></div>
        <div>学生们很棒，没有错题信息哟</div>
      </div>
    </div>
    <div v-show="!listLoading" class="footer-bar van-hairline--top">
      <div>
        <span>已选中</span>
        <span style="color:#ff8d15">{{selCount}}</span>
        <span>道题</span>
      </div>
      <div class="create-btn" :class="{disabled: !selCount}" @click="create">布置</div>
    </div>
    <transition name="van-fade" v-show="!listLoading">
      <filter-limit class="filter-wrapper" v-if="filterShow" @closeFilter="filterShow = false" @afterFilter="afterFilter" :filterData="filterData" :active="active"></filter-limit>
    </transition>
  </div>
</template>
<script>
import headerBar from '@/components/headerBar'
import filterLimit from '@/module/wrongQtiNote/pages/filter'
import api from '@/module/wrongQtiNote/axios/index'
import renderQti from '@/components/renderQti'
import {mapGetters} from 'vuex'
export default {
  name: 'WrongQtiNote',
  data() {
    return {
      filterShow: false, // 筛选页显示
      className: null, // 班级名称
      qtiList: [], // 存放qti数据容器
      totalPage: 0, // 总页数
      selCount: 0, // 选中的试题数
      perPage: 9, // 每页加载的条数
      currentPage: 1, // 当前的页数
      pageCount: null, // 总页数
      scrollReat: null, // 滚动页面的盒模型
      loading: false, // 是否在下拉加载中
      listLoading: true, // 列表是否在加载中
      // 筛选条件参数
      active: {
        '班级': 0,
        '题目类型': 0,
        '错误率': 0,
        '攻克率': 0,
        '时间': 0
      },
      // 获取列表参数
      class_id: null,
      type: 0,
      conquer_rate_flag: '',
      wrong_rate_flag: '',
      start_time: '',
      end_time: '',
      resource_ids: [] // 所有已选择的资源容器
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
            type: 0
          },
          {
            name: '组件类',
            type: 1
          }
        ],
        '错误率': [
          {
            name: '全部',
            type: 0
          },
          {
            name: '41%-100%',
            type: 4
          },
          {
            name: '21%-40%',
            type: 3
          },
          {
            name: '10%-20%',
            type: 2
          },
          {
            name: '10%以下',
            type: 4
          }
        ],
        '攻克率': [
          {
            name: '全部',
            type: 0
          },
          {
            name: '41%-100%',
            type: 4
          },
          {
            name: '21%-40%',
            type: 3
          },
          {
            name: '10%-20%',
            type: 2
          },
          {
            name: '10%以下',
            type: 4
          }
        ],
        '时间': [
          {
            name: '全部',
            type: 0
          },
          {
            name: '最近一周',
            type: 1
          },
          {
            name: '最近一个月',
            type: 2
          },
          {
            name: '最近三个月',
            type: 3
          },
          {
            name: '最近半年',
            type: 4
          }
        ]
      }
    }
  },
  mounted() {
    this.class_id = this.classes[0].class_id
    let params = {
      class_id: this.class_id,
      type: this.type,
      conquer_rate_flag: this.conquer_rate_flag,
      wrong_rate_flag: this.wrong_rate_flag,
      start_time: this.start_time,
      end_time: this.end_time,
      page: this.currentPage,
      per_page: this.perPage
    }
    this.getList(params)
  },
  methods: {
    // 获取试题数据
    getList(params) {
      this.loading = true
      if (!this.qtiList.length) {
        this.listLoading = true
      }
      api.getList(params).then(succ => {
        this.totalPage = succ.total_count
        this.listLoading = false
        this.pageCount = Math.ceil(succ.total_count / (this.perPage + 1))
        succ.lists.forEach(ele => {
          if (this.resource_ids.includes(ele.resource_id)) {
            ele['checked'] = true
          } else {
            ele['checked'] = false
          }
        })
        this.qtiList.push(...succ.lists)
        this.$nextTick(() => {
          setTimeout(() => {
            this.scrollReat = this.util.getRect(this.$refs.scroller)
            this.loading = false
          }, 1000)
        })
      })
    },
    // 筛选项选中一项
    choose(data, index) {
      this.qtiList[index]['checked'] = !data.checked
      if (this.qtiList[index]['checked']) {
        this.selCount++
        this.resource_ids.push(data.resource_id)
      } else {
        this.selCount--
        for (let i = 0; i < this.resource_ids.length; i++) {
          if (this.resource_ids[i] === data.resource_id) {
            this.resource_ids.splice(i, 1)
          }
        }
      }
    },
    // 筛选完成
    afterFilter(params, active) {
      this.active = active
      this.filterShow = false
      this.qtiList = []
      this.currentPage = 1
      this.class_id = params.class_id
      this.type = params.type
      this.conquer_rate_flag = params.conquer_rate_flag
      this.wrong_rate_flag = params.wrong_rate_flag
      this.start_time = params.start_time
      this.end_time = params.end_time
      this.className = params.class_name
      document.querySelector('.qti-list').scrollTop = 0
      this.getList({
        class_id: this.class_id,
        type: this.type,
        conquer_rate_flag: this.conquer_rate_flag,
        wrong_rate_flag: this.wrong_rate_flag,
        start_time: this.start_time,
        end_time: this.end_time,
        page: this.currentPage,
        per_page: this.perPage
      })
    },
    // 布置作业
    create() {
      // alert('开发中，不急')
      this.$router.push({
        path: '/homeworkPublishSetting',
        query: {
          homeworkName: `错题重做_${this.formatTime(new Date())}`,
          resource_ids: this.resource_ids
        }
      })
    },
    // 计算时间
    formatTime(time) {
      let y = time.getFullYear() + ''
      let m = time.getMonth() + 1 > 9 ? time.getMonth() + 1 + '' : '0' + (time.getMonth() + 1)
      let d = time.getDate() > 9 ? time.getDate() + '' : '0' + time.getDate()
      return y + '-' + m + '-' + d
    },
    // 加载更多
    loadMore(e) {
      if (this.loading) {
        return false
      }
      let targetRect = this.util.getRect(e.target)
      if (this.scrollReat.height - targetRect.scrollTop <= targetRect.height) {
        if (this.currentPage >= this.pageCount) {
          return false
        }
        this.currentPage++
        this.getList({
          class_id: this.class_id,
          type: this.type,
          conquer_rate_flag: this.conquer_rate_flag,
          wrong_rate_flag: this.wrong_rate_flag,
          start_time: this.start_time,
          end_time: this.end_time,
          page: this.currentPage,
          per_page: this.perPage
        })
      }
    },
    // 查看原题
    linkTo(info) {
      if (info.icom_id !== '4629') {
        return false
      } else {
        info.resource_name = ''
        this.$router.push({
          path: `/originalQuestion`,
          query: {
            user_id: 0,
            question_info: JSON.stringify(info),
            title: '试题详情'
          }
        })
      }
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
    filterLimit,
    renderQti
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
      height: calc(100% - 45px - 65px);
      padding: 0 0 0 0;
      box-sizing: border-box;
      width: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      .qti-item{
        .qti-type{
          margin: 0 13px;
          padding: 13px 0;
          .qti-type-name{
            padding: 3px 10px 3px 15px;
            margin-right: 10px;
            color: #fff;
            display: inline-block;
            text-align: center;
            background: url(../../../assets/images/wrongQtiNote/type.png) no-repeat 0 0;
            background-size: cover;
          }
          .input{
            width: 19px;
            height: 19px;
            display: inline-block;
            background: url(../../../assets/images/public/checkunsel.png) no-repeat 0 0;
            background-size: 100% 100%;
            float: right;
            margin-top: 5px;
            &.active{
              background: url(../../../assets/images/public/checksel.png) no-repeat 0 0;
              background-size: 100% 100%;
            }
          }
        }
        .percent{
          height: 50px;
          line-height: 50px;
          padding-left: 8px;
        }
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
      &.disabled{
        pointer-events: none;
        background-color: #aaa;
      }
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
  .no-data{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999;
    .no-data-img{
      width: 118px;
      height: 123px;
      background: url(../../../assets/images/homeworkDetail/no-data.png) no-repeat 0 0;
      background-size: 100% 100%;
    }
  }
  .loading{
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #999;
  }
}
</style>
