import Login from '@/module/account/components/login.vue'
import ForgetPassword from '@/module/account/components/forgetPassword'
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
  }
]
