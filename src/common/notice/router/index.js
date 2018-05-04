import notice from '@/common/notice/components/noticeList.vue'
import homeworkList from '@/common/notice/components/homeworkList.vue'
import schoolList from '@/common/notice/components/schoolList.vue'
import noticeDetail from '@/common/notice/components/noticeDetail.vue'

export default [{
  path: '/notice',
  name: 'notice',
  component: notice,
  meta: {
    requiresAuth: false,
    keepAlive: true
  }
}, {
  path: '/homeworkList',
  name: 'homeworkList',
  component: homeworkList,
  meta: {
    requiresAuth: false,
    keepAlive: true
  }
}, {
  path: '/schoolList',
  name: 'schoolList',
  component: schoolList,
  meta: {
    requiresAuth: false,
    keepAlive: true
  }
}, {
  path: '/noticeDetail',
  name: 'noticeDetail',
  component: noticeDetail,
  meta: {
    requiresAuth: false,
    keepAlive: true
  }
}]
