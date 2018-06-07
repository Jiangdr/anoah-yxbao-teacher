const Login = () => import(/* webpackChunkName: "account" */'@/module/account/components/login.vue')
const ForgetPassword = () => import(/* webpackChunkName: "account" */'@/module/account/components/forgetPassword.vue')
const SetNewPassword = () => import(/* webpackChunkName: "account" */'@/module/account/components/setNewPassword.vue')
const ContactUs = () => import(/* webpackChunkName: "account" */'@/module/account/components/contactUs.vue')
const FormList = () => import(/* webpackChunkName: "account" */'@/module/account/components/formList.vue')
const SchoolSearch = () => import(/* webpackChunkName: "account" */'@/module/account/components/schoolSearch.vue')

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false, keepAlive: true }
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: ForgetPassword,
    meta: { requiresAuth: false, keepAlive: false }
  },
  {
    path: '/newPassword/:phone/:userId',
    name: 'setNewPassword',
    component: SetNewPassword,
    meta: { requiresAuth: false, keepAlive: false }
  },
  {
    path: '/contactUs',
    component: ContactUs,
    children: [
      {
        path: '',
        name: 'formList',
        component: FormList,
        meta: { requiresAuth: false, keepAlive: true }
      },
      {
        path: 'schoolSearch/:cityId',
        name: 'schoolSearch',
        component: SchoolSearch,
        meta: { requiresAuth: false, keepAlive: true }
      }
    ],
    meta: { requiresAuth: false, keepAlive: true }
  }
]
