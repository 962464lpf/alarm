import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/common.scss'
// import VueSocketIO from 'vue-socket.io'

// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     // 服务器端地址
//     connection: 'http://192.168.100.2:5000/api_connect',
//     vuex: {}
//   })
// )
// this.sockets.subscribe('relogin', data => {
//   console.log(data)
// })

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
