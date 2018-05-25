import tongji from '@/module/tongji/components/index'

export default [{
  path: '/tongji',
  name: 'tongji',
  component: tongji,
  meta: { requiresAuth: false, keepAlive: true }
}]
