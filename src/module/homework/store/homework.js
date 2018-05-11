export const setChooseSummerHomework = 'setChooseSummerHomework';

export default {
    state: {
        chooseSummerHomeworkArray: []
    },
    actions: {
        setChooseSummerHomework: function ({ commit }, result) {
            commit(setChooseSummerHomework, result);
        },
    },
    mutations: {
        [setChooseSummerHomework](state, result) {
            state.chooseSummerHomeworkArray = result;
        },
    }
};
