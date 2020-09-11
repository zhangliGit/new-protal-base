/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const taskApi = {
  addTask: '/safeTaskTemplate/edu/saveData#post', // 局端新增任务
  eidtTask: '/safeTaskTemplate/modify#post', // 修改任务模板
  getTaskList: '/safeTaskTemplate/edu/list#post', // 局端任务下发列表
  getTaskinfo: '/safeTaskTemplate/info/#get', // 查看任务模板详情 预览
  removeTask: '/safeTaskTemplate/remove/#get', // 删除任务模板
  removeTaskAll: '/safeTaskTemplate/removes#post', // 批量删除任务模板
  taskPublish: '/safeTaskTemplate/publish#post' // 任务发布

}
for (const val in taskApi) {
  taskApi[val] = `${hostEnv.lz_safe}${taskApi[val]}`
}
export default taskApi
