
import CheckDetail from '../check/CheckDetail.vue'
const answerDetail = () => import(/* webpackChunkName: "answerDetail" */'@/module/answerDetail/components/index.vue');
const groupDetail = () => import(/* webpackChunkName: "answerDetail" */'@/module/answerDetail/components/question/groupDetail.vue');
// 组件详情   口算训练
const groupDetailColumn = () => import(/* webpackChunkName: "answerDetail" */'@/module/answerDetail/components/question/groupDetailColumn.vue');
// 批改本题页面
const checkAnswerDetai = () => import(/* webpackChunkName: "answerDetail" */'@/module/answerDetail/checkAnswerDetai/checkAnswerDetai.vue');
export default
[
  {
    name: 'answerDetail',
    path: '/answerDetail',
    meta: { requiresAuth: false, keepAlive: true },
    component: answerDetail,
    children: [
      {
        path: '/groupDetail',
        name: 'groupDetail',
        component: groupDetail,
        meta: { requiresAuth: false, keepAlive: false }
      }, {
        path: '/groupDetailColumn',
        name: 'groupDetailColumn',
        component: groupDetailColumn,
        meta: { requiresAuth: false, keepAlive: false }
      }
    ]
  },
  {
    path: '/checkAnswerDetai',
    meta: { requiresAuth: false, keepAlive: true },
    name: "checkAnswerDetai",
    component: checkAnswerDetai
  },
  {
    path: '/checkAnswerDetai/check',
    meta: { requiresAuth: false, keepAlive: false },
    name: "CheckDetail",
    component: CheckDetail
  }
]
