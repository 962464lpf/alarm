import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newAlarmData: []
  },
  mutations: {
    changeNewAlarmData(state, data) {
      state.newAlarmData.push(data)
    }
  },
  actions: {
    WebSocketTest({ commit }) {
      let source = new EventSource('http://192.168.100.2:5000/stream2')
      // CONNECTING (0), OPEN (1), 或者 CLOSED (2)。
      console.log(source.readyState)
      source.onmessage = e => {
        commit('changeNewAlarmData', JSON.parse(e.data))
        console.log(JSON.parse(e.data))
      }
    }
  }
})
