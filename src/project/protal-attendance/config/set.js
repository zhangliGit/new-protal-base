// 系统表单
import { RouteView } from '../layouts'
const StudentAttendanceSet = resolve => require(['../views/setAttendance/StudentAttendanceSet.vue'], resolve)
const TeacherAccessSet = resolve => require(['../views/setAttendance/TeacherAccessSet.vue'], resolve)
const SetGroup = resolve => require(['../views/setAttendance/SetGroup.vue'], resolve)
const set = {
  path: '/teacherAccessSet',
  name: 'teacherAccessSet',
  component: RouteView,
  meta: {
    title: '考勤组设置'
  },
  children: [
    {
      path: '/teacherAccessSet',
      name: 'teacherAccessSet',
      component: TeacherAccessSet,
      meta: {
        title: '教职工考勤'
      }
    },
    {
      path: '/teacherAccessSet/setGroup',
      name: 'setGroup',
      component: SetGroup,
      meta: {
        title: '考勤组管理'
      },
      hidden: true
    },
    {
      path: '/studentAttendanceSet',
      name: 'studentAttendanceSet',
      component: StudentAttendanceSet,
      meta: {
        title: '学生考勤'
      }
    },
    {
      path: '/studentAttendanceSet/setGroup',
      name: 'setGroup',
      component: SetGroup,
      meta: {
        title: '考勤组管理'
      },
      hidden: true
    }
  ]
}

export default set
