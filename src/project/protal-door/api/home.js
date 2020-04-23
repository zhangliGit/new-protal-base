/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getAccessRecord: '/accessRecord#get', // 获取数据列表
  getReasonList: '/reasonList#get', // 来访事由
  getFkControl: '/fkControl#get', // 获取访客控制组配置

  getDoorSet: '/setting/place/relation/list#post', // 获取门卫列表
  addDoor: '/setting/place/user/relation/add#post', // 添加门卫
  delDoor: '/setting/place/user/relation/delete#delQuery', // 删除门卫
  addControl: '/setting/place/controller/relation/add#post', // 添加控制组
  delControl: '/setting/place/controller/relation/delete#delQuery', // 删除控制组

  getFkRecord: '/fkRecord#get', // 获取访客记录
  getStudentAccess: '/studentAccess#get', // 学生通行权限
  getTeacherAccess: '/teacherAccess#get' // 教师通行权限
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.zx_visitor}${homeApi[val]}`
}
export default homeApi
