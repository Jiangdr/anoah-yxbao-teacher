import API from '@/axios/_api'

let apis = {
  homeworkLists: '/jwt/zuoye/homework/homeworkLists',
  launch: "/jwt/zuoye/publish/launch",
  getResourceLists: "/jwt/resource/package/getResourceLists"
}

let publishHomeWork = new API(apis)

publishHomeWork.homeworkLists = (params) => {
  return publishHomeWork.fetch(apis.homeworkLists, params, 'post')
}

publishHomeWork.launch = (params) => {
  return publishHomeWork.fetch(apis.launch, params, 'post')
}

publishHomeWork.getResourceLists = (params) => {
  return publishHomeWork.fetch(apis.getResourceLists, params, 'post')
}

export default publishHomeWork
