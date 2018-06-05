import API from '@/axios/_api'
import qs from 'qs'

let apis = {
  'task': 'jwt/task/teacher/lists', // 登录
  'unReadMsg': 'jwt/notice/message/getUnreadNum',
  'qrcode': 'apiv5/index.php?r=ebag/Qrcode/VerifyQrcode&'
}

let home = new API(apis)

home.task = (params) => {
  return home.fetch(home.apis.task, params, 'post')
}
home.getMsg = (params) => {
  return home.fetch(home.apis.unReadMsg, params, 'post')
}
/**
 * 接口功能 扫码登录后传递扫码信息和用户信息
 * @param {string} token 必须 用户id
 * @param {string} uuid 必须 二维码的唯一标识
 * @param {string} action 必须 操作的类型 'login','scan'
 * @returns
 */
home.qrcode = params => {
  console.log(qs.stringify(params))
  return home.fetch(home.apis.qrcode + qs.stringify(params), undefined, 'get', {'api': 'old', "auth": false})
}

export default home
