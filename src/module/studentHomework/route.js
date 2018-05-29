import studentHomework from './components/index'
export default [{
  // h:1作业 0课中
  path: '/studentHomework/:user_id/:publish_id/:user_name',
  name: 'StudentHomeword',
  component: studentHomework,
  meta: { requiresAuth: false, keepAlive: true }
}]
