export const chooseSummerHomeworkArray = 'chooseSummerHomeworkArray';
export const chooseExamExerciseQtiIdsArray = 'chooseExamExerciseQtiIdsArray';
export const chooseTextBookObj = 'chooseTextBookObj';
export const summerHomeworkPackId = 'summerHomeworkPackId';
export const homeworkOneListInfoObj = 'homeworkOneListInfoObj';
export const summerHomeworkSelPageIDs = 'summerHomeworkSelPageIDs';

export default {
  state: {
    chooseSummerHomeworkArray: [],
    chooseExamExerciseQtiIdsArray: [],
    summerHomeworkSelPageIDs: [],
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
    summerHomeworkSelPageIDs: function ({ commit }, result) {
      commit(summerHomeworkSelPageIDs, result);
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
      state.summerHomeworkPackId = result;
    },
    [homeworkOneListInfoObj](state, result) {
      state.homeworkOneListInfoObj = result;
    },
    [summerHomeworkSelPageIDs](state, result) {
      state.summerHomeworkSelPageIDs = result;
    }
  }
};
