import API from '@/axios/_api'

let apis = {
  'create': 'jwt/resource/correction/create'
}

let correction = new API(apis)

correction.create = (params) => {
  return correction.fetch(correction.apis.create, params, 'post')
}

export default correction
