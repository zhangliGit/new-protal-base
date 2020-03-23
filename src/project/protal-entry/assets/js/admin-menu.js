
import autoApp from '../img/auto_app.png'
const ConfigEnv = process.env.VUE_APP_URL
const adminMenu = [{
  id: '001',
  name: '平台管理',
  icon: autoApp,
  children: [{
    id: '002',
    name: '应用管理',
    children: [{
      id: '003',
      name: '菜单库',
      icon: '',
      url: ConfigEnv === 'prod' ? '/pc-protal/protal-admin/index.html#/menuManage' : '/protal-admin.html#/menuManage'
    },
    {
      id: '004',
      name: '应用库',
      icon: '',
      url: ConfigEnv === 'prod' ? '/pc-protal/protal-admin/index.html#/apply' : '/protal-admin.html#/apply'
    }
    ]
  },
  {
    id: '005',
    name: '机构管理',
    icon: '',
    url: ConfigEnv === 'prod' ? '/pc-protal/protal-admin/index.html#/institute' : '/protal-admin.html#/institute'
  },
  {
    id: '006',
    name: '用户管理',
    children: [{
      id: '007',
      name: '角色管理',
      icon: '',
      url: ConfigEnv === 'prod' ? '/pc-protal/protal-admin/index.html#/role' : '/protal-admin.html#/role'
    },
    {
      id: '008',
      name: '员工管理',
      icon: '',
      url: ConfigEnv === 'prod' ? '/pc-protal/protal-admin/index.html#/staff' : '/protal-admin.html#/staff'
    }
    ]
  }
  ]
}]

export default adminMenu
