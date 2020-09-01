// eslint-disable-next-line
import { BasicLayout } from '../layouts'
const Home = resolve => require(['../views/Home.vue'], resolve)
const SchoolNotice = resolve => require(['../views/news/SchoolNotice.vue'], resolve)
const SchoolNews = resolve => require(['../views/news/SchoolNews.vue'], resolve)
const Addnews = resolve => require(['../views/news/Addnews.vue'], resolve)
const Addnotice = resolve => require(['../views/news/Addnotice.vue'], resolve)
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '信息发布'
    },
    redirect: '/schoolNews',
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: Home,
      //   meta: {
      //     title: '首页'
      //   }
      // },
      {
        path: '/schoolNews',
        name: 'schoolNews',
        component: SchoolNews,
        meta: {
          title: '学校新闻'
        }
      },
      {
        path: '/schoolNews/Addnews',
        name: 'addnews',
        component: Addnews,
        meta: {
          title: '发布新闻'
        },
        hidden: true
      },
      {
        path: '/schoolNotice',
        name: 'schoolNotice',
        component: SchoolNotice,
        meta: {
          title: '通知公告'
        }
      },
      {
        path: '/schoolNotice/Addnotice',
        name: 'addnotice',
        component: Addnotice,
        meta: {
          title: '发布公告'
        },
        hidden: true
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
