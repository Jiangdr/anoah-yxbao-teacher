<template>
  <div class="teacher-list">
    <div v-for="(item, index) in list" :key="index" class="item">
              <div class="date">{{item.push_time}}</div>
              <div class="container">
                <p class="title"><i class="icon"></i>{{item.title}}</p>
                <div class="content" v-html="item.content"></div>
              </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'teacherList',
  props: ['list']
}
</script>
<style scoped>
.item .date{
  height: 30px;
  line-height: 30px;
  margin: 10px;
  text-align: center;
}
.item .container{
  margin: 0 13px;
  background: #fff;
  padding:13px;
  border-radius: 8px;
  line-height: 25px;
}
.item .container .title{
  height: 35px;
  line-height: 35px;
}
.item .container .title .icon{
  display: inline-block;
  height: 20px;
  width:20px;
  background-image: url('../images/icon.png');
  background-position: center center;
  background-size: 100% 100%;
  vertical-align: text-top;
  margin-right: 5px;
}
</style>
