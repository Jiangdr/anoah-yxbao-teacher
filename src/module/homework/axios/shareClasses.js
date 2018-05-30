import API from '@/axios/_api'

let apis = {
  shareClassesUrl: 'jwt/user/share/add'
}

let shareClasses = new API(apis)

shareClasses.shareClassesApi = (params) => {
  return shareClasses.fetch(apis.shareClassesUrl, params, 'post')
}

export default shareClasses
