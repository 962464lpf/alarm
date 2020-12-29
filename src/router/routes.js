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
      id: 0,
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
      id: 62,
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
      id: 68,
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
      id: 77,
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
      id: 81,
    },
  },
  {
    path: '/redblue',
    name: 'redblue',
    component: () => import('../pages/redblue/RedBlue.vue'),
    meta: {
      title: '红蓝对抗',
      icon: 'duikang',
      level: 1,
      id: 82,
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
      id: 84,
    },
  },
  {
    path: '/retcoun',
    name: 'retcoun',
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '溯源反制',
      icon: 'suyuan',
      level: 1,
      id: 0,
    },
    children: [
      {
        path: '/retcoun/beef',
        name: 'beef',
        component: () => import('../pages/suyuanfanzhi/Beef.vue'),
        meta: {
          title: 'Beef',
          icon: 'el-icon-document',
          level: 1,
          id: 0,
        },
      },
      {
        path: '/retcoun/identity',
        name: 'beef',
        component: () => import('../pages/suyuanfanzhi/Identity.vue'),
        meta: {
          title: '身份溯源',
          icon: 'el-icon-document',
          level: 1,
          id: 0,
        },
      },
      {
        path: '/retcoun/counterattack',
        name: '攻击者反制',
        component: () => import('../pages/suyuanfanzhi/Counterattack.vue'),
        meta: {
          title: '攻击者反制',
          icon: 'el-icon-document',
          level: 1,
          id: 0,
        },
      },
    ],
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
      id: [87, 89],
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
          id: 87,
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
          id: 89,
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
      id: [93],
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
          id: 93,
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
      id: [97, 101, 102, 103],
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
          id: 97,
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
          id: 101,
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
          id: 102,
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
          id: 103,
        },
      },
      {
        path: '/network/tools',
        name: 'tools',
        component: () => import('../pages/diagnostictools/Tools.vue'),
        meta: {
          title: '诊断工具',
          icon: 'zhenduan',
          level: 1,
        },
      },
    ],
  },

  {
    path: '/sys',
    name: 'sys',
    component: () => import('../components/layout/RouterView.vue'),
    meta: {
      title: '系统设置',
      icon: 'el-icon-setting',
      level: 0,
      id: [110, 115, 106, 72, 108],
    },
    children: [
      {
        path: '/sys/account',
        name: 'account',
        component: () => import('../pages/sys/Account.vue'),
        meta: {
          title: '账号管理',
          icon: 'el-icon-document',
          level: 0,
          id: 110,
        },
      },
      {
        path: '/sys/role',
        name: 'role',
        component: () => import('../pages/sys/Role.vue'),
        meta: {
          title: '角色管理',
          icon: 'el-icon-document',
          level: 0,
          id: 115,
        },
      },
      {
        path: '/sys/mail',
        name: 'mail',
        component: () => import('../pages/sys/Mail.vue'),
        meta: {
          title: '邮件管理',
          icon: 'el-icon-document',
          level: 0,
          id: 106,
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
          id: 72,
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
          id: 108,
        },
      },
    ],
  },
]

export default routes
