export const chooseBatchEvaluateStudentsArray = 'chooseBatchEvaluateStudentsArray';

export default {
  state: {
    chooseBatchEvaluateStudentsArray: []
  },
  actions: {
    chooseBatchEvaluateStudentsArray: function ({ commit }, result) {
      commit(chooseBatchEvaluateStudentsArray, result);
    }
  },
  mutations: {
    [chooseBatchEvaluateStudentsArray](state, result) {
      state.chooseBatchEvaluateStudentsArray = result;
    }
  }
};
