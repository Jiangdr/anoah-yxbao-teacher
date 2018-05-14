import API from '@/axios/_api'

let apis = {
  iclassLiveTeacher: 'http://e.dev.anoah.com/api/?q=json/ebag/mutual/iclassLiveTeacher&'
}

let iclass = new API(apis)

iclass.judgeIclassLive = (params) => {
  return iclass.fetch(iclass.apis.iclassLiveTeacher, params, 'get')
}
export default iclass
