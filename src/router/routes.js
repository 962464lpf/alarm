const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../pages/user/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/user/Register.vue'),
  },
  {
    path: '/edituser',
    name: 'edituser',
    component: () => import('../pages/user/Login.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../pages/home/Home.vue'),
    meta: {
      title: '趋势统计',
      icon: 'qushitongji',
      level: 1,
    },
  },
  // {
  //   path: '/newindex',
  //   name: 'newindex',
  //   component: () => import('../pages/home/NewHome.vue'),
  //   meta: {
  //     title: '新趋势统计',
  //     icon: 'el-icon-s-home',
  //     level: 1
  //   }
  // },
  {
    path: '/alarm/summary',
    name: 'log',
    component: () => import('../pages/alarm/AlarmSummary.vue'),
    meta: {
      title: '告警汇总',
      icon: 'huizong',
      level: 1,
    },
  },
  {
    path: '/alarm/log',
    name: 'log',
    component: () => import('../pages/alarm/CurrentAlarm.vue'),
    meta: {
      title: '实时告警',
      icon: 'shishi',
      level: 1,
    },
  },

  {
    path: '/safeequip',
    name: 'safeequip',
    component: () => import('../pages/equip/SafeEquip.vue'),
    meta: {
      title: '设备录入',
      icon: 'luru',
      level: 1,
    },
  },
  {
    path: '/whitelist',
    name: 'whitelist',
    component: () => import('../pages/white/WhiteList.vue'),
    meta: {
      title: '白名单',
      icon: 'baimingdan',
      level: 1,
    },
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
    path: '/retcoun',
    name: 'retcoun',
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '溯源反制',
      icon: 'suyuan',
      level: 1,
    },
    children: [
      {
        path: '/retcoun/beef',
        name: 'beef',
        component: () => import('../pages/beef/Beef.vue'),
        meta: {
          title: 'Beef',
          icon: 'el-icon-document',
          level: 1,
        },
      },
    ],
  },
  {
    path: '/redblue',
    name: 'redblue',
    component: () => import('../pages/redblue/RedBlue.vue'),
    meta: {
      title: '红蓝对抗',
      icon: 'duikang',
      level: 1,
    },
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../pages/order/Order.vue'),
    meta: {
      title: '工单管理',
      icon: 'el-icon-s-order',
      level: 1,
    },
  },
  {
    path: '/blocked',
    name: 'blocked',
    // component: () => import('../pages/blockedIP/BlockedIP.vue'),
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '封禁管理',
      icon: 'fengjin',
      level: 1,
    },
    children: [
      {
        path: '/blocked/list',
        name: 'list',
        component: () => import('../pages/blockedIP/BlockedIP.vue'),
        meta: {
          title: '封禁列表',
          icon: 'fengjin',
          level: 1,
        },
      },
      {
        path: '/blocked/firewall',
        name: 'list',
        component: () => import('../pages/blockedIP/Firewall.vue'),
        meta: {
          title: '防火墙管理',
          icon: 'fengjin',
          level: 1,
        },
      },
    ],
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '报告管理',
      icon: 'el-icon-document',
      level: 1,
    },
    children: [
      {
        path: '/report/report',
        name: 'report',
        component: () => import('../pages/report/Report.vue'),
        meta: {
          title: '日报周报',
          icon: '',
          level: 1,
        },
      },
      // {
      //   path: '/report/assets',
      //   name: 'report',
      //   component: () => import('../pages/report/AssetsEntry.vue'),
      //   meta: {
      //     title: '受保护资产',
      //     icon: '',
      //     level: 1,
      //   },
      // },
    ],
  },

  {
    path: '/network',
    name: '网络配置',
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '网络配置',
      icon: 'wangluo',
      level: 0,
    },
    children: [
      {
        path: '/network/networkManage',
        name: 'networkManage',
        component: () => import('../pages/network/NetworkManage.vue'),
        meta: {
          title: '网络管理',
          icon: 'el-icon-document',
          level: 0,
        },
      },
      {
        path: '/network/phyInterface',
        name: 'phyInterface',
        component: () => import('../pages/network/PhyInterface.vue'),
        meta: {
          title: '物理接口',
          icon: 'el-icon-document',
          level: 0,
        },
      },
      {
        path: '/network/staticroute',
        name: 'staticroute',
        component: () => import('../pages/network/Staticroute.vue'),
        meta: {
          title: '静态路由',
          icon: 'el-icon-document',
          level: 0,
        },
      },
      {
        path: '/network/ARP',
        name: 'ARP',
        component: () => import('../pages/network/ARP.vue'),
        meta: {
          title: 'ARP表',
          icon: 'el-icon-document',
          level: 0,
        },
      },
    ],
  },

  {
    path: '/tools',
    name: 'tools',
    component: () => import('../pages/diagnostictools/Tools.vue'),
    meta: {
      title: '诊断工具',
      icon: 'zhenduan',
      level: 1,
    },
  },
  {
    path: '/sys',
    name: 'sux',
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '系统设置',
      icon: 'el-icon-setting',
      level: 0,
    },
    children: [
      {
        path: '/sys/mail',
        name: 'mail',
        component: () => import('../pages/sys/Mail.vue'),
        meta: {
          title: '邮件管理',
          icon: 'el-icon-document',
          level: 0,
        },
      },
      {
        path: '/sys/user',
        name: 'user',
        component: () => import('../pages/sys/User.vue'),
        meta: {
          title: '用户管理',
          icon: 'el-icon-document',
          level: 0,
        },
      },
      {
        path: '/sys/inside',
        name: 'inside',
        component: () => import('../pages/sys/Inside.vue'),
        meta: {
          title: '资产管理',
          icon: 'el-icon-document',
          level: 0,
        },
      },
      {
        path: '/sys/schedule',
        name: 'schedule',
        component: () => import('../pages/sys/Schedule.vue'),
        meta: {
          title: '排班管理',
          icon: 'el-icon-document',
          level: 0,
        },
      },
      // {
      //   path: '/sys/setting',
      //   name: 'setting',
      //   component: () => import('../pages/sys/SysSetting.vue'),
      //   meta: {
      //     title: '系统配置',
      //     icon: 'el-icon-document',
      //     level: 0
      //   }
      // }
    ],
  },
]

export default routes
