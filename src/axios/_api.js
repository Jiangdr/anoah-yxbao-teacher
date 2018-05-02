'use strict'
import http from './_axios'
import { Toast } from 'vant'

class API {
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
  fetch (url, data, type = 'post', options = {'errorTips': true}) {
    if (type === 'post') {
      return http.post(url, data).then(r => {
        return this.checkStatus(r, options)
      })
    } else if (type === 'get') {
      return http.get(url, data).then(r => {
        return this.checkStatus(r, options)
      })
    }
  }
}

export default API
