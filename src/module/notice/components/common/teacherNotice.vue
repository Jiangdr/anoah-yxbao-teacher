<template>
  <div class="teacher-list">
    <div v-for="(item, index) in list" :key="index" class="item">
      <div class="date">{{item.push_time}}</div>
      <div class="container">
        <p class="title">
          <template v-if="item.feeds_type==='xinzuoye'">
            <i class="icon" :style="{'background-image':'url('+imgUrl('icon1')+')'}"></i>
          </template>
           <template v-else>
            <i class="icon" :style="{'background-image':'url('+imgUrl('icon')+')'}"></i>
          </template>
          {{item.title}}</p>
        <div class="notice-content" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "teacherList",
  props: ["list"],
  methods: {
    imgUrl(name) {
      return require("@/assets/images/notice/" + name + ".png");
    }
  }
};
</script>
<style scoped>
.item .date {
  margin: 19px auto 10px;
  text-align: center;
}
.item .container {
  margin: 0 13px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  line-height: 20px;
  color: #1e1e1e;
}
.item .container .title {
  margin-bottom: 19px;
  font-size: 19px;
  text-align: left;
}
.item .container .title .icon {
  display: inline-block;
  height: 20px;
  width: 20px;
  background-position: center center;
  background-size: 100% 100%;
  margin-bottom: -3px;
  margin-right: 5px;
}
.item .notice-content >>> p {
  color: #4e4e50;
  margin-bottom: 10px;
}
.item .notice-content >>> p:last-child {
  color: #9c9ea1;
}
.item .notice-content >>> .msg-count-grey,
.item .notice-content >>> .msg-count {
  font-size: 19px;
  color: #7f8184;
  margin: 0 5px;
  font-weight: bold;
}
.item .notice-content >>> .msg-count {
  color: #ff8d13;
}
</style>
