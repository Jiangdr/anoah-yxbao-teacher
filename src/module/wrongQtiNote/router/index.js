import wrongQtiNote from '@/module/wrongQtiNote/pages/index'
export default [
  {
    path: '/wrongQtiNote',
    name: 'WrongQtiNote',
    component: wrongQtiNote,
    meta: { requiresAuth: true, keepAlive: true }
  }
]
