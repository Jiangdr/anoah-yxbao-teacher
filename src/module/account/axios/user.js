import API from '@/module/account/axios/_api'

let apis = {
  'login': '/api_dist/?q=json/user/Login/login'
}

let user = new API(apis)

user.doLogin = (username, password, token) => {
  return user.fetch(user.apis.login, {username, password, token}, 'get')
}

export default user
