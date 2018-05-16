'use strict'
import axios from 'axios'

/**  axios基础配置 */
axios.defaults.timeout = 15000
// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  // console.log('error', error.response, JSON.stringify(error))
  let response = { 'status': -404, 'statusText': '没有网络' }
  response = error.response || response
  return Promise.resolve(response)
})

function responseFormat (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    return response.data
  }

  // 异常状态下，保持格式统一
  return {
    status: response.status,
    msg: response.statusText,
    data: response.data
  }
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: data,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return responseFormat(response)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params: params,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return responseFormat(response)
      }
    )
  }
}
