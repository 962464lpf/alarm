import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newAlarmData: [{ ip: 1 }]
  },
  mutations: {
    changeNewAlarmData(state, data) {
      state.newAlarmData.push(data)
    }
  },
  actions: {
    WebSocketTest({ commit }) {
      var source = new EventSource('http://192.168.100.2:5000/stream2')
      source.onmessage = e => {
        commit('changeNewAlarmData', JSON.parse(e.data))
        console.log(JSON.parse(e.data))
      }
    }
  }
})
