import Vue from 'vue'
import Vuex from 'vuex'
import { BASE_URL } from '../tools/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newAlarmData: [],
    attackNum: 0,
    attackNumHigh: 0,
    attackNumMiddle: 0,
    attackNumLow: 0,
    currentPath: '/',
    cycle: 'day'
  },
  mutations: {
    changeNewAlarmData(state, data) {
      state.newAlarmData.push(data)
    },
    clearNewAlarmData(state) {
      state.newAlarmData = []
    },
    changeAttackNum(state, data) {
      if (data.day) {
        if (state.cycle === 'day') {
          state.attackNum = data.day.num
          state.attackNumHigh = data.day.num_high
          state.attackNumMiddle = data.day.num_middle
          state.attackNumLow = data.day.num_low
        } else if (state.cycle === 'week') {
          state.attackNum = data.week.num
          state.attackNumHigh = data.week.num_high
          state.attackNumMiddle = data.week.num_middle
          state.attackNumLow = data.week.num_low
        } else {
          state.attackNum = data.month.num
          state.attackNumHigh = data.month.num_high
          state.attackNumMiddle = data.month.num_middle
          state.attackNumLow = data.month.num_low
        }

      } else {
        state.attackNum = data.num
        state.attackNumHigh = data.num_high
        state.attackNumMiddle = data.num_middle
        state.attackNumLow = data.num_low
      }
    },
    changeCurrentPath(state, data) {
      state.currentPath = data
    },
    cahngeCycle(state, data) {
      state.cycle = data
    }
  },
  actions: {
    WebSocketTest({ commit }) {
      let source = new EventSource(BASE_URL + '/stream2')

      // CONNECTING (0), OPEN (1), 或者 CLOSED (2)。
      source.onmessage = (e) => {
        let data = JSON.parse(e.data)
        console.log(JSON.parse(data.alert_data))
        commit('changeNewAlarmData', JSON.parse(data.alert_data))
        commit('changeAttackNum', JSON.parse(data.latest_attack_summary))
      }
    }
  }
})
