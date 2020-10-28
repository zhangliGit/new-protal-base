// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
// const Home = resolve => require(['../views/Home.vue'], resolve)
const HomePage = resolve => require(['../views/HomePage/HomePage.vue'], resolve)
const TaskManage = resolve => require(['../views/TaskManage/TaskManage.vue'], resolve)
const StudentApply = resolve => require(['../views/TaskManage/StudentApply.vue'], resolve)
const StudentManage = resolve => require(['../views/NewStudentManage/StudentManage.vue'], resolve)
const StudentClasses = resolve => require(['../views/NewStudentManage/StudentCLasses.vue'], resolve)
const DeviceManege = resolve => require(['../views/DeviceManege/DeviceManege.vue'], resolve)

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
        path: '/studentTask',
        name: 'studentTask',
        component: TaskManage,
        meta: {
          title: '招生任务'
        }
      },
      {
        path: '/studentApply',
        name: 'studentApply',
        component: StudentApply,
        meta: {
          title: '新生申请'
        }
      },
      {
        path: '/studentManage',
        name: 'studentManage',
        component: StudentManage,
        meta: {
          title: '新生管理'
        }
      },
      {
        path: '/studentClasses',
        name: 'studentClasses',
        component: StudentClasses,
        meta: {
          title: '新生分班'
        }
      },
      {
        path: '/deviceManage',
        name: 'deviceManage',
        component: DeviceManege,
        meta: {
          title: '设备管理'
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