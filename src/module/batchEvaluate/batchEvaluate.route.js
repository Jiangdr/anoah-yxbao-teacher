import batchEvaluate from './batchEvaluate.vue'
import comments from './writeComments/comments.vue'
import addComments from './writeComments/addComments.vue'
import editComments from './writeComments/editComments.vue'
import returnRewrite from './returnRewrite/returnRewrite.vue'

let batchEvaluateRoutes = [{
  path: '/batchEvaluate',
  meta: { requiresAuth: false, keepAlive: true },
  component: batchEvaluate
}, {
  path: '/comments',
  meta: { requiresAuth: false, keepAlive: true },
  component: comments
}, {
  path: '/addComments',
  meta: { requiresAuth: false, keepAlive: true },
  component: addComments
}, {
  path: '/editComments',
  meta: { requiresAuth: false, keepAlive: true },
  component: editComments
}, {
  path: '/returnRewrite',
  meta: { requiresAuth: false, keepAlive: true },
  component: returnRewrite
}];

export default batchEvaluateRoutes;
