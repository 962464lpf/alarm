const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../pages/user/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/user/Login.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../pages/home/Home.vue'),
    meta: {
      title: '首页',
      icon: 'el-icon-document'
    }
  },
  {
    path: '/alarm/summary',
    name: 'log',
    component: () => import('../pages/alarm/AlarmSummary.vue'),
    meta: {
      title: '告警汇总',
      icon: 'el-icon-document'
    }
  },
  {
    path: '/alarm/log',
    name: 'log',
    component: () => import('../pages/alarm/CurrentAlarm.vue'),
    meta: {
      title: '实时告警',
      icon: 'el-icon-document'
    }
  },

  {
    path: '/safeequip',
    name: 'safeequip',
    component: () => import('../pages/equip/SafeEquip.vue'),
    meta: {
      title: '设备录入',
      icon: 'el-icon-document'
    }
  },
  {
    path: '/whitelist',
    name: 'whitelist',
    component: () => import('../pages/white/WhiteList.vue'),
    meta: {
      title: '白名单',
      icon: 'el-icon-document'
    }
  },
  // {
  //   path: '/objmgt/black',
  //   name: 'objmgt',
  //   component: () => import('../pages/objmgt/BlackList.vue'),
  //   meta: {
  //     title: '重点监控',
  //     icon: 'el-icon-document'
  //   }
  // },
  {
    path: '/redblue',
    name: 'redblue',
    component: () => import('../pages/redblue/RedBlue.vue'),
    meta: {
      title: '红蓝对抗',
      icon: 'el-icon-document'
    }
  },
  {
    path: '/sys',
    name: 'sux',
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '系统设置',
      icon: 'el-icon-document'
    },
    children: [
      {
        path: '/sys/mail',
        name: 'obgmgt',
        component: () => import('../pages/sys/Mail.vue'),
        meta: {
          title: '邮件管理',
          icon: 'el-icon-document'
        }
      },
      {
        path: '/sys/alarmSource',
        name: 'obgmgt',
        component: () => import('../pages/sys/AlarmSource.vue'),
        meta: {
          title: '告警源',
          icon: 'el-icon-document'
        }
      }
    ]
  }
]

export default routes
