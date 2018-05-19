import tongji from '@/module/tongji/components/tongji.vue'
import originalQuestion from '@/module/tongji/components/originalQuestion.vue'
// 正确率表格图  例：客观填空、选词填空
import correctTable from '@/module/tongji/components/question/correctTable.vue'
// 答案柱状图  例：判断题、单选题、多选题、不定选项、排序题
import answerColumn from '@/module/tongji/components/question/answerColumn.vue'
// 主观题  例：主观填空
import Subjective from '@/module/tongji/components/question/Subjective.vue'
// 选项答案表格 例：完形填空
import choiceTable from '@/module/tongji/components/question/choiceTable.vue'
// 汉字听写组件
import hanzitingxie from '@/module/tongji/components/question/hanzitingxie.vue'
// 主观题  例：主观填空
import correctColumn from '@/module/tongji/components/question/correctColumn.vue'
// 组件详情---选词填空  一般组件
import groupDetail from '@/module/tongji/components/question/groupDetail.vue'
// 组件详情   口算训练
import groupDetailColumn from '@/module/tongji/components/question/groupDetailColumn.vue'
export default
[
  {
    name: 'tongji',
    path: '/tongji',
    meta: { requiresAuth: false, keepAlive: true },
    component: tongji,
    children: [
      {
        path: '/correctTable',
        name: 'correctTable',
        component: correctTable,
        meta: { requiresAuth: false, keepAlive: false }
      }, {
        path: '/answerColumn',
        name: 'answerColumn',
        component: answerColumn,
        meta: { requiresAuth: false, keepAlive: false }
      }, {
        path: '/Subjective',
        name: 'Subjective',
        component: Subjective,
        meta: { requiresAuth: false, keepAlive: false }
      }, {
        path: '/choiceTable',
        name: 'choiceTable',
        component: choiceTable,
        meta: { requiresAuth: false, keepAlive: false }
      }, {
        path: '/hanzitingxie',
        name: 'hanzitingxie',
        component: hanzitingxie,
        meta: { requiresAuth: false, keepAlive: false }
      }, {
        path: '/correctColumn',
        name: 'correctColumn',
        component: correctColumn,
        meta: { requiresAuth: false, keepAlive: false }
      }, {
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
    name: 'originalQuestion',
    path: '/originalQuestion',
    component: originalQuestion,
    meta: {requiresAuth: true, keepAlive: false}
  }
]
