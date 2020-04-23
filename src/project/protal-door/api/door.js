/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const doorApi = {
  getGroupList: '/setting/rule/group/list#postForm', // 获取通行权限列表
  addGroup: '/setting/rule/group/add#post', // 添加编辑通行权限组
  getGroupDetail: '/setting/rule/group/detail#get', // 查询权限组详情
  delRuleGroup: '/setting/rule/group/delete#delQuery', // 删除通行权限组
  bindAccessUser: '/setting/rule/group/user/add#post', // 权限组添加人员
  getAccessUserList: '/setting/rule/user/list#post', // 权限组人员列表
  getReasonList: '/reasonList#get', // 来访事由
  getFkControl: '/fkControl#get', // 获取访客控制组配置
  // getDoorSet: '/doorList#get', // 获取门卫列表
  getFkRecord: '/fkRecord#get', // 获取访客记录
  getStudentAccess: '/studentAccess#get', // 学生通行权限
  getTeacherAccess: '/teacherAccess#get', // 教师通行权限
  getrecordList: '/record/access/list#post', // 出入记录列表
  addRecord: '/record/access/add#post' // 添加出入记录
}
for (const val in doorApi) {
  doorApi[val] = `${hostEnv.zx_door}${doorApi[val]}`
}
export default doorApi
