import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/common.scss'
import VCharts from 'v-charts'
import myMixin from './myMixin'
// import { Message } from 'element-ui'

Vue.use(VCharts)


Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })

// router.beforeEach((to, from, next) => {
//   console.log(from)
//   if (to.fullPath !== '/') {
//     setTimeout(() => {
//       // setTimeout(() => {
//       let cookie = document.cookie
//       console.log(cookie)
//       if (cookie) {
//         next()
//       } else {
//         if (from.fullPath !== '/') {
//           Message({
//             type: 'warning',
//             message: '登录状态已失效，请重新登录。'
//           })
//         }
//         next('/')
//       }
//     }, 0)

//   } else {
//     next()
//   }

// })

Vue.mixin(myMixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
