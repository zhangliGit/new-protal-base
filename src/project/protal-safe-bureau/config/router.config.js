// eslint-disable-next-line
import {
  BasicLayout
} from '../layouts'
const SchoolDanger = resolve => require(['../views/dangerManage/SchoolDanger.vue'], resolve)
const ReportDangers = resolve => require(['../views/dangerManage/ReportDangers.vue'], resolve)
const ViewDangers = resolve => require(['../views/dangerManage/ViewDangers.vue'], resolve)
const RectificationNotice = resolve => require(['../views/dangerManage/RectificationNotice.vue'], resolve)
const EidtRectificationNotice = resolve => require(['../views/dangerManage/EidtRectificationNotice.vue'], resolve)

export const asyncRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: {
    title: '隐患管理'
  },
  redirect: '/schoolDanger',
  children: [
    {
      path: '/schoolDanger',
      name: 'schoolDanger',
      component: SchoolDanger,
      meta: {
        title: '隐患管理'
      }
    },
    {
      path: '/accountList/reportDangers',
      name: 'reportDangers',
      component: ReportDangers,
      meta: {
        title: '上报隐患',
        isHide: true
      }
    },
    {
      path: '/accountList/viewDangers',
      name: 'viewDangers',
      component: ViewDangers,
      meta: {
        title: '查看隐患',
        isHide: true
      }
    },
    {
      path: '/accountList/rectificationNotice',
      name: 'rectificationNotice',
      component: RectificationNotice,
      meta: {
        title: '整改通知书',
        isHide: true
      }
    },
    {
      path: '/accountList/eidtRectificationNotice',
      name: 'eidtRectificationNotice',
      component: EidtRectificationNotice,
      meta: {
        title: '编辑整改通知书',
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
//   component: () => import(/* webpackChunkName: "login" */ '@/views/user/Login')
// }]

let RouterMap = [...asyncRouterMap]
if (process.env.NODE_ENV === 'development') {
  RouterMap = [...asyncRouterMap]
}

export default RouterMap
