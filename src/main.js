import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/common.scss'
import { verifyAuthApi } from './tools/api'
import VCharts from 'v-charts'
import myMixin from './myMixin'

Vue.use(VCharts)


Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })

router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/') {
    verifyAuthApi()
  }
  next()
})


Vue.mixin(myMixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
