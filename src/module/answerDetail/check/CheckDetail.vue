<template>
  <div id="qa_painthand" class="painthanddiv">
    <header-bar
      class="paint-header"
      @back="$router.go(-1)">
      <p slot="title-name">1/3</p>
      <p slot="right-area">保存</p>
    </header-bar>
    <!--<div class="phbackdiv">-->
    <!--<div id="phtitlediv" class="phtitlediv">1/1</div>-->
    <!--<a class="phclosea"-->
    <!--_tk="__ICOM__.painthand.on_close();__PROJ__.app.control.back_point('painthandback')"></a>-->
    <!--<div class="phsavediv" _tk="__ICOM__.painthand.on_save()">保存</div>-->
    <!--</div>-->
    <div class="phcontentdiv">
      <img id="phorgimg" src="" style="display:none;">
      <img id="pheditimg" src="" style="display:none;">
      <canvas id="phturncanvas" style="display:none;"></canvas>
      <div class="phcanvasdiv" id="phcanvasdiv">
        <div style="text-align:center;">加载中...</div>
      </div>
    </div>
    <!---->
    <div class="phtooldiv">
      <div
        v-for="(icon, idx) in icons"
        :key="idx"
        :class="{select: idx === select}"
        @click="iconClick(idx)"
        class="phtbndiv" _tk="__ICOM__.painthand.on_turn(this)">
        <span class="paint-icon" :class="'paint-icon-' + idx"></span>
        <span class="paint-text">{{icon.text}}</span>
      </div>

      <div id="phcolordiv" class="phcolordiv" _prevent="1" style="display:none;">
        <div class="phlinewidthdiv click" _tk="__ICOM__.painthand.on_selwidth(2,this)">
          <div class="phline1"></div>
        </div>
        <div class="phlinewidthdiv" _tk="__ICOM__.painthand.on_selwidth(4,this)">
          <div class="phline2"></div>
        </div>
        <div class="phlinewidthdiv" _tk="__ICOM__.painthand.on_selwidth(8,this)">
          <div class="phline3"></div>
        </div>
        <br>
        <div class="phselcolordiv" _tk="__ICOM__.painthand.on_selcolor('#000000',this)">
          <div class="phcolor1"></div>
        </div>
        <div class="phselcolordiv click" _tk="__ICOM__.painthand.on_selcolor('#ff1a1a',this)">
          <div class="phcolor2"></div>
        </div>
        <div class="phselcolordiv" _tk="__ICOM__.painthand.on_selcolor('#ffcc00',this)">
          <div class="phcolor3"></div>
        </div>
        <div class="phselcolordiv" _tk="__ICOM__.painthand.on_selcolor('#339900',this)">
          <div class="phcolor4"></div>
        </div>
        <div class="phselcolordiv" _tk="__ICOM__.painthand.on_selcolor('#0095da',this)">
          <div class="phcolor5"></div>
        </div>
        <div class="phselcolordiv" _tk="__ICOM__.painthand.on_selcolor('#9966ff',this)">
          <div class="phcolor6"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */
  import headerBar from '@/components/headerBar.vue'
  import {Factory} from './constructor2.js'

  export default {
    name: "CheckDetai",
    data() {
      return {
        hint: '原始',
        icons: [
          {
            text: '旋转'
          },
          {
            text: '画笔'
          },
          {
            text: '调色板'
          },
          {
            text: '擦除'
          },
          {
            text: '清空'
          }
        ],
        select: 1,
        paint: null
      }
    },
    methods: {
      iconClick(idx) {
        let {paint} = this;
        switch (idx) {
          case 0: {
            paint.on_turn();
          }
            break;
          case 1: {
            this.select = this.select === idx ? -1 : idx;
            paint.on_pen();
          }
            break;
          case 2: {
            this.select = this.select === idx ? -1 : idx;
            paint.on_color();
          }
            break;
          case 3: {
            this.select = this.select === idx ? -1 : idx;
            paint.on_erase();
          }
            break;
          case 4: {
            paint.on_clear();
          }
            break
        }
      }
    },
    components: {headerBar},
    mounted() {
      let routeParam = this.$route.params,
        param = {
          images: [
            {
              orgimg: "http://u.dev.anoah.com/uploads/image/c5/c500692d6ce69c5cf00a23efe0a5f0f5.jpg",
              img: "http://e.dev.anoah.com//uploads/image/35/35fbf807db948b61b3251643f3b06ca7.jpg"
            }
          ],
          num: 0
        };
      this.paint = new Factory().open(Object.assign(param, routeParam));
    }
  }

</script>

<style lang="scss" scoped>
  #qa_painthand {
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f3f3f4;
  }

  .phcontentdiv {
    height: 81%;
    line-height: 2.8rem;
    background-color: #f3f3f4;
    text-align: center;
    position: relative;
    vertical-align: top;
  }

  .van-hairline--bottom.paint-header {
    height: 8%;
    align-items: center;
  }

  .phtooldiv {
    height: 11%;
    padding-top: 2vh;
    background-color: #ffffff;
    text-align: center;
    vertical-align: top;
    background: url("../../../assets/images/painthand/phtooldiv.png") no-repeat scroll 0 0px transparent;
    background-size: 100% 100%;

    .phtbndiv {
      float: left;
      width: 20%;
      height: 100%;
      color: #86868a;
      font-size: 0.9rem;
      &:active, &.select {
        color: #1ec6a7;
        .paint-icon-0 {
          background-image: url("../../../assets/images/painthand/turn_c.png");
        }
        .paint-icon-1 {
          background-image: url("../../../assets/images/painthand/pen_c.png");
        }
        .paint-icon-2 {
          background-image: url("../../../assets/images/painthand/color_c.png");
        }
        .paint-icon-3 {
          background-image: url("../../../assets/images/painthand/erase_c.png");
        }
        .paint-icon-4 {
          background-image: url("../../../assets/images/painthand/clear_c.png");
        }
      }
    }

    .paint-icon {
      display: block;
      height: 4vh;
      background: no-repeat scroll center transparent;
      background-size: auto 100%;
      &.paint-icon-0 {
        background-image: url("../../../assets/images/painthand/turn.png");
      }
      &.paint-icon-1 {
        background-image: url("../../../assets/images/painthand/pen.png");
      }
      &.paint-icon-2 {
        background-image: url("../../../assets/images/painthand/color.png");
      }
      &.paint-icon-3 {
        background-image: url("../../../assets/images/painthand/erase.png");
      }
      &.paint-icon-4 {
        background-image: url("../../../assets/images/painthand/clear.png");
      }
    }

    .paint-text {
      display: block;
      height: 5vh;
      line-height: 5vh;
      font-size: 0.9rem;
    }
  }

  #qa_painthand div.phtbndiv:active {
    color: #1ec6a7;
  }

  #qa_painthand div.phtbndiv.click {
    color: #1ec6a7;
  }

  phzoomdiv {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.0);
    display: none;
    z-index: 1;
  }

  @-webkit-keyframes slideinfromright {
    from {
      -webkit-transform: translateX(100%);
    }
    to {
      -webkit-transform: translateX(0);
    }
  }

  @keyframes slideinfromright {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @-webkit-keyframes slideinfromleft {
    from {
      -webkit-transform: translateX(-100%);
    }
    to {
      -webkit-transform: translateX(0);
    }
  }

  @keyframes slideinfromleft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @-webkit-keyframes slideouttoleft {
    from {
      -webkit-transform: translateX(0);
    }
    to {
      -webkit-transform: translateX(-100%);
    }
  }

  @keyframes slideouttoleft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @-webkit-keyframes slideouttoright {
    from {
      -webkit-transform: translateX(0);
    }
    to {
      -webkit-transform: translateX(100%);
    }
  }

  @keyframes slideouttoright {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
</style>
