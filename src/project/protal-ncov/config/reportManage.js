import { RouteView } from '../layouts'
const ReportManageStu = resolve => require(['../views/reportManage/ReportManageStu.vue'], resolve)
const ReportManageTea = resolve => require(['../views/reportManage/ReportManageTea.vue'], resolve)
const ReportManageOther = resolve => require(['../views/reportManage/ReportManageOther.vue'], resolve)
const menu = {
  path: '/reportManage',
  name: '/reportManage',
  component: RouteView,
  redirect: '/reportManageTea',
  meta: {
    title: '上报记录',
    icon: 'folder-open'
  },
  children: [
    {
      path: '/reportManageTea',
      name: 'reportManageTea',
      component: ReportManageTea,
      meta: {
        title: '教职工',
        icon: 'folder-open'
      }
    },
    {
      path: '/reportManageStu',
      name: 'reportManageStu',
      component: ReportManageStu,
      meta: {
        title: '学生',
        icon: 'folder-open'
      }
    },
    {
      path: '/reportManageOther',
      name: 'reportManageOther',
      component: ReportManageOther,
      meta: {
        title: '陌生人',
        icon: 'folder-open'
      }
    },
  ]
}

export default menu
