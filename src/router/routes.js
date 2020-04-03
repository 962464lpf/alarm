const routes = [
  {
    path: '/alarm/summary',
    name: 'log',
    component: () => import('../pages/alarm/AlarmSummary.vue'),
    meta: {
      title: '告警汇总',
      icon: ''
    }
  },
  {
    path: '/alarm/log',
    name: 'log',
    component: () => import('../pages/alarm/CurrentAlarm.vue'),
    meta: {
      title: '实时告警',
      icon: ''
    }
  },

  {
    path: '/objmgt/safeequip',
    name: 'objmgt',
    component: () => import('../pages/objmgt/SafeEquip.vue'),
    meta: {
      title: '设备录入',
      icon: ''
    }
  },
  {
    path: '/objmgt/black',
    name: 'objmgt',
    component: () => import('../pages/objmgt/BlackList.vue'),
    meta: {
      title: '红蓝对抗',
      icon: ''
    }
  },
  {
    path: '/objmgt/white',
    name: 'objmgt',
    component: () => import('../pages/objmgt/WhiteList.vue'),
    meta: {
      title: '白名单',
      icon: ''
    }
  },
  {
    path: '/mail',
    name: 'obgmgt',
    component: () => import('../pages/Home.vue'),
    meta: {
      title: '邮件管理',
      icon: ''
    }
  }
]

export default routes
