<template>
  <div v-bind:style="listContainerStyle">
    <div @click="paint" style="line-height: 28px;background-color: #fff;padding: 5px 10px;">
      {{answerInfo.characters}}
    </div>

    <div @click="paint" v-for="item in answerInfo.images" :key="item">
      <div style="width: 100%;" v-if="item">
        <img style="width: 50%;" :src="item" alt="">
      </div>
    </div>

    <div v-for="item in answerInfo.audio" :key="item">
      <div v-if="item" style="box-shadow: 0 0 2px rgba(0,0,0,0.2);width: 92%;margin: 1rem 4%;text-align: center;height: 64px;
    line-height: 64px;">
        <img @click="clickAudio(item)" v-if="audioPauseShow" src="@/assets/images/answerDetail/audioPause.png" style="margin: 1rem 4%;" alt="">

        <img @click="clickAudio(item)" v-if="!audioPauseShow" src="@/assets/images/answerDetail/audioPlay.png" style="" alt="">
        <audio width="320" height="240" controls :src="item" preload id="music1" hidden></audio>
      </div>
    </div>

    <div v-for="item in answerInfo.video" :key="item">
      <div v-if="item">
        <img @click="clickVideo(item)" src="@/assets/images/answerDetail/video.png" style="width: 92%;margin: 1rem 4%;box-shadow: 0 0 2px rgba(0,0,0,0.2)" alt="">
      </div>
    </div>

    <video preload='auto' v-if="videoShow" autoplay :src='videoUrl' webkit-playsinline='true' playsinline='true' x-webkit-airplay='true' x5-video-player-type='h5' x5-video-player-fullscreen='true' x5-video-ignore-metadata='true' style="position: absolute;top: 0px;left: 0px;width: 100%;z-index: 998;height: 100%;background: rgba(0,0,0,0.8);">
      <p>不支持video</p>
    </video>

    <div style="position: absolute;top: 5px;right: 5px;z-index: 999;color: #fff;" v-if="videoShow" @click="closeVideoShow"><i style="font-size:30px" class="fa fa-times-circle"></i></div>

  </div>
</template>
<script>
export default {
  name: "studentAnswer",
  props: ["answerInfo"],
  data() {
    return {
      peopleNum: 0,
      videoShow: false,
      audioPauseShow: true,
      videoUrl: "",
      audioUrl: "",
      listContainerStyle: {
        height: window.innerHeight - 90 + "px",
        background: "#fff",
        "overflow-y": "scroll",
        width: "100%"
      }
    };
  },
  methods: {
    clickVideo(item) {
      this.videoShow = true;
      this.videoUrl = item;
    },
    clickAudio(item) {
      this.audioPauseShow = !this.audioPauseShow;
      this.audioUrl = item;
      this.playMusic();
    },
    closeVideoShow() {
      this.videoShow = false;
    },
    rbf() {
      var audio = document.getElementById("music1");
      audio.currentTime = 0;
    },
    playMusic() {
      var audio = document.getElementById("music1");
      if (audio !== null) {
        // 检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if (audio.paused) {
          audio.play(); // audio.play();// 这个就是播放
        } else {
          audio.pause(); // 这个就是暂停
        }
      }
    },
    paint() {
      this.$emit('emit-paint');
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
