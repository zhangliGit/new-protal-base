/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getTeachersLeave: '/teacherLeave#get', // 教职工请假列表
  teachersLeaveProcess: '/leaveApprove#get', // 教职工请假审批流程
  getStudentsLeave: '/teacherLeave#get', // 学生请假列表
  studentsLeaveProcess: '/leaveApprove#get', // 学生请假审批流程
  getTechnicalDate: '/technicalDate#get', // 考勤组设置特殊日期
  getTeachersAccessSet: '/teacherAccessSet#get', // 考勤组设置教师
  getStudentsAccessSet: '/studentAccessSet#get' // 考勤组设置学生
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv}${homeApi[val]}`
}
export default homeApi
