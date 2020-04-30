// eslint-disable-next-line
import { BasicLayout } from '../layouts'
import reportManage from './reportManage'
import healthManage from './healthManage'
import organize from './organize'
const Home = resolve => require(['../views/Home.vue'], resolve)
const DailyReport = resolve => require(['../views/dailyReport/DailyReport.vue'], resolve)
const SetUp = resolve => require(['../views/setUp/SetUp.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '系统首页' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '疫情预览',
          icon: 'bar-chart'
        }
      },
      {
        path: '/dailyReport',
        name: 'dailyReport',
        component: DailyReport,
        meta: {
          title: '疫情日报',
          icon: 'calendar'
        }
      },
      reportManage,
      healthManage,
      {
        path: '/setUp',
        name: 'setUp',
        component: SetUp,
        meta: {
          title: '系统设置',
          icon: 'menu-fold'
        }
      },
      organize
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
// const constantRouterMap = [
//   {
//     path: '',
//     name: 'login',
//     component: () => import('../views/user/Login')
//   }
// ]
let RouterMap
if (process.env.VUE_APP_URL === 'prod') {
  RouterMap = [...asyncRouterMap]
} else {
  RouterMap = [...asyncRouterMap]
}

export default RouterMap
