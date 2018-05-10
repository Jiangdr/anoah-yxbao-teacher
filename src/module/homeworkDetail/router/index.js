import homeworkDetail from '@/module/homeworkDetail/components/homeworkDetail.vue'

export default [{
  path: '/homeworkDetail',
  name: 'homeworkDetail',
  component: homeworkDetail,
  meta: { requiresAuth: false, keepAlive: true }
}]
