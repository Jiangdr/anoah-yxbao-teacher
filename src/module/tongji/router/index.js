import tongji from '@/module/tongji/components/index'

export default [{
  // h:1作业 0课中
  path: '/tongji/:question_type/:course_hour_publish_id/:course_resource_id/:resource_id/:dcom_entity_id/:h/:average_rate/:average_time_length',
  name: 'tongji',
  component: tongji,
  meta: { requiresAuth: false, keepAlive: true }
}]
