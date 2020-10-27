// 系统表单
// import { RouteView } from '../layouts'
const StudentApply = resolve => require(['../views/NewStudentManage/StudentApply.vue'], resolve)
const ApplyDetails = resolve => require(['../views/NewStudentManage/ApplyDetails.vue'], resolve)
const meetBooking = {
  path: '/studentApply',
  name: '/studentApply',
  component: StudentApply,
  meta: {
    title: '新生申请'
  },
  children: [
    {
      path: '/meetBooking',
      name: 'meetBooking',
      component: ApplyDetails,
      meta: {
        title: '申请详情'
      }
    }
  ]
}

export default meetBooking
