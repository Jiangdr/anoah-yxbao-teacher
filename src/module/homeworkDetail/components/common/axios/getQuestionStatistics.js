import API from '@/axios/_api'

let apis = {
  'statistics': '/api/?q=json/ebag/Statistics/QuestionStatistics/getQuestionStatistics&h=1', // 单题统计
  'icomStatistics': '/api_dist/?q=json/ebag/Statistics/QuestionStatistics/getIcomStatistics&h=1'
}

let questionStatistics = new API(apis)
questionStatistics.getinfo = (params) => {
  return questionStatistics.fetch(questionStatistics.apis.statistics, params, 'get', {'api': 'old'})
}
questionStatistics.getIcomInfo = (params) => {
  return questionStatistics.fetch(questionStatistics.apis.icomStatistics, params, 'get', {'api': 'old'})
}
export default questionStatistics
