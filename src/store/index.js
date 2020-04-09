import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newAlarmData: [],
    attackNum: 0,
    attackNumHigh: 0,
    attackNumMiddle: 0,
    attackNumLow: 0,
    currentPath: '/'
  },
  mutations: {
    changeNewAlarmData(state, data) {
      state.newAlarmData.push(data)
    },
    clearNewAlarmData(state) {
      state.newAlarmData = []
    },
    changeAttackNum(state, data) {
      state.attackNum = data.num
      state.attackNumHigh = data.num_high
      state.attackNumMiddle = data.num_middle
      state.attackNumLow = data.num_low
    },
    changeCurrentPath(state, data) {
      state.currentPath = data
    }
  },
  actions: {
    WebSocketTest({ commit }) {
      let source = new EventSource('http://192.168.100.2:5000/stream2')
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
