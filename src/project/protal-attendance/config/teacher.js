// 系统表单
import { RouteView } from '../layouts'
const TeacherRecord = resolve => require(['../views/teacherAttendance/TeacherRecord.vue'], resolve)
const TeacherStatistics = resolve => require(['../views/teacherAttendance/TeacherStatistics.vue'], resolve)
const StudentStatisticsDetail = resolve => require(['../views/studentAttendance/StudentStatisticsDetail.vue'], resolve)
const teacher = {
  path: '/teacherRecord',
  name: 'teacherRecord',
  component: RouteView,
  meta: {
    title: '教职工考勤'
  },
  children: [
    {
      path: '/teacherRecord',
      name: 'teacherRecord',
      component: TeacherRecord,
      meta: {
        title: '考勤记录'
      }
    },
    {
      path: '/teacherStatistics',
      name: 'teacherStatistics',
      component: TeacherStatistics,
      meta: {
        title: '考勤统计'
      }
    },
    {
      path: '/teacherStatistics/detail',
      name: 'teacherStatisticsDetail',
      component: StudentStatisticsDetail,
      meta: {
        title: '统计详情',
        isHide: true
      }
    }
  ]
}

export default teacher
