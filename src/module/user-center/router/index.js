import userCenter from '@/module/user-center/components/index'
import userInfo from '@/module/user-center/components/personal'
import myClass from '@/module/user-center/components/myClass'
import feedback from '@/module/user-center/components/feedback'
import setting from '@/module/user-center/components/setting'
import aboutUs from '@/module/user-center/components/aboutUs'
import modifyName from '@/module/user-center/components/modifyName'
import modifyPhone from '@/module/user-center/components/modifyPhone'
import classInfo from '@/module/user-center/components/classInfo'
import otherProblem from '@/module/user-center/components/otherProblem'
import modifyPassword from '@/module/user-center/components/modifyPassword'
import msgSetting from '@/module/user-center/components/msgSetting'
export default [
  {
    path: '/user-center',
    name: 'userCenter',
    component: userCenter,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/personal',
    name: 'personal',
    component: userInfo,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/myClass',
    name: 'myClass',
    component: myClass,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: feedback,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/aboutUs',
    name: 'aboutUs',
    component: aboutUs,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/modifyName',
    name: 'modifyName',
    component: modifyName,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/modifyPhone',
    name: 'modifyPhone',
    component: modifyPhone,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/classInfo',
    name: 'classInfo',
    component: classInfo,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/otherProblem',
    name: 'otherProblem',
    component: otherProblem,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/modifyPassword',
    name: 'modifyPassword',
    component: modifyPassword,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/msgSetting',
    name: 'msgSetting',
    component: msgSetting,
    meta: { requiresAuth: true, keepAlive: false }
  }
]
