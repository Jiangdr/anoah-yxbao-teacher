<template>
<v-touch
  class="tongji"
  v-on:swipeleft="onSwipeLeft"
  v-on:swiperight="onSwipeRight"
>
  <div class="title border-bottom-1px">
    <van-row>
      <van-col span="2">
        <span
          class="back"
          @click="goBack"
        >
          <van-icon name='arrow-left'></van-icon>
          </span>
      </van-col>
      <van-col span="18">
        <span class="text">查看统计</span>
      </van-col>
      <van-col span="4">
        <span @click="linkTo">原题</span>
      </van-col>
    </van-row>
  </div>
  <router-view></router-view>
  </v-touch>
</template>

<script>
import {
  mapState
} from 'vuex'
import { Toast } from 'vant';
export default {
  name: 'tongji',
  created() {
    this.detail();
  },
  activated() {
    this.detail();
  },
  computed: {
    ...mapState({
      'params': (state) => state.homeworkDetail.params,
      'index': (state) => state.homeworkDetail.index,
      'mini': (state) => state.homeworkDetail.mini
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 跳转原题查看
    linkTo() {
      this.$router.push({path: '/originalQuestion'})
    },
    detail() {
      let type = parseInt(this.params.qti_question_type_id);
      let name = "";
      if (type === 1 || type === 2 || type === 3 || type === 6 || type === 15) {
        name = "answerColumn";
        // 客观填空、选择填空统计页面
      } else if (type === 4 || type === 20) {
        name = "correctTable";
        // 主观填空统计页面
      } else if (type === 5) {
        name = "Subjective";
        // 连线题、连词成句、加法竖式、减法竖式、乘法竖式、除法竖式
      } else if (type === 9 || type === 21 || type === 23 || type === 24 || type === 25 || type === 26) {
        name = "correctColumn";
      } else if (type === 11) {
        name = "choiceTable";
      } else if (parseInt(curr.icom_id) || type === 17) {
        name = "hanzitingxie";
      }
      this.$router.replace({
        name: name
      });
    },
    onSwipeLeft() {
      this.$store.commit('homeworkDetail/setIndex', 1, this.detail)
      if (this.index !== this.mini.length) {
        this.detail()
      } else {
        Toast('最后一道题');
      }
    },
    onSwipeRight() {
      this.$store.commit('homeworkDetail/setIndex', -1, this.detal)
      this.detail()
      if (this.index !== 0) {
        this.detail()
      } else {
        Toast('第一道题');
      }
    }
  }
}
</script>

<style>
.tongji {
  height: 100vh;
}

.tongji>.title {
  text-align: center;
  line-height: 50px;
  height: 50px;
}

.tongji>.title .back {
  display: inline-block;
  float: left;
}

.tongji>.title .text {
  display: inline-block;
  width: calc(100% - 100px);
  font-weight: 600;
}

.tongji>.title-bar {
  padding: 0 10px;
  line-height: 50px;
  height: 50px;
  box-sizing: border-box;
}

.tongji>.title-bar .info-right {
  text-align: right;
}
  .danxuan>.title-bar .info-right .correct {
   color: #ff4e00;
  }
</style>
