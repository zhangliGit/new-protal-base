// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
import sitebooking from './siteBooking'
import meetBooking from './meetBooking'
import studyGround from './studyGround'
import activityBooking from './activityBooking'
const Home = resolve => require(['../views/Home.vue'], resolve)
const Register = resolve => require(['../views/GoodsManage/register.vue'], resolve)
const Guarantee = resolve => require(['../views/GoodsManage/guarantee.vue'], resolve)
const Collect = resolve => require(['../views/GoodsManage/collect.vue'], resolve)
const Record = resolve => require(['../views/SubstituteClass/record.vue'], resolve)
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: 'OA办公'
    },
    redirect: '/register',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/register',
        name: '/register',
        component: RouteView,
        meta: {
          title: '物品管理'
        },
        children: [
          {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
              title: '物品登记'
            }
          },
          {
            path: '/guarantee',
            name: 'guarantee',
            component: Guarantee,
            meta: {
              title: '物品报修'
            }
          },
          {
            path: '/collect',
            name: 'collect',
            component: Collect,
            meta: {
              title: '物品领用'
            }
          }
        ]
      },
      {
        path: '/record',
        name: 'record',
        component: Record,
        meta: {
          title: '调代课记录'
        }
      },
      sitebooking,
      meetBooking,
      activityBooking,
      studyGround
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
