import API from '@/module/homeworkDetail/axios/_api'

let apis = {
  'detail': '/jwt/zuoye/stat/homework/homeworkDetail', // 单题统计
  'resource': '/jwt/zuoye/stat/homework/homeworkAnswerDetail',
  'getMiniResource': '/jwt/zuoye/stat/homework/markByMiniResource'
}

let homeworkinfo = new API(apis)
homeworkinfo.getinfo = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.detail, params, 'get')
}
homeworkinfo.getResourceList = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.resource, params, 'get')
}
homeworkinfo.getMiniResource = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.getMiniResource, params, 'get')
}
export default homeworkinfo
