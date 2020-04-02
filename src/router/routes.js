const routes = [
  {
    path: '/alarm',
    name: 'alarm',
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '告警',
      icon: ''
    },
    children: [
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
      }
    ]
  },
  {
    path: '/objmgt',
    name: 'objmgt',
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '对象管理',
      icon: ''
    },
    children: [
      {
        path: '/objmgt/safeequip',
        name: 'objmgt',
        component: () => import('../pages/objmgt/SafeEquip.vue'),
        meta: {
          title: '安全设备',
          icon: ''
        }
      },
      {
        path: '/objmgt/black',
        name: 'objmgt',
        component: () => import('../pages/objmgt/BlackList.vue'),
        meta: {
          title: '黑名单',
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
      }
    ]
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
