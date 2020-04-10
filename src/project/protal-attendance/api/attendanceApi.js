/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getAccessList: '/attendance/group/list#post', // 考勤组设置列表
  addAccess: '/attendance/group/add#post', // 新增考勤组
  updateAccess: '/attendance/group/update#post', // 修改考勤组
  delAccess: '/attendance/group/delete#delQuery', // 删除考勤组
  bindAccessUser: '/attendance/group/bind/user#post', // 考勤组添加人员
  getAccessDetail: '/attendance/group/detail#get', // 考勤组详情
  getTeaRecordStatic: '/teacher/static/index#get', // 教师考勤统计
  getStuRecordStatic: '/student/static/index#get' // 学生考勤统计
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.lz}${homeApi[val]}`
}
export default homeApi
