import kgtk from '@/module/tongji/components/kgtk.vue'
import danxuan from '@/module/tongji/components/danxuan.vue'

export default [{
  path: '/kgtk',
  name: 'kgtk',
  component: kgtk,
  meta: { requiresAuth: false, keepAlive: true }
}, {
  path: '/danxuan',
  name: 'danxuan',
  component: danxuan,
  meta: { requiresAuth: false, keepAlive: true }
}]
