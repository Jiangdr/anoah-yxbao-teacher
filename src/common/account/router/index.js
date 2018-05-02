import Login from '@/common/account/components/login.vue'

export default [{
  path: '/login',
  name: 'login',
  component: Login,
  meta: { requiresAuth: false, keepAlive: true }
}]
