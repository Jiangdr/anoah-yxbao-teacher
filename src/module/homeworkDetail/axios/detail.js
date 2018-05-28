import API from '@/axios/_api'

let apis = {
  'detail': '/jwt/homework/stat/basic', // 统计
  'resource': '/jwt/homework/stat/getResourceList',
  'getMiniResource': '/jwt/homework/stat/getMinResourceList',
  'sendAnswer': '/jwt/homework/correct/sendAnswer',
  'urge': '/jwt/notice/message/jiaozuoye', // 催交作业
  'remind': '/jwt/notice/message/dingzheng', // 订正提醒
  'remove': '/jwt/homework/publish/remove', // 删除作业
  'favorite': 'jwt/homework/favorite/update' //  收藏作业 1收藏 0 取消收藏
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
homeworkinfo.remove = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.remove, params, 'post')
}
homeworkinfo.favorite = (params) => {
  return homeworkinfo.fetch(homeworkinfo.apis.favorite, params, 'post')
}
export default homeworkinfo
