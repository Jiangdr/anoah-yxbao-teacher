// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index.js'

import router from './router'
import 'es6-promise/auto'

// import Vuetouch from 'vue-touch'

import '@/assets/css/base.css'
import '@/assets/css/global.css'

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import 'vant/lib/vant-css/icon-local.css'

import '../lib/cube.min.css'
import Cube from '../lib/cube.min.js'

import 'font-awesome/css/font-awesome.css'

import util from '@/utils/index.js'

import dayjs from 'dayjs';

import Axios from 'axios';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import '@/style/global.scss'
import '@/../lib/swiper.min.css'
import Swiper from '@/../lib/swiper.min.js'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
// import 'swiper/dist/css/swiper.css'

// 引入全局过滤器
import * as filters from '@/filter/index'
// import "http://e.dev.anoah.com/hot_code/youxuebao/teacher/www/lib/qti/anoahim.js"
// Vue.use(VueAwesomeSwiper)
Vue.prototype.Swiper = Swiper
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$dayjs = dayjs;

Vue.prototype.$http = Axios;

Vue.prototype.$echarts = echarts
// Axios.defaults.withCredentials = true;
// window.Vue.prototype.$http = Axios;

Vue.use(window.qtivue.default)
// Vue.use(window.anoahim)
Vue.use(window.mp3player.default)
Vue.use(window.tcplayer.default)

Vue.use(Vant)

Vue.use(Cube)
// Vue.use(Vuetouch, {name: 'v-touch'})
Vue.prototype.util = util
Vue.config.productionTip = false

window.bus = new Vue()
window.bus.$store = store;

// 初始化老版本qti参数，和动态引入需要icombase
window.ICOM_EVN_VAR = {
  debug: true,
  lib_address: `${store.getters['runEnv/old']}/icoms/qtidiv/jslibs/`,
  base: `${store.getters['runEnv/old']}/icoms/qtidiv/icoms/`,
  api_address: `${store.getters['runEnv/old']}/api/`,
  api_address_dist: `${store.getters['runEnv/old']}/api_dist/`,
  api_address_router: `${store.getters['runEnv/old']}/api_router/`,
  api_cache: true
}
function addQti (src) {
  let head = document.getElementsByTagName('head')[0]
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  head.appendChild(script)
}
addQti(`${store.getters['runEnv/old']}/icoms/qtidiv/jquery.js`)
addQti(`${store.getters['runEnv/old']}/icoms/qtidiv/icombase.js`)

window.HW = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
