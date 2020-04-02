import Vue from 'vue'
function WebSocketTest() {
  var source = new EventSource('http://192.168.100.2:5000/stream2')
  source.onmessage = e => {
    Vue.store.commit('changeNewAlarmData', JSON.parse(e.data))
    console.log(e.data)
    console.log(JSON.parse(e.data))
    console.log(JSON.parse(e.data).state)
  }
}

function changeData() {
  Vue.store.commit('changeNewAlarmData', 'fsfs')
}

export { WebSocketTest, changeData }
