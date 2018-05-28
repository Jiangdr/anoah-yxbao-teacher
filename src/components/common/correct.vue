<template>
     <div class="correct-content">
        <svg :width="length" :height="length" :viewBox="'0 ' + '0 ' +length + ' ' + length" class="center">
            <defs>
                <linearGradient x1="1" y1="0" x2="0" y2="0" :id="domid + '_1'">
                    <stop offset="0%" :stop-color="stopColor"></stop>
                    <stop offset="100%" :stop-color="middleColor"></stop>
                </linearGradient>
               <linearGradient x1="1" y1="0" x2="0" y2="0" :id="domid + '_2'">
                    <stop offset="0%" :stop-color="startColor"></stop>
                    <stop offset="100%" :stop-color="middleColor"></stop>
                </linearGradient>
            </defs>
            <g :transform="'matrix(0,-1,1,0,0,'+ length +')'">
                <circle :cx="length/2" :cy="length/2" :r="r" :stroke-width="stroke" :stroke="strokeColor" fill="none" :stroke-dasharray="'' + dasharray + ' ' + dasharray"></circle>
                <circle :cx="length/2" :cy="length/2" :r="r" :stroke-width="stroke" :stroke="url1" fill="none" :stroke-dasharray="dasharray1"></circle>
                <circle :cx="length/2" :cy="length/2" :r="r" :stroke-width="stroke" :stroke="url2" fill="none" :stroke-dasharray="dasharray2"></circle>
            </g>
        </svg>
        <span class="time-second" v-html="text">{{correct + '%'}}</span>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    console.log(this.$props)
  },
  computed: {
    dasharray () {
      return Math.ceil(2 * Math.PI * this.r + 1)
    },
    dasharray1 () {
      return '' + (this.dasharray * this.correct) / 100 + ' ' + this.dasharray
    },
    dasharray2 () {
      if (this.correct >= 50) {
        return '' + this.dasharray / 2 + ' ' + this.dasharray
      } else {
        return '' + (this.dasharray * this.correct) / 100 + ' ' + this.dasharray
      }
    },
    url1 () {
      return "url('#" + this.domid + "_1')"
    },
    url2 () {
      return "url('#" + this.domid + "_2')"
    },
    length () {
      return this.r * 2 + this.stroke * 2
    }
  },
  props: ['r', 'stroke', 'startColor', 'middleColor', 'stopColor', 'strokeColor', 'text', 'correct', 'domid']
}
</script>

<style lang="scss" scoped>
.correct-content {
  position: relative;
  svg {
    transform: rotate(-0.05deg);
  }
  circle {
    transition: stroke-dasharray .2s;
  }
  .time-second {
    left: 0;
    right: 0;
    text-align: center;
    font-size: 26.66667vw;
    line-height: 30px;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
  }
}

</style>
