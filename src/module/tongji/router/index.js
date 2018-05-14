import kgtk from '@/module/tongji/components/kgtk.vue'
import danxuan from '@/module/tongji/components/danxuan.vue'
import tiankong from '@/module/tongji/components/tiankong.vue'
import wanxingtk from '@/module/tongji/components/wanxingtk.vue'
import hanzitingxie from '@/module/tongji/components/hanzitingxie.vue'

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
}, {
  path: '/tiankong',
  name: 'tiankong',
  component: tiankong,
  meta: { requiresAuth: false, keepAlive: true }
}, {
  path: '/wanxingtk',
  name: 'wanxingtk',
  component: wanxingtk,
  meta: { requiresAuth: false, keepAlive: true }
}, {
  path: '/hanzitingxie',
  name: 'hanzitingxie',
  component: hanzitingxie,
  meta: { requiresAuth: false, keepAlive: true }
}]
