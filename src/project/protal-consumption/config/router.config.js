// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
// import money from './moneyManage'
import accountMge from './accountManage'
// import cardManagement from './cardManagement'
import billingRecord from './billingRecord'
import systemSettings from './systemSettings'

// import trade from './tradeManage'
// import report from './reportManage'
// import consume from './consumeManage'
const Home = resolve => require(['../views/Home.vue'], resolve)
// const AccountMge = resolve => require(['../views/AccountMge.vue'], resolve)
// const OperateRecord = resolve => require(['../views/OperateRecord.vue'], resolve)
// const TypeMge = resolve => require(['../views/TypeMge.vue'], resolve)
// const SetUp = resolve => require(['../views/SetUp.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '一卡通'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '系统概览'
        }
      },
      accountMge,
      // cardManagement,
      billingRecord,
      {
        path: '/consumerMachine',
        name: 'consumerMachine',
        component: Home,
        meta: {
          title: '消费机管理'
        }
      },
      {
        path: '/stallManage',
        name: 'stallManage',
        component: Home,
        meta: {
          title: '档口管理'
        }
      },
      systemSettings
      // {
      //   path: '/accountMge',
      //   name: 'accountMge',
      //   component: AccountMge,
      //   meta: {
      //     title: '账户管理'
      //   }
      // },
      // {
      //   path: '/typeMge',
      //   name: 'typeMge',
      //   component: TypeMge,
      //   meta: {
      //     title: '卡类型管理'
      //   }
      // },
      // {
      //   path: '/setUp',
      //   name: 'setUp',
      //   component: SetUp,
      //   meta: {
      //     title: '系统设置'
      //   }
      // },
      // money,
      // trade,
      // report,
      // ...consume
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
