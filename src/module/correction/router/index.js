import correction from '@/module/correction/components/correction.vue'

export default [{
  path: '/correction/:rsid', // 资源ID
  name: 'correction',
  component: correction,
  meta: { requiresAuth: false, keepAlive: false }
}]
