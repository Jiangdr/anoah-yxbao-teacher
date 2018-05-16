import API from '@/axios/_api'
import config from '@/config/index'

let apis = {
  iclassLiveTeacher: config.apiDomain.old + '/api/?q=json/ebag/mutual/iclassLiveTeacher&'
}

let iclass = new API(apis)

iclass.judgeIclassLive = (params) => {
  return iclass.fetch(iclass.apis.iclassLiveTeacher, params, 'get', {'api': 'old'})
}
export default iclass
