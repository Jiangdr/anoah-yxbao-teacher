import API from '@/axios/_api'

let apis = {
  getHomeworkDetailBasic: 'jwt/homework/stat/basic',
  commentplGetList: 'jwt/homework/commentpl/getList',
  commentplCreate: 'jwt/homework/commentpl/create'
}

let batchEvaluate = new API(apis)

batchEvaluate.getHomeworkDetailBasic = (params) => {
  return batchEvaluate.fetch(apis.getHomeworkDetailBasic, params, 'post')
}

batchEvaluate.commentplGetList = (params) => {
  return batchEvaluate.fetch(apis.commentplGetList, params, 'post')
}

batchEvaluate.commentplCreate = (params) => {
  return batchEvaluate.fetch(apis.commentplCreate, params, 'post')
}

export default batchEvaluate
