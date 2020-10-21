/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getAccessList: '/attendance/group/list#post', // 考勤组设置列表
  addAccess: '/attendance/group/add#post', // 新增考勤组
  updateAccess: '/attendance/group/update#post', // 修改考勤组
  // delAccess: '/attendance/group/delete#delQuery', // 删除考勤组
  delAccess: '/attendance/group/teacher/delete#delQuery', // 删除考勤组
  bindAccessUser: '/attendance/group/bind/user#post', // 考勤组添加人员
  getAccessDetail: '/attendance/group/detail#get', // 考勤组详情
  getTeaRecordStatic: '/teacher/static/index#get', // 教师考勤统计
  getStuRecordStatic: '/student/static/index#get' // 学生考勤统计
}
const exportApi = {
  exportTeaAtt: '/teacher/static/list/export#post', // 教师考勤统计导出
  exportStuAtt: '/student/static/list/export#post', // 学生考勤统计导出
  exportStuAttRec: '/student/static/record/list/export#post' // 学生考勤记录导出
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.lz_attendance}${homeApi[val]}`
}
for (const val in exportApi) {
  exportApi[val] = `${hostEnv.ljj_attendance}${exportApi[val]}`
}
export default {
  ...homeApi,
  ...exportApi,
  exportTeaLea: `${hostEnv.zk_leave}/teacher/leave/export#export`, // 教职工请假导出
  exportStuLea: `${hostEnv.zk_leave}/student/leave/export#export` // 学生请假导出
}
