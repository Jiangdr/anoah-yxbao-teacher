import API from '@/axios/_api'

let apis = {
  'info': '/jwt/users/user/info',
  'myClass': '/jwt/users/classes/index',
  'classInfo': '/jwt/users/classes/detail',
  'personal': '/jwt/users/user/modify',
  'captcha': '/user/sms/captcha', // 发送验证码
  'valid': '/user/sms/valid', // 验证验证码
  'bind': '/user/phone/bind',
  'modifyPassword': '/jwt/users/user/password',
  'feedback': '/feedback/addFeedback' // 意见反馈
}

let usercenter = new API(apis)

usercenter.obtainInfo = (params) => {
  return usercenter.fetch(usercenter.apis.info, params, 'post')
}

usercenter.obtainclasses = (params) => {
  return usercenter.fetch(usercenter.apis.myClass, params, 'post')
}

usercenter.obtainclassDeatail = (params) => {
  return usercenter.fetch(usercenter.apis.classInfo, params, 'post')
}

usercenter.modify = (params) => {
  return usercenter.fetch(usercenter.apis.personal, params, 'post')
}

usercenter.captcha = (params) => {
  return usercenter.fetch(usercenter.apis.captcha, params, 'post')
}

usercenter.valid = (params) => {
  return usercenter.fetch(usercenter.apis.valid, params, 'post')
}

usercenter.bind = (params) => {
  return usercenter.fetch(usercenter.apis.bind, params, 'post')
}

usercenter.modifyPassword = (params) => {
  return usercenter.fetch(usercenter.apis.modifyPassword, params, 'post')
}

usercenter.feedback = (params) => {
  return usercenter.fetch(usercenter.apis.feedback, params, 'post', {'api': 'apis2'})
}

export default usercenter
