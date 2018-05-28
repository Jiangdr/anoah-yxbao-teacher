<template>
  <div class="more">
    <cube-popup type="my-popup" :center="false"  v-show="showPopup" @mask-click="togglePopup">
      <div class="popupWrapper">
        <div class="popupItem content" @click="content">查看作业内容</div>
        <div class="popupItem again" @click="again">再次布置</div>
        <div class="popupItem collection" @click="collection">
          <template v-if="favorite==0">收藏作业</template>
          <template v-else-if="favorite==1">取消收藏</template>
        </div>
        <div class="popupItem delete" @click="toggleDeletePopup">删除作业</div>
        <div class="popupItem cancel" @click="togglePopup">取消</div>
      </div>
    </cube-popup>
    <cube-popup type="collection-popup" v-show="showCollectionPopup">
      <div class="wrapper" v-if="favorite==1">
        <i :style="{'background-image':'url('+imgUrl('collect')+')'}"></i>
        <span>已收藏</span>
      </div>
      <div class="wrapper" v-else-if="favorite==0">
        <span>取消收藏</span>
      </div>
    </cube-popup>
     <cube-popup type="delete-popup" v-show="showDetelePopup">
      <div class="delete-wrapper">
        <p>作业删除后，将清除作业相关数据<br/>请谨慎操作</p>
        <div class="btn-group">
          <span @click="togglePopup">取消</span>
          <span @click="deleteHomework">确认</span>
        </div>
      </div>
    </cube-popup>
  </div>
</template>
<script>
import homeworkDetil from "../../axios/detail.js";
import { Toast } from 'vant';
export default {
  name: "more",
  props: ['publishId', 'favorite'],
  data() {
    return {
      showPopup: true, // 更多操作列表弹窗
      showCollectionPopup: false, // 收藏成功后弹窗
      showDetelePopup: false // 确认删除弹窗
    };
  },
  methods: {
    togglePopup() {
      this.$emit("toggle");
    },
    toggleDeletePopup() {
      this.showPopup = false;
      this.showDetelePopup = !this.showDetelePopup
    },
    content() {},
    again() {},
    collection() {
      let params = {
        'publish_id': this.publishId,
        'type': parseInt(this.favorite) === 0 ? 1 : 0
      }
      homeworkDetil.favorite(params).then(r => {
        this.showCollectionPopup = true;
        this.showPopup = false;
        setTimeout(() => { this.togglePopup() }, 1000)
        this.$emit('collect', r.type)
      })
    },
    deleteHomework() {
      let params = {
        publish_id: this.publishId
      }
      homeworkDetil.remove(params).then(r => {
        Toast('删除成功！')
        setTimeout(() => {
          this.$emit('back')
        }, 500)
      })
    },
    imgUrl(name) {
      return require('@/assets/images/homewordDetail/' + name + '.png')
    }
  }
};
</script>
<style scoped lang="scss">
/* 操作列表样式 */
.popupWrapper {
  margin: 0 13px 13px;
  font-size: 17px;
  color:#1e1e1e;
}
.popupItem {
  background: #fff;
  line-height: 48px;
  height: 48px;
  box-sizing: border-box;
  text-align: center;
  border-bottom: 1px solid #e8ebee;
}
.popupItem.content {
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
}
.popupItem.delete {
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
}
.popupItem.cancel {
  margin-top: 15px;
  border-radius: 13px;
}
/* 收藏成功样式 */
.wrapper {
  width: 160px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  background: #fff;
  border-radius: 13px;
}

.wrapper > i {
  display: inline-block;
  width: 24px;
  height: 24px;
  // background: url("/assets/images/homeworkDetail/collect.png") no-repeat center;
  background-repeat:no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  margin-top: 3px;
  vertical-align: text-bottom;
  margin-right: 5px;
}
/* 确认删除弹窗 */
.delete-wrapper{
  width:calc(100vw - 26px);
  margin:0 13px;
  background: #fff;
  padding:20px;
  border-radius: 13px;
  box-sizing: border-box;
}
.delete-wrapper>p{
  line-height: 25px;
  text-align: center;
  margin-bottom: 20px;
}
.delete-wrapper>.btn-group{
  display: flex;
}
.delete-wrapper>.btn-group span{
  flex:1 auto auto;
  width:150px;
  height: 50px;
  line-height: 50px;
  border-radius: 13px;
  font-size: 17px;
  text-align: center;
  background: #08b783;
  color:#fff;
}
.delete-wrapper>.btn-group span:first-child{
  margin-right: 15px;
  background: #fff;
  border:1px solid #08b783;
  color:#08b783;
}
</style>
