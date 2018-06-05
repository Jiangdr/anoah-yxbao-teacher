import API from '@/axios/_api'

let apis = {
  studentMutualCommentsGetLists: 'jwt/homework/comment/getList',
  getUserAnswerForMiniRs: 'jwt/homework/stat/getUserAnswerForMiniRs'
}

let correctTheSubject = new API(apis)

correctTheSubject.studentMutualCommentsGetLists = (params) => {
  return correctTheSubject.fetch(apis.studentMutualCommentsGetLists, params, 'post')
}

correctTheSubject.getUserAnswerForMiniRs = (params) => {
  return correctTheSubject.fetch(apis.getUserAnswerForMiniRs, params, 'post')
}

export default correctTheSubject
