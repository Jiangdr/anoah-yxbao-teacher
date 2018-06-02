// 作业首页页面
import homework from './homework.vue'
// 教材选择页面
import chooseTextbook from './publishHomework/chooseTextbook'
// 试题页面
import examExercise from './publishHomework/examExercise.vue'
// 作业布置选择发布条件页面
import homeworkPublishSetting from './publishHomework/homeworkPublishSetting.vue'
// 推荐和校本库页面
import publishHomework from './publishHomework/publishHomework.vue'
// 暑假作业内容页面
import summerHomework from './publishHomework/summerHomework.vue'
// 批改本题页面
import correctTheSubject from './correctTheSubject/correctTheSubject.vue'

let homeworkRoutes = [{
  path: '/homework',
  meta: { requiresAuth: false, keepAlive: true },
  component: homework
}, {
  path: '/chooseTextbook',
  meta: { requiresAuth: false, keepAlive: true },
  component: chooseTextbook
}, {
  name: 'examExercise',
  path: '/examExercise',
  meta: { requiresAuth: false, keepAlive: true },
  component: examExercise
}, {
  path: '/homeworkPublishSetting',
  meta: { requiresAuth: false, keepAlive: true },
  name: 'homeworkPublishSetting',
  component: homeworkPublishSetting
}, {
  path: '/publishHomework',
  meta: { requiresAuth: false, keepAlive: true },
  component: publishHomework
}, {
  path: '/summerHomework',
  meta: { requiresAuth: false, keepAlive: true },
  component: summerHomework
}, {
  path: '/correctTheSubject',
  meta: { requiresAuth: false, keepAlive: true },
  name: "correctTheSubject",
  component: correctTheSubject
}];

export default homeworkRoutes;
