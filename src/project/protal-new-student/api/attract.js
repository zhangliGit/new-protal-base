/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const zsApi = {
  // 招生任务
  getTaskList: '/recruitStudentTask/page#post', // 招生任务列表
  addTask: '/recruitStudentTask/add#post', // 添加招生任务
  taskDetail: '/material/type/detail/#getWithPara', // ID查详情
  delTask: '/material/type/delete#del' // 删除
}

const sqApi = {
  // 新生申请
  getStudentList: '/material/name/getPage#post', // 学生列表
  addStudent: '/material/name/addOrUpdate#post', // 新增学生
  studentDetail: '/material/name/detail/#getWithPara', // ID查详情
  singleCheck: '/material/name/delete#del', // 单个操作-通过/拒绝
  batchCheck: '/material/name/delete#del' // 批量操作-通过/拒绝
}
for (const val in zsApi) {
  zsApi[val] = `${hostEnv.wq_school}${zsApi[val]}`
}
for (const val in sqApi) {
  sqApi[val] = `${hostEnv.wq_school}${sqApi[val]}`
}
export default {
  ...zsApi,
  ...sqApi
}
