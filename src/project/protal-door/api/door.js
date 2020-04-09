/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const doorApi = {
  getGroupList: '/setting/rule/group/list#postForm', // 获取通行权限列表
  addGroup: '/setting/rule/group/add#post', // 添加通行权限组
  getReasonList: '/reasonList#get', // 来访事由
  getFkControl: '/fkControl#get', // 获取访客控制组配置
  getDoorSet: '/doorList#get', // 获取门卫列表
  getFkRecord: '/fkRecord#get', // 获取访客记录
  getStudentAccess: '/studentAccess#get', // 学生通行权限
  getTeacherAccess: '/teacherAccess#get' // 教师通行权限
}
for (const val in doorApi) {
  doorApi[val] = `${hostEnv.mj}${doorApi[val]}`
}
export default doorApi
