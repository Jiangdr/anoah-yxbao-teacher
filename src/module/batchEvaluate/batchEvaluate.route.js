import batchEvaluate from './batchEvaluate.vue'
import comments from './writeComments/comments.vue'
import addComments from './writeComments/addComments.vue'

let batchEvaluateRoutes = [{
  path: '/batchEvaluate',
  component: batchEvaluate
}, {
  path: '/comments',
  component: comments
}, {
  path: '/addComments',
  component: addComments
}];

export default batchEvaluateRoutes;
