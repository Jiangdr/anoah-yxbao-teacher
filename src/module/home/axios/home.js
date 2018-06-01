import API from '@/axios/_api'

let apis = {
  'task': '/jwt/task/teacher/lists', // 登录
  'unReadMsg': 'jwt/notice/message/getUnreadNum'
}

let home = new API(apis)

home.task = (params) => {
  return home.fetch(home.apis.task, params, 'post')
}
home.getMsg = (params) => {
  return home.fetch(home.apis.unReadMsg, params, 'post')
}

export default home
