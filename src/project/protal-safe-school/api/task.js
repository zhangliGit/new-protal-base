/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const taskApi = {
  getMySafeTask: '/safeTask/page#post', // 我的任务列表
  getSafeTask: '/safeTaskTemplate/page#post', // 校端任务下发列表
  delSafeTask: '/safeTaskTemplate/remove#getUrl', // 删除任务
  delSafeTasks: '/safeTaskTemplate/removes#post', // 批量删除任务
  submitMyTask: '/safeTask/submit#putQuery', // 提交或补交
  myTaskDetail: '/safeTask/info#get', // 根据id查询我的任务
  addSchoolTask: '/safeTaskTemplate/school/saveData#post', // 校端新增任务
  getTaskDetail: '/safeTaskTemplate/info#getUrl', // 查看任务详情
  modifySchoolTask: '/safeTaskTemplate/modify#post', // 修改任务
  reportTaskDetail: '/userAnswers/report/result#get', // 上报结果查看
  postSchoolTask: '/safeTaskTemplate/school/publish#post', // 校端任务发布
  previewTask: '/safeTaskTemplate/preview#postWithQueryAndBody', // 任务预览
  answerTask: '/safeTask/add/answer#post', // 任务填报
  previewMyTask: '/safeTask/preview/#postWithQueryAndBody' // 任务预览

}
for (const val in taskApi) {
  taskApi[val] = `${hostEnv.lz_safe}${taskApi[val]}`
}
export default taskApi
