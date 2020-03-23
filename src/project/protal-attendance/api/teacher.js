/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const teacherApi = {
  getTeacherRecord: '/teacher/record#get', // 老师考勤记录
  getTeacherOperate: '/teacher/operate/record#get', // 老师考勤操作记录
  getTeacherStatistics: '/teacher/statistics#get', // 老师考勤统计
  getTeacherDetail: '/teacher/statistics/detail#get', // 老师考勤统计详情
  getStudentRecord: '/student/record#get', // 学生考勤记录
  getStudentStatistics: '/student/statistics#get', // 学生考勤统计
  getTeacherInfo: '/teacher/record/info#get', // 教职工考勤记录基本信息
  getStudentInfo: '/student/record/info#get', // 学生考勤记录基本信息
  getStudentOperate: '/student/operate/record#get', // 学生考勤操作记录
  getStudentDetail: '/student/statistics/detail#get' // 学生考勤统计详情
}
for (const val in teacherApi) {
  teacherApi[val] = `${hostEnv}${teacherApi[val]}`
}
export default teacherApi
