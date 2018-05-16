import API from '@/axios/_api'
import config from '@/config/index.js'

let apis = {
  'detail': '/jwt/zuoye/stat/homework/homeworkDetail', // 单题统计
  'resource': '/jwt/zuoye/stat/homework/homeworkAnswerDetail',
  'getMiniResource': '/jwt/zuoye/stat/homework/markByMiniResource'
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
export default homeworkinfo
