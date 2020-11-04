/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const bdApi = {
  // 新生管理
  getStuList: '/material/type/getPage#post', // 新生列表
  stuDetail: '/material/type/detail/#getWithPara', // ID查详情
  singleReport: '/material/type/delete#del', // 单个报到
  batchReport: '/material/type/delete#del' // 批量报到
}

const fbApi = {
  // 新生分班
  getClassList: '/place/reserve/summary/add#post', // 班级列表
  assignStudent: '/place/reserve/summary/detail#getUrl', // 分配学生
  getAssignedList: '/place/reserve/summary/detail#getUrl,' // 分配学生列表
}

const sbApi = {
  // 迎新设备
  getDeviceList: '/place/reserve/summary/add#post', // 设备列表
  getRecord: '/place/reserve/summary/detail#getUrl', // 获取设备下发记录
  bindDevice: '/place/reserve/summary/detail#getUrl', // 绑定设备
  bindStudent: '/place/reserve/summary/detail#getUrl', // 绑定学生
  delBind: '/place/reserve/summary/detail#getUrl', // 解绑设备
  getBindStuList: '/place/reserve/summary/detail#getUrl' // 绑定学生列表
}
for (const val in bdApi) {
  bdApi[val] = `${hostEnv.wq_school}${bdApi[val]}`
}
for (const val in fbApi) {
  fbApi[val] = `${hostEnv.wq_school}${fbApi[val]}`
}
for (const val in sbApi) {
  sbApi[val] = `${hostEnv.wq_school}${sbApi[val]}`
}
export default {
  ...bdApi,
  ...fbApi,
  ...sbApi
}
