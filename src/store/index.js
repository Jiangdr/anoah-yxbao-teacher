import Vue from 'vue'
import Vuex from 'vuex'

import accountStore from '@/common/account/store/account.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account: accountStore
  }
})
