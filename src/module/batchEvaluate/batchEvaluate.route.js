import batchEvaluate from './batchEvaluate.vue'
import comments from './writeComments/comments.vue'
import addComments from './writeComments/addComments.vue'
import editComments from './writeComments/editComments.vue'
import returnRewrite from './returnRewrite/returnRewrite.vue'

let batchEvaluateRoutes = [{
  path: '/batchEvaluate',
  component: batchEvaluate
}, {
  path: '/comments',
  component: comments
}, {
  path: '/addComments',
  component: addComments
}, {
  path: '/editComments',
  component: editComments
}, {
  path: '/returnRewrite',
  component: returnRewrite
}];

export default batchEvaluateRoutes;
