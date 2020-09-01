import { RouteView } from '../layouts'
const DangerGroup = resolve => require(['../views/DangerManage/DangerGroup.vue'], resolve)
const DangerClass = resolve => require(['../views/DangerManage/DangerClass.vue'], resolve)
const DangerFind = resolve => require(['../views/DangerManage/DangerFind.vue'], resolve)
const DangerSupervise = resolve => require(['../views/DangerManage/DangerSupervise.vue'], resolve)
const AddFind = resolve => require(['../views/DangerManage/AddFind.vue'], resolve)

const danger = {
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
}

export default danger
