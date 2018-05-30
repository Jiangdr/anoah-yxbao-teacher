import API from '@/axios/_api'

let apis = {
  'task': '/jwt/task/teacher/lists' // 登录
}

let home = new API(apis)

home.task = (params) => {
  return home.fetch(home.apis.task, params, 'post')
}

export default home
