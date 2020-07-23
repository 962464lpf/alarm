import Vue from 'vue'
import Vuex from 'vuex'
import { BASE_URL, closeBackend } from '../tools/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventSource: null,
    newAlarmData: [],
    attackNum: 0,
    attackNumDesc: '',
    attackNumHigh: 0,
    attackNumHighDesc: '',
    attackNumMiddle: 0,
    attackNumMiddleDesc: '',
    attackNumLow: 0,
    attackNumLowDesc: '',
    currentPath: '/',
    cycle: 'day',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
      ? JSON.parse(sessionStorage.getItem('userInfo'))
      : {},
  },
  mutations: {
    saveSourceObj(state, data) {
      state.eventSource = data
    },
    changeNewAlarmData(state, data) {
      state.newAlarmData.push(data)
    },
    clearNewAlarmData(state) {
      state.newAlarmData = []
    },
    changeAttackNum(state, data) {
      let enumData = {
        attackNum: 'num',
        attackNumHigh: 'num_high',
        attackNumMiddle: 'num_middle',
        attackNumLow: 'num_low',
        attackNumDesc: 'desc',
        attackNumHighDesc: 'desc_high',
        attackNumMiddleDesc: 'desc_middle',
        attackNumLowDesc: 'desc_low',
      }
      let setData = (data) => {
        for (let key in enumData) {
          state[key] = data[enumData[key]]
        }
      }
      if (data.day) {
        setData(data[state.cycle])
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
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    closeEventSource(state) {
      state.eventSource.close()
      closeBackend()
    },
  },
  actions: {
    connectEventSource({ commit }, data = {}) {
      let source = new EventSource(
        BASE_URL +
        '/jump/api/stream2?device_ipstr=' +
        data.device_ipstr +
        '&uid=' +
        data.id +
        '&level=' +
        data.level
      )
      commit('saveSourceObj', source)
      // CONNECTING (0), OPEN (1), 或者 CLOSED (2)。
      source.onopen = () => {
        commit('saveSourceObj', source)
      }
      source.onmessage = (e) => {
        let data = JSON.parse(e.data)
        let alert_data = JSON.parse(data.alert_data)
        console.log(JSON.parse(data.alert_data))
        alert_data.device_ip = alert_data.device_ip + alert_data.device_type
        commit('changeNewAlarmData', alert_data)
        commit('changeAttackNum', JSON.parse(data.latest_attack_summary))
      }
    },
    disconnectEventSource({ commit }) {
      commit('closeEventSource')
    },
  },
})
