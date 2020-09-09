// eslint-disable-next-line
import {
  BasicLayout,
  RouteView
} from '../layouts'
// 隐患管理
const SchoolDanger = resolve => require(['../views/dangerManage/SchoolDanger.vue'], resolve)
const ReportDangers = resolve => require(['../views/dangerManage/ReportDangers.vue'], resolve)
const ViewDangers = resolve => require(['../views/dangerManage/ViewDangers.vue'], resolve)
const RectificationNotice = resolve => require(['../views/dangerManage/RectificationNotice.vue'], resolve)
const EidtRectificationNotice = resolve => require(['../views/dangerManage/EidtRectificationNotice.vue'], resolve)
// 专项检查
const AddCheckItem = resolve => require(['../views/specialInspection/AddCheckItem.vue'], resolve)
const TaskRecord = resolve => require(['../views/specialInspection/TaskRecord.vue'], resolve)
const CheckItem = resolve => require(['../views/specialInspection/CheckItem.vue'], resolve)
const AddSpecialItem = resolve => require(['../views/specialInspection/AddSpecialItem.vue'], resolve)
const Views = resolve => require(['../views/specialInspection/Views.vue'], resolve)
const ViewsReport = resolve => require(['../views/specialInspection/ViewsReport.vue'], resolve)
// 安全事故
const SafetyIncident = resolve => require(['../views/safetyIncident/SafetyIncident.vue'], resolve)
const AccidentDetail = resolve => require(['../views/safetyIncident/AccidentDetail.vue'], resolve)

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
    },
    {
      path: '/specialInspection',
      name: 'specialInspection',
      component: RouteView,
      meta: {
        title: '专项检查'
      },
      children: [
        {
          path: '/taskRecord',
          name: 'taskRecord',
          component: TaskRecord,
          meta: {
            title: '任务记录'
            // isHide: true
          }
        },
        {
          path: '/checkItem',
          name: 'checkItem',
          component: CheckItem,
          meta: {
            title: '检查项目'
          }
        },
        {
          path: '/specialInspection/addSpecialItem',
          name: 'addSpecialItem',
          component: AddSpecialItem,
          meta: {
            title: '添加专项检查',
            isHide: true
          }
        },
        {
          path: '/specialInspection/views',
          name: 'views',
          component: Views,
          meta: {
            title: '查看',
            isHide: true
          }
        },
        {
          path: '/specialInspection/viewsReport',
          name: 'viewsReport',
          component: ViewsReport,
          meta: {
            title: '查看报告',
            isHide: true
          }
        }
        // {
        //   path: '/specialInspection/views',
        //   name: 'views',
        //   component: Views,
        //   meta: {
        //     title: '查看',
        //     isHide: true
        //   }
        // },

      ]
    },
    {
      path: '/safetyIncident',
      name: 'safetyIncident',
      component: SafetyIncident,
      meta: {
        title: '安全事故'
      }
    },
    {
      path: '/safetyIncident/specialDetail',
      name: 'specialDetail',
      component: AccidentDetail,
      meta: {
        title: '查看事故详情',
        isHide: true
      }
    },
    {
      path: '/safetyTask',
      name: 'safetyTask',
      component: RouteView,
      meta: {
        title: '安全任务'
      },
      children: [
        {
          path: '/taskIssuance',
          name: 'taskIssuance',
          component: TaskRecord,
          meta: {
            title: '任务下发'
            // isHide: true
          }
        },
        {
          path: '/taskTemplate',
          name: 'taskTemplate',
          component: CheckItem,
          meta: {
            title: '任务模板'
          }
        },
        {
          path: '/specialInspection/addCheck',
          name: 'addCheck',
          component: AddCheckItem,
          meta: {
            title: '添加专项检查',
            isHide: true
          }
        },
        {
          path: '/specialInspection/views',
          name: 'views',
          component: Views,
          meta: {
            title: '查看',
            isHide: true
          }
        },
        {
          path: '/specialInspection/viewsReport',
          name: 'viewsReport',
          component: ViewsReport,
          meta: {
            title: '查看报告',
            isHide: true
          }
        }
        // {
        //   path: '/specialInspection/views',
        //   name: 'views',
        //   component: Views,
        //   meta: {
        //     title: '查看',
        //     isHide: true
        //   }
        // },

      ]
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
