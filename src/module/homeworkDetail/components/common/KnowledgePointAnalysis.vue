<template>
  <div id="knowledge-point-analysis">
    <div class="list" v-if="kpList.length">
      <div class="list-title">
        <div class="list-row">
          <div class="list-cell question-content left">知识点</div>
          <div class="list-cell">题目数</div>
          <div class="list-cell">正确率</div>
        </div>
      </div>
      <div class="list-body">
        <div class="list-row van-hairline--bottom" v-for="(item, index) in kpList" :key="index" @click="linkTo(item)">
          <div class="list-cell left question-content ellipsis">
            <span class="type">{{item.kp_name}}</span>
          </div>
          <div class="list-cell">{{item.qti_count}}</div>
          <div class="list-cell">{{Math.round(item.class_right_rate * 100) + '%'}}</div>
          <div class="arrow">
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      <img :src="imgUrl" alt="">
      <span style="color:#1e1e1e;font-weight:600;margin-bottom:10px;">无知识点正确率相关数据~</span>
    </div>
  </div>
</template>
<script>
// 知识点分析
import api from '@/module/homeworkDetail/axios/detail'
export default {
  name: 'knowledgePointAnalysis',
  props: ['publishId'],
  data() {
    return {
      kpList: []
    }
  },
  computed: {
    imgUrl() {
      return require('@/assets/images/homeworkDetail/no-data.png')
    }
  },
  mounted() {
    api.kp({
      publish_id: this.publishId
    }).then(succ => {
      this.kpList = succ
    })
  },
  methods: {
    linkTo(item) {
      this.$router.push({path: `/knowledgePointDetail/${this.publishId}/${item.kp_id}/${item.qti_count}/${item.class_right_rate}`})
    }
  }
}
</script>
<style lang="scss" scoped>
#knowledge-point-analysis{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .list{
    padding: 0 13px;
    font-size: 16px;
    .list-title{
      color: #848484;
    }
    .list-body{
      color: #1e1e1e;
    }
    .list-row{
      display: flex;
      height: 45px;
      line-height: 45px;
    }
    .list-cell{
      flex: 1;
      text-align: center;
      &.question-content{
        flex: 2.5;
        padding: 0 5px;
      }
      &.left{
        text-align: left;
      }
    }
  }
  .type{
    color: #4d4d4d
  }
  .no-data{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 0 26px;
    text-align: center;
    img{
      width: 100px;
      height: 130px;
    }

  }
}
</style>
