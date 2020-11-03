import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/common.scss'
import VCharts from 'v-charts'
import myMixin from './myMixin'
import { Message } from 'element-ui'
Vue.use(VCharts)

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })

Vue.mixin(myMixin)
// eslint-disable-next-line no-undef
Vue.prototype.$NAME = $NAME

router.beforeEach((to, from, next) => {
  next()
  // 普通页面级别为1，配置界面为0
  if (to.fullPath === '/') {
    next()
  } else {
    let userLevel
    let pageLevel
    try {
      userLevel = JSON.parse(sessionStorage.getItem('userInfo')).level
        ? JSON.parse(sessionStorage.getItem('userInfo')).level
        : ''
      pageLevel = to.meta.level
    } catch (error) {
      console.log(error)
      // next('/')
      next()
    }

    if (userLevel <= pageLevel) {
      next()
    } else {
      Message.warning('暂无权限访问或访问地址不存在！')
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {
    // eslint-disable-next-line no-undef
    document.title = $NAME
  },
}).$mount('#app')
