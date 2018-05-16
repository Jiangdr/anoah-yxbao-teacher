// 作业首页页面
import homework from '@/components/homework/homework.vue'
// 教材选择页面
import chooseTextbook from '@/components/publishHomework/chooseTextbook.vue'
// 试题页面
import examExercise from '@/components/publishHomework/examExercise.vue'
// 作业布置选择发布条件页面
import homeworkPublishSetting from '@/components/publishHomework/homeworkPublishSetting.vue'
// 推荐和校本库页面
import publishHomework from '@/components/publishHomework/publishHomework.vue'
// 暑假作业内容页面
import summerHomework from '@/components/publishHomework/summerHomework.vue'

export default
[{ path: '/homework',
  meta: { requiresAuth: true, keepAlive: false },
  component: homework,
  children: [{
    path: '/chooseTextbook',
    name: 'chooseTextbook',
    component: chooseTextbook,
    meta: { requiresAuth: true, keepAlive: false }
  },{
    path: '/examExercise',
    name: 'examExercise',
    component: examExercise,
    meta: { requiresAuth: true, keepAlive: false }
  }, {
    path: '/homeworkPublishSetting',
    name: 'homeworkPublishSetting',
    component: homeworkPublishSetting,
    meta: { requiresAuth: true, keepAlive: false }
  }, {
    path: '/publishHomework',
    name: 'publishHomework',
    component: publishHomework,
    meta: { requiresAuth: true, keepAlive: false }
  }, {
    path: '/summerHomework',
    name: 'summerHomework',
    component: summerHomework,
    meta: { requiresAuth: true, keepAlive: false }
  }
  ]
}]
