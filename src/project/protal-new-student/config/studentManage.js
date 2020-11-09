// 新生管理
import { RouteView } from '../layouts'
const StudentList = resolve => require(['../views/NewStudentManage/StudentManage.vue'], resolve)
const StudentDetails = resolve => require(['../views/NewStudentManage/StudentDetails.vue'], resolve)
const studentManage = {
  path: '/studentManage',
  name: 'studentManage',
  component: RouteView,
  meta: {
    title: '迎新管理'
  },
  children: [
    {
      path: '/studentManage',
      name: 'studentManage',
      component: StudentList,
      meta: {
        title: '新生管理'
      }
    },
    {
      path: '/studentManage/studentDetails',
      name: 'studentDetails',
      component: StudentDetails,
      meta: {
        title: '新生详情',
        isHide: true
      }
    }
  ]
}

export default studentManage
