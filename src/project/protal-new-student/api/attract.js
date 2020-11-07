/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const zsApi = {
  // 招生任务
  getHomeData: '/recruitStudentTask/statistics#getUrl', // 招生统计
  getTaskList: '/recruitStudentTask/page#post', // 招生任务列表
  addTask: '/recruitStudentTask/add#post', // 添加招生任务
  editTask: '/recruitStudentTask/modify#post', // 修改招生任务
  taskDetailById: '/recruitStudentTask/info#getUrl', // ID查详情
  taskDetailByCode: '/recruitStudentTask/detail#getUrl', // Code查详情
  delTask: '/recruitStudentTask/remove#getUrl', // 删除 id
  batchDelTask: '/recruitStudentTask/removes#del' // 批量删除 ids
}

const sqApi = {
  // 新生申请
  getStudentList: '/recruitStudentInfo/page#post', // 学生列表
  addStudent: '/recruitStudentInfo/add#post', // 新增学生
  studentDetail: '/recruitStudentInfo/info#getUrl', // ID查详情
  singleCheck: '/recruitStudentInfo/audit#post', // 单个操作-通过/拒绝
  batchCheck: '/recruitStudentInfo/audit/batch#post' // 批量操作-通过/拒绝
}

const glApi = {
  // 新生管理
  getGlList: '/recruitStudentInfo/student/list#getUrl', // 查询班级下已有学生
  assignClass: '/recruitStudentInfo/student/to/class#post', // 分班

  // 设备管理
  getDeviceList: '/deviceManage/page#post', // 获取已绑定设备列表
  bindDevices: '/deviceManage/bind/device#post', // 绑定设备
  unbindDevices: '/deviceManage/unbind/device#getUrl', // 解绑设备
  getDeviceRecord: '/deviceManage/user/list#getUrl' // 下发记录
}

const deviceApi = {
  getBaseDevice: '/device/info/queryDeviceInfos#post' // 获取所有设备列表
}
for (const val in zsApi) {
  zsApi[val] = `${hostEnv.wq_school}${zsApi[val]}`
}
for (const val in sqApi) {
  sqApi[val] = `${hostEnv.wq_school}${sqApi[val]}`
}
for (const val in glApi) {
  glApi[val] = `${hostEnv.wq_school}${glApi[val]}`
}
for (const val in deviceApi) {
  deviceApi[val] = `${hostEnv.wxz_control}${deviceApi[val]}`
}
export default {
  ...zsApi,
  ...sqApi,
  ...glApi,
  ...deviceApi
}
