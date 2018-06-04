'use strict'
import http from './_axios'
import qs from 'qs'
import { Toast } from 'vant'
import store from '@/store/index'

class API_ABSTRACT {
  // 为对象添加属性
  constructor (apis = []) {
    this.apis = apis
  }

  // 检查返回数据，status非1时，默认弹出轻提示
  checkStatus (data, opt) {
    if (data.status === 1) {
      return data.recordset
    } else {
      if (opt.errorTips) {
        if (data.msg === 'OK' && typeof data.recordset === 'string') {
          data.msg = data.recordset
        }
        Toast({position: 'bottom', message: data.msg + '(' + data.status + ')'})
      }
      return Promise.reject(data)
    }
  }

  // 获取数据通用方法
  fetch (url, data, type = 'post', options = {'errorTips': true, 'api': 'api2'}) {
    const apiDomain = window.bus.$store.getters['runEnv/' + options.api] ? window.bus.$store.getters['runEnv/' + options.api] : window.bus.$store.getters['runEnv/' + options.api]
    url = !~url.indexOf('http') ? apiDomain + url : url
    if (type === 'post') {
      data = qs.stringify(data)
      return http.post(url, data, options).then(r => {
        return this.checkStatus(r, options)
      })
    } else if (type === 'get') {
      data = options.api === 'old' ? { 'info': JSON.stringify(data) } : JSON.stringify(data)
      return http.get(url, data, options).then(r => {
        return this.checkStatus(r, options)
      })
    }
  }
}

export default API_ABSTRACT
