import batchEvaluate from './batchEvaluate.vue'
import comments from './writeComments/comments.vue'

let batchEvaluateRoutes = [{
  path: '/batchEvaluate',
  component: batchEvaluate
}, {
  path: '/comments',
  component: comments
}];

export default batchEvaluateRoutes;
