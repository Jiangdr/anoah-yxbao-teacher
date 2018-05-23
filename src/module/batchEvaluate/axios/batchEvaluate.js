import API from '@/axios/_api'

let apis = {
  getHomeworkDetailBasic: 'jwt/homework/stat/basic'
}

let batchEvaluate = new API(apis)

batchEvaluate.getHomeworkDetailBasic = (params) => {
  return batchEvaluate.fetch(apis.getHomeworkDetailBasic, params, 'post')
}

export default batchEvaluate
