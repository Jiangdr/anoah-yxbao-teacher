import API from '@/axios/_api'

let apis = {
  'stuHomework': 'jwt/homework/stat/basicForStudent'
}

let studentHomework = new API(apis)
studentHomework.studentHomeworkInfo = params => {
  return studentHomework.fetch(studentHomework.apis.stuHomework, params, 'post')
}

export default studentHomework
