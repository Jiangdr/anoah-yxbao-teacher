import API from '@/module/user-center/axios/_api'

let apis = {
  'info': '/jwt/users/user/info',
  'myClass': '/jwt/users/classes/index',
  'classInfo': '/jwt/users/classes/detail'
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
export default usercenter
