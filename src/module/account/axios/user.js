import API from '@/axios/_api'

let apis = {
  'login': '/user/logon/login', // 登录
  'loginOld': '/api_dist/?q=json/user/Login/login&info=',
  'exists': '/user/logon/exists', // 检查账号是否存在
  'reset': '/user/password/reset', // 重置密码
  'captcha': '/user/sms/captcha', // 发送验证码
  'valid': '/user/sms/valid', // 验证验证码
  'area': '/user/area/get', // 获取地区
  'schoolList': '/user/school/city'
}

let user = new API(apis)

user.doLogin = (params) => {
  return user.fetch(user.apis.login, params, 'post')
}

user.doLoginOld = (params) => {
  return user.fetch(user.apis.loginOld, params, 'get', {'api': 'old'})
}

user.exists = (params) => {
  return user.fetch(user.apis.exists, params, 'post')
}

user.reset = (params) => {
  return user.fetch(user.apis.reset, params, 'post')
}

user.captcha = (params) => {
  return user.fetch(user.apis.captcha, params, 'post')
}

user.valid = (params) => {
  return user.fetch(user.apis.valid, params, 'post')
}

user.area = (params) => {
  return user.fetch(user.apis.area, params, 'post')
}
user.schoolList = (params) => {
  return user.fetch(user.apis.schoolList, params, 'post')
}
export default user
