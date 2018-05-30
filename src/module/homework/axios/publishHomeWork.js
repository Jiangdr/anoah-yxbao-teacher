import API from '@/axios/_api'

let apis = {
  homeworkLists: 'jwt/homework/publish/getListForTeacher',
  launch: "jwt/homework/publish/create",
  getResourceLists: "jwt/resource/package/get",
  getBookLists: "jwt/resource/common/getBookLists",
  getGradeLists: "jwt/resource/common/getGradeLists",
  getLists: "jwt/resource/package/search",
  saveRecord: "jwt/user/book/saveRecord",
  getLastRecord: "jwt/user/book/getLastRecord",
  getBooksByTeacher: "jwt/resource/common/getBooksByTeacher"
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
publishHomeWork.saveRecord = (params) => {
  return publishHomeWork.fetch(apis.saveRecord, params, 'post')
}
publishHomeWork.getLastRecord = (params) => {
  return publishHomeWork.fetch(apis.getLastRecord, params, 'post')
}
publishHomeWork.getBooksByTeacher = (params) => {
  return publishHomeWork.fetch(apis.getBooksByTeacher, params, 'post')
}

export default publishHomeWork
