<template>
  <div id="student-list">
    <div class="model" @click="$emit('close')"></div>
    <div class="content">
      <div class="title">
        <div class="close" @click="$emit('close')">
          <span>&times;</span>
        </div>
        <div class="title-name">
          <span>正确率为</span>
          <span class="orange">{{title}}</span>
          <span>的学生</span>
        </div>
      </div>
      <div class="avatar-wrapper">
        <div class="avatar-item" v-for="(item, index) in list" :key="index">
          <img class="avatar" :src="item.avatar" alt="">
          <div class="user-name ellipsis">{{item.real_name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StudentList',
  props: ['title', 'studentList'],
  computed: {
    list() {
      this.studentList.forEach(ele => {
        if (ele.avatar.indexOf('http://') === -1) {
          ele.avatar = window.bus.$store.getters['runEnv/old'] + ele.avatar
        }
      })
      return this.studentList
    }
  }
}
</script>
<style lang="scss" scoped>
#student-list{
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .model{
    height: 30%;
    background-color: rgba(0, 0, 0, .3)
  }
  .content{
    height: 70%;
    box-sizing: border-box;
    padding: 12px 13px;
    background-color: #fff;
    .title{
      .close{
        text-align: right;
        font-size: 24px;
        color: #c5c5c5;
        font-weight: 300;
      }
      .title-name{
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #1e1e1e;
        font-size: 16px;
        .orange{
          color: #eb8d30;
        }
      }
    }
    .avatar-wrapper{
      height: calc(100% - 24px - 30px);
      overflow-x: scroll;
      padding-top: 20px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-around;
      align-content: flex-start;
      .avatar-item{
        flex: 0 1 50px;
        height: 70px;
        margin: 8px;
        .avatar{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .user-name{
          width: 50px;
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          color: #1e1e1e;
          text-align: center;
        }
      }
    }
  }
}
</style>
