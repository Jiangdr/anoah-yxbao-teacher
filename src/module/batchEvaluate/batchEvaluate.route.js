import batchEvaluate from './batchEvaluate.vue'
import comments from './writeComments/comments.vue'
import addComments from './writeComments/addComments.vue'
import editComments from './writeComments/editComments.vue'
import returnRewrite from './returnRewrite/returnRewrite.vue'

let batchEvaluateRoutes = [{
  path: '/batchEvaluate',
  name: 'batchEvaluate',
  meta: { requiresAuth: false, keepAlive: true },
  component: batchEvaluate
}, {
  path: '/comments',
  name: 'comments',
  meta: { requiresAuth: false, keepAlive: true },
  component: comments
}, {
  path: '/addComments',
  name: 'addComments',
  meta: { requiresAuth: false, keepAlive: true },
  component: addComments
}, {
  path: '/editComments',
  name: 'editComments',
  meta: { requiresAuth: false, keepAlive: true },
  component: editComments
}, {
  path: '/returnRewrite',
  name: 'returnRewrite',
  meta: { requiresAuth: false, keepAlive: true },
  component: returnRewrite
}];

export default batchEvaluateRoutes;
