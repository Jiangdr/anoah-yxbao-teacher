// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index.js'

import router from './router'
import 'es6-promise/auto'

import '@/assets/css/base.css'
import '@/assets/css/global.css'

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import 'vant/lib/vant-css/icon-local.css'

import '../lib/cube.min.css'
import Cube from '../lib/cube.min.js'

import 'font-awesome/css/font-awesome.css'

import config from '@/config/index.js'
import util from '@/utils/index.js'

import dayjs from 'dayjs';

import Axios from 'axios';

Vue.prototype.$dayjs = dayjs;

Vue.prototype.$http = Axios;
// Axios.defaults.withCredentials = true;

Vue.use(window.qtivue.default)
Vue.use(window.anoahim.default)
Vue.use(window.mp3player.default)
Vue.use(window.tcplayer.default)

Vue.use(Vant)

Vue.use(Cube)

Vue.prototype.config = config
Vue.prototype.util = util
Vue.config.productionTip = false

window.bus = new Vue()

let app = {
  initialize: function () {
    // android壳子里
    if (navigator.userAgent.match(/CrossWalk/i)) {
      (function () {
        var script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "./static/cordova-8.0.0.js"
        document.getElementsByTagName("head")[0].appendChild(script)
      })();
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    }
    let APP = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
    Vue.use({
      APP
    })
  },
  onDeviceReady: function () {
  }
}
app.initialize()
app.onDeviceReady()
