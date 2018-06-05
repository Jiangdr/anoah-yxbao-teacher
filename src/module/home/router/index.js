import home from '@/module/home/pages/index'
import afterQRscan from '@/module/home/pages/QRcodeScan'
export default [
  {
    path: '/',
    name: 'Home',
    component: home,
    meta: { requiresAuth: true, keepAlive: true }
  },
  {
    path: '/afterQRscan/:status', // 0为失败，1为成功
    name: 'AfterQrscan',
    component: afterQRscan,
    meta: { requiresAuth: true, keepAlive: true }
  }
]
