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

let homeworkRoutes = [{
  path: '/homework',
  component: homework
}, {
  path: '/chooseTextbook',
  component: chooseTextbook
}, {
  path: '/examExercise',
  component: examExercise
}, {
  path: '/homeworkPublishSetting',
  component: homeworkPublishSetting
}, {
  path: '/publishHomework',
  component: publishHomework
}, {
  path: '/summerHomework',
  component: summerHomework
}];

export default homeworkRoutes;