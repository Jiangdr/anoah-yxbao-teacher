import API from '@/axios/_api'

let apis = {
  getHomeworkDetailBasic: 'jwt/homework/stat/basic',
  commentplGetList: 'jwt/homework/commentpl/getList',
  commentplCreate: 'jwt/homework/commentpl/create',
  setPraise: 'jwt/homework/correct/setPraise',
  returnRewrite: 'jwt/homework/publish/redo',
  commentplRemove: 'jwt/homework/commentpl/remove'
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

batchEvaluate.setPraise = (params) => {
  return batchEvaluate.fetch(apis.setPraise, params, 'post')
}

batchEvaluate.returnRewrite = (params) => {
  return batchEvaluate.fetch(apis.returnRewrite, params, 'post')
}

batchEvaluate.commentplRemove = (params) => {
  return batchEvaluate.fetch(apis.commentplRemove, params, 'post')
}

export default batchEvaluate
