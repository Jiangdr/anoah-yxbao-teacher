import API from '@/axios/_api'

let apis = {
  'statistics': 'jwt/homework/stat/getByRid' // 单题统计
}

let questionStatistics = new API(apis)
questionStatistics.getinfo = (params) => {
  return questionStatistics.fetch(questionStatistics.apis.statistics, params, 'post')
}

export default questionStatistics
