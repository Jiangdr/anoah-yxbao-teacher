import Login from '@/module/account/components/login.vue'
import ForgetPassword from '@/module/account/components/forgetPassword.vue'
import SetNewPassword from '@/module/account/components/setNewPassword.vue'
import ContactUs from '@/module/account/components/contactUs.vue'
import FormList from '@/module/account/components/formList.vue'
import SchoolSearch from '@/module/account/components/schoolSearch.vue'
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
    name: 'contactUs',
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
        meta: { requiresAuth: false, keepAlive: false }
      }
    ],
    meta: { requiresAuth: false, keepAlive: true }
  }
]
