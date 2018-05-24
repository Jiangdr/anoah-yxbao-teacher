import API from '@/axios/_api'

let apis = {
  'detail': '/jwt/homework/stat/basic', // 统计
  'resource': '/jwt/homework/stat/getResourceList',
  'getMiniResource': '/jwt/homework/stat/getMinResourceList',
  'sendAnswer': '/jwt/homework/correct/sendAnswer',
  'urge': '/jwt/notice/message/jiaozuoye', // 催交作业
  'remind': '/jwt/notice/message/dingzheng'
}

let homeworkinfo = new API(apis)
homeworkinfo.getinfo = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.detail, params, 'post')
}
homeworkinfo.getResourceList = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.resource, params, 'post')
}
homeworkinfo.getMiniResource = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.getMiniResource, params, 'post')
}
homeworkinfo.sendAnswer = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.sendAnswer, params, 'post')
}
homeworkinfo.urge = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.urge, params, 'post')
}
homeworkinfo.remind = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.remind, params, 'post')
}
export default homeworkinfo
