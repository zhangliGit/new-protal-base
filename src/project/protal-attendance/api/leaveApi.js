/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getTeachersLeave: '/teacher/leave/list#post', // 教职工请假列表
  teachersLeaveProcess: '/leaveApprove#get', // 教职工请假审批流程
  getStudentsLeave: '/teacherLeave#get', // 学生请假列表
  studentsLeaveProcess: '/leaveApprove#get', // 学生请假审批流程
  getLeaveDetail: '/teacher/leave/detailById#getUrl' // 请假详情
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.zhangkun}${homeApi[val]}`
}
export default homeApi
