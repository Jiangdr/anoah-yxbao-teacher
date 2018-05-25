export const chooseSummerHomeworkArray = 'chooseSummerHomeworkArray';
export const chooseExamExerciseQtiIdsArray = 'chooseExamExerciseQtiIdsArray';
export const chooseTextBookObj = 'chooseTextBookObj';
export const summerHomeworkPackId = 'summerHomeworkPackId';
export const homeworkOneListInfoObj = 'homeworkOneListInfoObj';
export const hasChoosePagesArray = 'hasChoosePagesArray';

export default {
  state: {
    chooseSummerHomeworkArray: [],
    chooseExamExerciseQtiIdsArray: [],
    hasChoosePagesArray: [],
    chooseTextBookObj: {}
  },
  actions: {
    chooseSummerHomeworkArray: function ({ commit }, result) {
      commit(chooseSummerHomeworkArray, result);
    },
    chooseExamExerciseQtiIdsArray: function ({ commit }, result) {
      commit(chooseExamExerciseQtiIdsArray, result);
    },
    chooseTextBookObj: function ({ commit }, result) {
      commit(chooseTextBookObj, result);
    },
    summerHomeworkPackId: function ({ commit }, result) {
      commit(summerHomeworkPackId, result);
    },
    homeworkOneListInfoObj: function ({ commit }, result) {
      commit(homeworkOneListInfoObj, result);
    },
    hasChoosePagesArray: function ({ commit }, result) {
      commit(hasChoosePagesArray, result);
    }
  },
  mutations: {
    [chooseSummerHomeworkArray](state, result) {
      state.chooseSummerHomeworkArray = result;
    },
    [chooseExamExerciseQtiIdsArray](state, result) {
      state.chooseExamExerciseQtiIdsArray = result;
    },
    [chooseTextBookObj](state, result) {
      state.chooseTextBookObj = result;
    },
    [summerHomeworkPackId](state, result) {
      if (state.summerHomeworkPackId !== result) {
        state.hasChoosePagesArray = [];
      }
      state.summerHomeworkPackId = result;
    },
    [homeworkOneListInfoObj](state, result) {
      state.homeworkOneListInfoObj = result;
    },
    [hasChoosePagesArray](state, result) {
      state.hasChoosePagesArray = result;
    }
  }
};
