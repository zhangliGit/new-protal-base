// eslint-disable-next-line
import {
  BasicLayout,
  RouteView
} from '../layouts'
const Home = resolve => require(['../views/Home.vue'], resolve)
const Template = resolve => require(['../views/child/Template.vue'], resolve)
const ChildOne = resolve => require(['../views/child/ChildOne'], resolve)
const ChildTwo = resolve => require(['../views/child/ChildTwo'], resolve)
const ChildThree = resolve => require(['../views/child/ChildThree'], resolve)
const ChildFour = resolve => require(['../views/child/ChildFour'], resolve)
const ChildFive = resolve => require(['../views/child/ChildFive'], resolve)
export const asyncRouterMap = [{
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '收银台'
        }
      },
      {
        path: '/template',
        name: 'template',
        component: Template,
        meta: {
          title: '批次收银'
        }
      },
      {
        path: '/childOne',
        name: 'childOne',
        component: ChildOne,
        meta: {
          title: '账单列表'
        }
      },
      {
        path: '/childOne/detial',
        name: 'childDetail',
        component: ChildDetail,
        meta: {
          title: '界面详情',
          isHide: true
        },
        hidden: true
      },
      {
        path: '/childTwo',
        name: 'childTwo',
        component: ChildTwo,
        meta: {
          title: '批次管理'
        }
      }, {
        path: '/childThree',
        name: 'childThree',
        component: ChildThree,
        meta: {
          title: '回收站'
        }
      }, {
        path: '/childFour',
        name: 'childFour',
        component: ChildFour,
        meta: {
          title: '收费事项管理'
        }
      },{
        path: '/childFive',
        name: 'childFive',
        component: ChildFive,
        meta: {
          title: '项目管理'
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

let RouterMap = [...asyncRouterMap]
if (process.env.NODE_ENV === 'development') {
  RouterMap = [...asyncRouterMap]
}

export default RouterMap