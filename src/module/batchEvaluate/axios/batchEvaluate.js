import API from '@/axios/_api'

let apis = {
  getHomeworkDetailBasic: 'jwt/homework/stat/basic',
  commentpl: 'jwt/homework/commentpl/getList'
}

let batchEvaluate = new API(apis)

batchEvaluate.getHomeworkDetailBasic = (params) => {
  return batchEvaluate.fetch(apis.getHomeworkDetailBasic, params, 'post')
}

batchEvaluate.commentpl = (params) => {
  return batchEvaluate.fetch(apis.commentpl, params, 'post')
}

export default batchEvaluate
