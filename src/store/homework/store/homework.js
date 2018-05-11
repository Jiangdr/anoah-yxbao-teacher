export const setChooseSummerHomework = 'setChooseSummerHomework';
export const setChooseExamExercise = 'setChooseExamExercise';

export default {
    state: {
        chooseSummerHomeworkArray: [],
        chooseExamExerciseArray: []
    },
    actions: {
        setChooseSummerHomework: function ({ commit }, result) {
            commit(setChooseSummerHomework, result);
        },
        setChooseExamExercise: function ({ commit }, result) {
            commit(setChooseExamExercise, result);
        },
    },
    mutations: {
        [setChooseSummerHomework](state, result) {
            state.chooseSummerHomeworkArray = result;
        },
        [setChooseExamExercise](state, result) {
            state.chooseExamExerciseArray = result;
        },
    }
};
