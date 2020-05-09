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

Vue.mixin(myMixin)
// eslint-disable-next-line no-undef
Vue.prototype.$NAME = $NAME

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // eslint-disable-next-line no-undef
    document.title = $NAME
  }
}).$mount('#app')
