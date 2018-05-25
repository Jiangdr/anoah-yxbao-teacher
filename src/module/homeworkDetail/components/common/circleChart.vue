<template>
  <div id="circle-chart">
    <div class="title van-hairline--bottom">学生作业成绩分布</div>
    <div class="chart-content">
      <div id="chart"></div>
      <div class="legend one">
        <div class="label"></div>
        <div class="des">
          <span>待提升</span>
          <span>({{this.info['待提升'].num}}人)</span>
        </div>
        <div class="per">{{Math.ceil(this.info['待提升'].num / pigaiSum * 100)}}%</div>
      </div>
      <div class="legend two">
        <div class="label"></div>
        <div class="des">
          <span>及格</span>
          <span>({{this.info['及格'].num}}人)</span>
        </div>
        <div class="per">{{Math.ceil(this.info['及格'].num / pigaiSum * 100)}}%</div>
      </div>
      <div class="legend three">
        <div class="des">
          <span>({{this.info['良好'].num}}人)</span>
          <span>良好</span>
        </div>
        <div class="label"></div>
        <div class="per">{{Math.ceil(this.info['良好'].num / pigaiSum * 100)}}%</div>
      </div>
      <div class="legend four">
        <div class="des">
          <span>({{this.info['优秀'].num}}人)</span>
          <span>优秀</span>
        </div>
        <div class="label"></div>
        <div class="per">{{Math.ceil(this.info['优秀'].num / pigaiSum * 100)}}%</div>
      </div>
    </div>
  </div>
</template>
<script>
// 全班成绩中的环形图组件
import {mapGetters} from 'vuex'
export default {
  name: 'CircleChart',
  data() {
    return {
      chart: null,
      fontSize: 20
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = this.$echarts.init(document.getElementById('chart'))
      this.chart.setOption({
        title: {
          text: `${this.pigaiSum}人`,
          subtext: '批改人数',
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
            name: '学生作业成绩分布',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: this.info['优秀'].num,
                itemStyle: {
                  color: '#55a3fe'
                }
              },
              {
                value: this.info['良好'].num,
                itemStyle: {
                  color: '#27d29e'
                }
              },
              {
                value: this.info['及格'].num,
                itemStyle: {
                  color: '#9673fe'
                }
              },
              {
                value: this.info['待提升'].num,
                itemStyle: {
                  color: '#ffa743'
                }
              }
            ]
          }
        ]
      })
    })
    window.onresize = () => {
      this.chart.resize()
    }
  },
  computed: {
    ...mapGetters({
      info: 'homeworkDetail/getCorrectInfo'
    }),
    pigaiSum() {
      let sum = 0
      for (let key in this.info) {
        sum += this.info[key].num
      }
      return sum
    }
  }
}
</script>
<style lang="scss" scoped>
#circle-chart{
  width: 100%;
  height: 295px;
  box-sizing: border-box;
  overflow: hidden;
  .title{
    height: 45px;
    line-height: 45px;
    color: #1e1e1e;
    padding: 0 13px;
    font-size: 15px;
  }
  .chart-content{
    width: 100%;
    height: 250px;
    position: relative;
    .legend{
      position: absolute;
      font-size: 16px;
      .des{
        color: #c8c8c8;
        display: inline-block;
        vertical-align: middle;
      }
      .label{
        width: 16px;
        height: 16px;
        display: inline-block;
        border-radius: 50px;
        vertical-align: middle;
      }
      .per{
        text-align: center;
        margin-top: 10px;
        color: #1e1e1e;
      }
      &.one{
        top: 21px;
        left: 13px;
        .label{
          background-color: #ffa743;
          margin-right: 5px;
        }
      }
      &.two{
        bottom: 21px;
        left: 13px;
        .label{
          background-color: #9673fe;
          margin-right: 5px;
        }
      }
      &.three{
        top: 21px;
        right: 13px;
        .label{
          background-color: #55a3fe;
          margin-left: 5px;
        }
      }
      &.four{
        bottom: 21px;
        right: 13px;
        .label{
          background-color: #27d29e;
          margin-left: 5px;
        }
      }
    }
    #chart{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
