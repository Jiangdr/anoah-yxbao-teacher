import kgtk from '@/module/tongji/components/kgtk.vue'

export default [{
  path: '/kgtk',
  name: 'kgtk',
  component: kgtk,
  meta: { requiresAuth: false, keepAlive: true }
}]
