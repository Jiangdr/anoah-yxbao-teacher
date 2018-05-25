import API from '@/axios/_api'

let apis = {
  'getList': '/jwt/notice/message/getList',
  'getDetail': 'jwt/notice/message/get'
}

let notice = new API(apis)
notice.getList = (params) => {
  return notice.fetch(notice.apis.getList, params, 'post')
}
notice.getItemInfo = (params) => {
  return notice.fetch(notice.apis.getDetail, params, 'post')
}
export default notice
