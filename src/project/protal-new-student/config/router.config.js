// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
import studentTask from './studentTask'
import studentApply from './studentApply'
// const Home = resolve => require(['../views/Home.vue'], resolve)
const HomePage = resolve => require(['../views/HomePage/HomePage.vue'], resolve)
const RecruitSetting = resolve => require(['../views/RecruitSetting/RecruitSetting.vue'], resolve)
const MessageSetting = resolve => require(['../views/MessageSetting/MessageSetting.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomePage,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/setting',
        name: 'setting',
        component: RecruitSetting,
        meta: {
          title: '招生设置'
        }
      },
      {
        path: '/messageSetting',
        name: 'messageSetting',
        component: MessageSetting,
        meta: {
          title: '信息设置'
        }
      },
      studentTask,
      studentApply
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
// const constantRouterMap = [{
//   path: '',
//   name: 'login',
//   component: () => import(/* webpackChunkName: "login" */ '@/views/user/Login')
// }]

let RouterMap = [...asyncRouterMap]
if (process.env.NODE_ENV === 'development') {
  RouterMap = [...asyncRouterMap]
}

export default RouterMap
