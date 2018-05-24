import API from '@/axios/_api'

let apis = {
  homeworkLists: 'jwt/zuoye/homework/homeworkLists',
  launch: "jwt/homework/publish/create",
  getResourceLists: "jwt/resource/package/get",
  getBookLists: "jwt/resource/common/getBookLists",
  getGradeLists: "jwt/resource/common/getGradeLists",
  getLists: "jwt/resource/package/search"
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

publishHomeWork.getBookLists = (params) => {
  return publishHomeWork.fetch(apis.getBookLists, params, 'post')
}

publishHomeWork.getGradeLists = (params) => {
  return publishHomeWork.fetch(apis.getGradeLists, params, 'post')
}

publishHomeWork.getLists = (params) => {
  return publishHomeWork.fetch(apis.getLists, params, 'post')
}

export default publishHomeWork
