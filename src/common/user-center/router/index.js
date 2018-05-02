import userCenter from '@/common/user-center/components/index'
import userInfo from '@/common/user-center/components/personal'
import myClass from '@/common/user-center/components/myClass'
import feedback from '@/common/user-center/components/feedback'
import setting from '@/common/user-center/components/setting'
import aboutUs from '@/common/user-center/components/aboutUs'
import modifyName from '@/common/user-center/components/modifyName'
import modifyPhone from '@/common/user-center/components/modifyPhone'
import classInfo from '@/common/user-center/components/classInfo'
import otherProblem from '@/common/user-center/components/otherProblem'
import modifyPassword from '@/common/user-center/components/modifyPassword'
import msgSetting from '@/common/user-center/components/msgSetting'
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
