// 系统表单
import { RouteView } from '../layouts'
const StudentApply = resolve => require(['../views/TaskManage/StudentApply.vue'], resolve)
const ApplyDetails = resolve => require(['../views/TaskManage/ApplyDetails.vue'], resolve)
const studentApply = {
  path: '/studentApply',
  name: '/studentApply',
  component: RouteView,
  meta: {
    title: '新生申请'
  },
  children: [
    {
      path: '/studentApply',
      name: 'studentApply',
      component: StudentApply,
      meta: {
        title: '新生申请'
      }
    },
    {
      path: '/studentApply/applyDetails',
      name: 'applyDetails',
      component: ApplyDetails,
      meta: {
        title: '申请详情',
        isHide: true
      }
    }
  ]
}

export default studentApply
