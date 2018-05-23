
import apis from '../axios/detail'
export default {
  namespaced: true,
  state: {
    params: {}, // 当前题数据
    mini: {}, // 当前套题的小题
    index: 0, // 当前题再miniResource中位置
    homeworkInfo: null
  },
  getters: {
    getStudentInfo(state) {
      return state.homeworkInfo ? state.homeworkInfo.student_list : null
    }
  },
  mutations: {
    setParams(state, val) {
      state.params = val
    },
    setmini(state, val) {
      state.mini = val
    },
    setIndex(state, val) { // 滑动改变index值
      if (val > 0) {
        if (state.index === state.mini.length - 1) {
          return false
        } else {
          state.index++
        }
      } else {
        if (state.index === 0) {
          return false
        } else {
          state.index--
        }
      }
      state.params = state.mini[state.index];
    },
    changIndex(state, val) { // 直接改变index值
      state.index = val
      state.params = state.mini[state.index];
    },
    // 单个作业信息
    homeworkInfo(state, payload) {
      state.homeworkInfo = payload.info
    }
  },
  actions: {
    // 获取作业基本信息，统计和学生列表
    basicStateInfo({commit}, payload) {
      apis.getinfo(payload).then((succ) => {
        commit({
          type: 'homeworkInfo',
          info: succ
        })
      })
    }
  }
}
