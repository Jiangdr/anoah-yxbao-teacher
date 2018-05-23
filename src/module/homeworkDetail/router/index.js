import homeworkDetail from '@/module/homeworkDetail/components/index.vue'

export default [{
  path: '/homeworkDetail/:publishId/:classId',
  name: 'homeworkDetail',
  component: homeworkDetail,
  meta: { requiresAuth: false, keepAlive: true }
}]
