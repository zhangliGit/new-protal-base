
import autoApp from '../img/auto_app.png'
const ConfigEnv = process.env.NODE_ENV
const adminMenu = [{
  id: '001',
  name: '平台管理',
  icon: autoApp,
  children: [{
    id: '002',
    name: '应用管理',
    children: [{
      id: '003',
      name: 'PC菜单库',
      icon: '',
      url: ConfigEnv === 'production' ? '/pc-protal/protal-admin#/menuManage' : '/protal-admin.html#/menuManage'
    },
    {
      id: '004',
      name: 'PC应用库',
      icon: '',
      url: ConfigEnv === 'production' ? '/pc-protal/protal-admin#/apply' : '/protal-admin.html#/apply'
    }, {
      id: '033',
      name: 'APP菜单库',
      icon: '',
      url: ConfigEnv === 'production' ? '/pc-protal/protal-admin#/appMenuManage' : '/protal-admin.html#/appMenuManage'
    },
    {
      id: '044',
      name: 'APP应用库',
      icon: '',
      url: ConfigEnv === 'production' ? '/pc-protal/protal-admin#/appApply' : '/protal-admin.html#/appApply'
    }
    ]
  },
  {
    id: '005',
    name: '机构管理',
    icon: '',
    url: ConfigEnv === 'production' ? '/pc-protal/protal-admin#/institute' : '/protal-admin.html#/institute'
  },
  {
    id: '006',
    name: '用户管理',
    children: [{
      id: '007',
      name: '角色管理',
      icon: '',
      url: ConfigEnv === 'production' ? '/pc-protal/protal-admin#/role' : '/protal-admin.html#/role'
    },
    {
      id: '008',
      name: '员工管理',
      icon: '',
      url: ConfigEnv === 'production' ? '/pc-protal/protal-admin#/staff' : '/protal-admin.html#/staff'
    }
    ]
  }
  ]
}]

export default adminMenu
