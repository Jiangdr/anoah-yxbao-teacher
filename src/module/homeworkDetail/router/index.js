import homeworkDetail from '@/module/homeworkDetail/components/index.vue'
import knowledgePointDetail from '@/module/homeworkDetail/components/knowledgePointDetail.vue'
export default [
  {
    path: '/homeworkDetail/:publishId/:classId',
    name: 'homeworkDetail',
    component: homeworkDetail,
    meta: { requiresAuth: false, keepAlive: true }
  },
  {
    path: '/knowledgePointDetail/:publishId/:kp_id/:qti_count/:correct_rate',
    name: 'knowledgePointDetail',
    component: knowledgePointDetail,
    meta: { requiresAuth: false, keepAlive: true }
  }
]
