<template>
  <div id="student-homework">
    <header-bar @back="goback">
      <div slot="title-name">
        作业@{{$route.params.user_name}}
      </div>
    </header-bar>
    <div class="content" v-if="!loading">
      <div class="homeworkInfo">
        <div class="name-count">
          <span class="name">{{studentHomeworkInfo.title}}</span>
          <span class="count">
            共<span style="color:#7e8181">{{studentHomeworkInfo.course_resource_count}}</span>份
          </span>
        </div>
        <div class="dead-time">
          截止时间:{{studentHomeworkInfo.deadline}}{{timeOver}}
        </div>
      </div>
      <div class="chart-area">
        <div class="complete-rate" ref="complete"></div>
        <div class="correct-rate" ref="correct"></div>
      </div>
      <div class="homework-list">
        <div class="list-item van-hairline--bottom" v-for="(item, index) in studentHomeworkInfo.course_resource_list" :key="index" @click="linkTo(item)">
          <div class="left">
            <div class="resource-name ellipsis">{{item.resource_name}}</div>
            <div class="correct-rate">正确率<span style="color:#1e1e1e;padding-left:5px">{{item.correct_rate ? Math.round(item.correct_rate * 100) + '%' : '--'}}</span></div>
          </div>
          <div class="right">
            <span class="tag-btn finish" v-if="item.is_finish === 1">已完成</span>
            <span class="tag-btn unfinish" v-else>未完成</span>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-else>加载中...</div>
  </div>
</template>
<script>
import api from '../api'
import headerBar from '@/components/headerBar'
import {mapMutations} from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'StudentHomework',
  data() {
    return {
      loading: true,
      studentHomeworkInfo: null,
      completeChart: null,
      correctChart: null
    }
  },
  computed: {
    timeOver() {
      if (this.studentHomeworkInfo) {
        if (new Date(this.studentHomeworkInfo.deadline).getTime() - new Date().getTime() > 0) {
          return ``
        } else {
          return `(已截止)`
        }
      }
    }
  },
  mounted() {
    this.getResource()
  },
  activated() {
    this.getResource()
  },
  methods: {
    ...mapMutations({
      setAnswerParams: 'answerDetail/setParams',
      setAnswerResource: 'answerDetail/setResource'
    }),
    getResource() {
      this.loading = true
      api.studentHomeworkInfo({
        user_id: this.$route.params.user_id,
        publish_id: this.$route.params.publish_id
      }).then(succ => {
        this.loading = false
        this.studentHomeworkInfo = succ
        this.renderChart()
      }).catch(() => {
      })
    },
    renderChart() {
      this.$nextTick(() => {
        this.completeChart = this.$echarts.init(this.$el.querySelector('.complete-rate'))
        this.correctChart = this.$echarts.init(this.$el.querySelector('.correct-rate'))
        this.correctChart.setOption({
          title: {
            text: `${Math.round(this.studentHomeworkInfo.correct_rate * 100)}%`,
            subtext: '正确率',
            x: 'center',
            top: '40%',
            textStyle: {
              color: '#1e1e1e',
              fontSize: this.fontSize
            },
            subTextStyle: {
              color: '#c8c8c8',
              fontSize: this.fontSize
            }
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              silent: true,
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: Math.round(this.studentHomeworkInfo.correct_rate * 100),
                  itemStyle: {
                    color: '#66b6fe'
                  }
                },
                {
                  value: 100 - Math.round(this.studentHomeworkInfo.correct_rate * 100),
                  itemStyle: {
                    color: '#e8edee'
                  }
                }
              ]
            }
          ]
        })
        this.completeChart.setOption({
          title: {
            text: `${Math.round(this.studentHomeworkInfo.course_resource_finish_count / this.studentHomeworkInfo.course_resource_count * 100)}%`,
            subtext: '完成进度',
            x: 'center',
            top: '40%',
            textStyle: {
              color: '#1e1e1e',
              fontSize: this.fontSize
            },
            subTextStyle: {
              color: '#c8c8c8',
              fontSize: this.fontSize
            }
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              silent: true,
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: Math.round(this.studentHomeworkInfo.course_resource_finish_count / this.studentHomeworkInfo.course_resource_count * 100),
                  itemStyle: {
                    color: '#11d097'
                  }
                },
                {
                  value: 100 - Math.round(this.studentHomeworkInfo.course_resource_finish_count / this.studentHomeworkInfo.course_resource_count * 100),
                  itemStyle: {
                    color: '#e8edee'
                  }
                }
              ]
            }
          ]
        })
      })
    },
    goback() {
      this.$router.back(-1)
      this.completeChart = null
      this.correctChart = null
    },
    linkTo(item) {
      if (item.is_finish === 1) {
        let type = this.util.judgeQuestionType(item)
        if (type) {
          this.setAnswerParams({
            index: 0,
            title: `${this.$route.params.user_name}的作业`,
            type: 2,
            user_id: this.$route.params.user_id
          })
          if (type === 'combineqti') {
            // 套题
            let toast = Toast.loading({
              duration: 0,
              forbidClick: true,
              loadingType: 'circular',
              message: '加载中'
            })
            api.getMiniResource({
              publish_id: item.course_hour_publish_id,
              course_resource_id: item.course_resource_id,
              dcom_entity_id: item.dcom_entity_id
            }).then(succ => {
              toast.clear()
              this.setAnswerResource(succ)
              this.$router.push({path: '/answerDetail'})
            })
          } else {
            // 单题
            this.setAnswerResource([item])
            this.$router.push({path: '/answerDetail'})
          }
        } else {
          Toast.fail('暂不支持该类型组件查看');
        }
      }
    }
  },
  components: {
    headerBar
  }
}
</script>
<style lang="scss" scoped>
#student-homework{
  font-size: 16px;
  height: 100%;
  .content{
    height: calc(100% - 45px);
    .homeworkInfo{
      box-sizing: border-box;
      height: 75px;
      padding: 10px 13px;
      .name-count{
        display: flex;
        justify-content: space-between;
        height: 20px;
        line-height: 20px;
        .name{
          font-weight: 600;
          color: #1e1e1e;
        }
        .count{
          color: #c8c8c8;
        }
      }
      .dead-time{
        height: 20px;
        line-height: 20px;
        padding-top: 10px;
        color: #c8c8c8;
      }
    }
    .chart-area{
      height: 180px;
      box-sizing: border-box;
      padding: 0 13px;
      background-color: #f5f8f8;
      display: flex;
      .complete-rate{
        width: 50%;
        height: 100%;
      }
      .correct-rate{
        width: 50%;
        height: 100%;
      }
    }
    .homework-list{
      height: calc(100% - 180px - 75px);
      overflow-y: scroll;
      box-sizing: border-box;
      padding: 0 13px;
      .list-item{
        height: 75px;
        padding: 10px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .left{
          flex: 0 0 250px;
          .resource-name{
            color: #1e1e1e;
            height: 30px;
            line-height: 30px;
            width: 250px;
          }
          .correct-rate{
            color: #7f8284;
            height: 30px;
            line-height: 30px;
            width: 250px;
          }
        }
        .right{
          flex: 0 0 auto;
          height: 55px;
          line-height: 55px;
          span.tag-btn{
            padding: 10px 15px;
            border-radius: 5px;
            &.finish{
               background-color: #08b884;
               color: #fff;
            }
            &.unfinish{
              background-color: #fff;
              color: #7e8183;
            }
          }
        }
      }
    }
  }
}
</style>
