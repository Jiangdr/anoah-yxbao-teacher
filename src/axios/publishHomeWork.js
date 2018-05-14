import API from '@/axios/_api'

let apis = {
  homeWorkLists: '/jwt/zuoye/homework/homeworkLists',
  launch: "/jwt/zuoye/publish/launch",
  getResourceLists: "/jwt/resource/package/getResourceLists"
}

let publishHomeWork = new API(apis)

publishHomeWork.homeWorkLists = (params) => {
  return publishHomeWork.fetch(iclass.apis.homeWorkLists, params, 'get')
}

publishHomeWork.launch = (params) => {
  return publishHomeWork.fetch(iclass.apis.launch, params, 'get')
}

publishHomeWork.getResourceLists = (params) => {
  return publishHomeWork.fetch(iclass.apis.getResourceLists, params, 'get')
}

export default publishHomeWork
