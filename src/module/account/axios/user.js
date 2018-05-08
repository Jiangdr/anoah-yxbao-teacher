import API from '@/module/account/axios/_api'

let apis = {
  'login': '/user/logon/login',
  'exists': '/user/logon/exists'
}

let user = new API(apis)

user.doLogin = (params) => {
  return user.fetch(user.apis.login, params, 'post')
}

user.exists = (params) => {
  return user.fetch(user.apis.exists, params, 'post')
}

export default user
