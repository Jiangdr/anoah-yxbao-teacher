import correction from '@/common/correction/components/correction.vue'

export default [{
  path: '/correction',
  name: 'correction',
  component: correction,
  meta: { requiresAuth: false, keepAlive: true }
}]
