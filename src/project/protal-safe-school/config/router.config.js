import {
  BasicLayout
} from '../layouts'
import safetyArchive from './safetyArchive'
import safetyInspect from './safetyInspect'
import danger from './danger'

export const asyncRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: {
    title: '首页'
  },
  redirect: '/fireArchive',
  children: [
    safetyArchive,
    safetyInspect,
    danger
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
