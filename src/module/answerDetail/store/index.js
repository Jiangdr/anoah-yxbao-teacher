export default {
  namespaced: true,
  state: {
    resource: [],
    params: null,
    studentAnswerDetailData: {}
  },
  getters: {
  },
  mutations: {
    setParams: (state, payload) => {
      state.params = payload
    },
    clearParams: state => {
      state.params = null
    },
    setParamsIndex: (state, payload) => {
      state.params.index = payload
    },
    setResource: (state, payload) => {
      state.resource = payload
    },
    clearResource: state => {
      state.resource = []
    },
    setStudentAnswerDetailData: (state, payload) => {
      state.studentAnswerDetailData = payload
    },
    setCorrectStatus: (state) => {
      state.resource[state.params.index].status = 3
    }
  },
  actions: {
  }
}
