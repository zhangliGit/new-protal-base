/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getAccessList: '/attendance/group/list#post', // 考勤组设置列表
  addAccess: '/attendance/group/add#post', // 新增考勤组
  delAccess: '/attendance/group/delete#delQuery', // 删除考勤组
  getTeachersAccessSet: '/teacherAccessSet#get', // 考勤组设置教师
  getStudentsAccessSet: '/studentAccessSet#get' // 考勤组设置学生
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.lz}${homeApi[val]}`
}
export default homeApi
