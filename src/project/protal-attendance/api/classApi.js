/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const classApi = {
  getShiftManage: '/shift/manage/list#post', // 列表查询
  delShiftManage: '/shift/manage/delete#delQuery', // 删除排班计划
  shiftManageDetail: '/shift/manage/detail#get', // 获取排班计划详情
  addShiftManage: '/shift/manage/save#post', // 新增
  updateShiftManage: '/shift/manage/update#post', // 更新
  addAttendanceGroup: '/attendance/group/teacher/add#post', // 新增教职工考勤组
  delAttendanceGroup: '/attendance/group/teacher/delete#delQuery', // 删除教职工考勤组
  attendanceGroupDetail: '/attendance/group/teacher/detail#get', // 获取教职工考勤组详情
  getAttendanceGroup: '/attendance/group/teacher/list#post' // 获取教职工考勤组列表
}
for (const val in classApi) {
  classApi[val] = `${hostEnv.lz_attendance}${classApi[val]}`
}
export default classApi
