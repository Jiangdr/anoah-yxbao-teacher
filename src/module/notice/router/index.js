import notice from '@/module/notice/components/noticeList.vue'
import homeworkList from '@/module/notice/components/homeworkList.vue'
import homeworkListStu from '@/module/notice/components/homeworkList_stu.vue'
import schoolList from '@/module/notice/components/schoolList.vue'
import noticeDetail from '@/module/notice/components/noticeDetail.vue'

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
  path: '/homeworkList_stu',
  name: 'homeworkList_stu',
  component: homeworkListStu,
  meta: {
    requiresAuth: false,
    keepAlive: true
  }
},
{
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
}
]
