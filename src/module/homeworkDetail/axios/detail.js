import API from '@/axios/_api'

let apis = {
  'detail': '/jwt/homework/stat/basic', // 单题统计
  'resource': '/jwt/homework/stat/getResourceList',
  'getMiniResource': '/jwt/homework/stat/getMinResourceList',
  'sendAnswer': '/jwt/homework/correct/sendAnswer'
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
export default homeworkinfo
