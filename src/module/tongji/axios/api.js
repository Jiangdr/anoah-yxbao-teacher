import API from '@/axios/_api'

let apis = {
  'getMiniResource': '/jwt/homework/stat/getMinResourceList'
}

let tongji = new API(apis)

tongji.getMiniResource = (params) => {
  return tongji.fetch(tongji.apis.getMiniResource, params, 'post')
}
export default tongji
