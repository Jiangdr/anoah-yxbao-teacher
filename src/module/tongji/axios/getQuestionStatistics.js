import API from '@/module/tongji/axios/_api'

let apis = {
  'statistics': '/api/?q=json/ebag/Statistics/QuestionStatistics/getQuestionStatistics&h=1'// 单题统计
}

let questionStatistics = new API(apis)
questionStatistics.getinfo = (params) => {
  return questionStatistics.fetch(questionStatistics.apis.statistics, params, 'get')
}
export default questionStatistics
