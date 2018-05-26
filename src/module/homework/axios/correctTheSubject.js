import API from '@/axios/_api'

let apis = {
  studentMutualCommentsGetLists: 'jwt/homework/comment/getList'
}

let correctTheSubject = new API(apis)

correctTheSubject.studentMutualCommentsGetLists = (params) => {
  return correctTheSubject.fetch(apis.studentMutualCommentsGetLists, params, 'post')
}

export default correctTheSubject
