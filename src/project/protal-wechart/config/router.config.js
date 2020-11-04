// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
import notice from './notice'

const Home = resolve => require(['../views/Home.vue'], resolve)
const Template = resolve => require(['../views/Template.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/home',
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
        path: '/template',
        name: 'template',
        component: Template,
        meta: {
          title: '模板页'
        }
      },
      notice
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

let RouterMap = [...asyncRouterMap]
if (process.env.NODE_ENV === 'development') {
  RouterMap = [...asyncRouterMap]
}

export default RouterMap
