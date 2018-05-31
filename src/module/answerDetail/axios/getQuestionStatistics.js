import API from '@/axios/_api'

let apis = {
  'statistics': 'jwt/homework/stat/getByRid', // 单题统计
  'share': 'jwt/user/share/add'
}

let questionStatistics = new API(apis)
questionStatistics.getinfo = (params) => {
  return questionStatistics.fetch(questionStatistics.apis.statistics, params, 'post')
}
questionStatistics.share = (params) => {
  return questionStatistics.fetch(questionStatistics.apis.share, params, 'post')
}
export default questionStatistics
