// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
const Home = resolve => require(['../views/Home.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '武汉全品文教平安校园云平台'
    },
    redirect: '/Home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '武汉全品文教平安校园云平台'
        }
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
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
//     component: () => import(/* webpackChunkName: "login" */ '../views/user/Login')
//   }
// ]
const RouterMap = [...asyncRouterMap]

export default RouterMap
