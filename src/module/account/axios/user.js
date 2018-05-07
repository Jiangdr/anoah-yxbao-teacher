import API from '@/module/account/axios/_api'

let apis = {
  'login': '/user/logon/login'
}

let user = new API(apis)

user.doLogin = (params) => {
  return user.fetch(user.apis.login, params, 'post')
}

export default user
