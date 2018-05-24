
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
    getStudentInfo: (state, getters) => (payload) => {
      if (!state.homeworkInfo) {
        return null
      }
      let result
      let sortRule = payload.split('_')
      switch (sortRule[0]) {
        case 'correct':
          result = getters.getStudentByCorrect(sortRule[1])
          break;
        case 'name':
          result = getters.getStudentByName(sortRule[1])
          break;
        case 'cuoti':
          result = getters.getStudentByCuoti(sortRule[1])
          break;
        case 'time':
          result = getters.getStudentByTime(sortRule[1])
      }
      return result
    },
    // 根据正确率排序
    getStudentByCorrect: (state) => (payload) => {
      let result
      if (payload === 'down') {
        result = state.homeworkInfo.student_list.filter(item => item.status !== 0).sort((a, b) => {
          return b.rate - a.rate
        }).concat(state.homeworkInfo.student_list.filter(item => item.status === 0))
      } else {
        result = state.homeworkInfo.student_list.filter(item => item.status !== 0).sort((a, b) => {
          return a.rate - b.rate
        }).concat(state.homeworkInfo.student_list.filter(item => item.status === 0))
      }
      return result
    },
    // 根据姓名排序
    getStudentByName: (state) => (payload) => {
      let result
      if (payload === 'down') {
        result = state.homeworkInfo.student_list.filter(item => item.status !== 0).sort((a, b) => {
          return b.real_name.localeCompare(a.real_name, 'zh-Hans-CN', {sensitivity: 'accent'})
        }).concat(state.homeworkInfo.student_list.filter(item => item.status === 0))
      } else {
        result = state.homeworkInfo.student_list.filter(item => item.status !== 0).sort((a, b) => {
          return a.real_name.localeCompare(b.real_name, 'zh-Hans-CN', {sensitivity: 'accent'})
        }).concat(state.homeworkInfo.student_list.filter(item => item.status === 0))
      }
      return result
    },
    // 根据错题订正排序
    getStudentByCuoti: (state) => (payload) => {
      let result
      if (payload === 'down') {
        result = state.homeworkInfo.student_list.filter(item => item.status !== 0).sort((a, b) => {
          return b.correct_num.split('/')[0] - a.correct_num.split('/')[0]
        }).concat(state.homeworkInfo.student_list.filter(item => item.status === 0))
      } else {
        result = state.homeworkInfo.student_list.filter(item => item.status !== 0).sort((a, b) => {
          return a.correct_num.split('/')[0] - b.correct_num.split('/')[0]
        }).concat(state.homeworkInfo.student_list.filter(item => item.status === 0))
      }
      return result
    },
    // 根据完成时间排序
    getStudentByTime: (state) => (payload) => {
      let result
      if (payload === 'down') {
        result = state.homeworkInfo.student_list.filter(item => item.status !== 0).sort((a, b) => {
          return Number(b.time) - Number(a.time)
        }).concat(state.homeworkInfo.student_list.filter(item => item.status === 0))
      } else {
        result = state.homeworkInfo.student_list.filter(item => item.status !== 0).sort((a, b) => {
          return Number(a.time) - Number(b.time)
        }).concat(state.homeworkInfo.student_list.filter(item => item.status === 0))
      }
      return result
    },
    // 正确率分布图数据
    getCorrectInfo: (state) => {
      let stuList = state.homeworkInfo.student_list.filter(item => item.status === 3)
      let result = {
        '优秀': {
          num: 0
        },
        '良好': {
          num: 0
        },
        '及格': {
          num: 0
        },
        '待提升': {
          num: 0
        }
      }
      stuList.filter(item => {
        if (item.rate * 100 >= 85) {
          result['优秀']['num']++
        } else if ((item.rate * 100 >= 70) && (item.rate * 100 < 85)) {
          result['良好']['num']++
        } else if ((item.rate * 100 >= 60) && (item.rate * 100 < 70)) {
          result['及格']['num']++
        } else {
          result['待提升']['num']++
        }
      })
      return result
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
    basicStateInfo({rootState, rootGetters, commit}, payload) {
      apis.getinfo(payload).then((succ) => {
        succ.student_list.forEach(ele => {
          if (ele.avatar.indexOf('http://') === -1) {
            ele.avatar = rootGetters['runEnv/old'] + ele.avatar
          }
        });
        commit({
          type: 'homeworkInfo',
          info: succ
        })
      })
    }
  }
}
