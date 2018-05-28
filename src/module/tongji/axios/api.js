import API from '@/axios/_api'

let apis = {
  'getQuestionStatistics': '/api/?q=json/ebag/Statistics/QuestionStatistics/getQuestionStatistics&h=1&info=',
  'qtiexamStatistics': '/api/?q=json/ebag/Statistics/QtiexamStatistics/getResult'
}

let tongji = new API(apis)

tongji.getMiniResource = (params) => {
  return tongji.fetch(tongji.apis.getMiniResource, params, 'post')
}
tongji.getQuestionStatistics = (params) => {
  return tongji.fetch(tongji.apis.getQuestionStatistics, params, 'get', {'api': 'old'})
}
tongji.qtiexamStatistics = (params) => {
  return tongji.fetch(tongji.apis.qtiexamStatistics, params, 'get', {'api': 'old'})
}
export default tongji
