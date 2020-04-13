// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
import consumer from './consumer'
import operation from './operation'
import apply from './apply'
const InstituteManage = resolve => require(['../views/institute/InstituteManage.vue'], resolve)
const InstituteDetail = resolve => require(['../views/institute/InstituteDetail.vue'], resolve)
const PanelDetail = resolve => require(['../views/operation/PanelDetail.vue'], resolve)
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/menuManage',
    children: [
      apply,

      {
        path: '/institute',
        name: 'institute',
        component: InstituteManage,
        meta: {
          title: '机构管理'
        }
      },
      {
        path: '/institute/detail',
        name: 'instituteDetail',
        component: InstituteDetail,
        meta: {
          title: '机构详情',
          isHide: true
        }
      },
      consumer,
      // operation,
      {
        path: '/panel/detail',
        name: 'panelDetail',
        component: PanelDetail,
        meta: {
          title: '应用编辑',
          isHide: true
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
//   component: () => import(/* webpackChunkName: "login" */ '../views/user/Login')
// }]

let RouterMap = [...asyncRouterMap]
if (process.env.NODE_ENV === 'development') {
  RouterMap = [...asyncRouterMap]
}

export default RouterMap
