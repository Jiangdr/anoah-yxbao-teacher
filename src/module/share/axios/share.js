import API from '@/axios/_api'

let apis = {
  'share': 'jwt/user/share/add'
}

let share = new API(apis)
share.share = (params) => {
  return share.fetch(share.apis.share, params, 'post')
}
export default share
