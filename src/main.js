import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/common.scss'
import { startListernApi } from './tools/api'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })

router.beforeEach((to, from, next) => {
  startListernApi()
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
