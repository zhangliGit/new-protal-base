// eslint-disable-next-line
import {
  BasicLayout,
  RouteView
} from '../layouts'
import safeDataStatis from './safeDataStatis'
export const asyncRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: {
    title: '首页'
  },
  redirect: '/dailyStatis',
  children: [
    safeDataStatis,
    {
      path: '/safetyRating',
      name: 'safetyRating',
      component: () => import('../views/SafetyRating.vue'),
      meta: {
        title: '安全评分'
      }
    },
    {
      path: '/safetyReport',
      name: 'safetyReport',
      component: () => import('../views/SafetyReport.vue'),
      meta: {
        title: '安全报告'
      }
    }
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
