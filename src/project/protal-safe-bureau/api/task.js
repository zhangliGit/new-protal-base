/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const taskApi = {
  addTask: '/safeTaskTemplate/edu/saveData#post', // 局端新增任务
  getTaskDetail: '/safeTaskTemplate/info#getUrl', // 查看任务详情
  modifySchoolTask: '/safeTaskTemplate/modify#post', // 修改任务
  getTaskList: '/safeTaskTemplate/edu/list#post', // 局端任务下发列表
  previewTask: '/safeTaskTemplate/preview#postWithQueryAndBody', // 任务预览
  myTaskDetail: '/safeTask/info#get', // 根据id查询我的任务
  // 完成情况

  eduTaskCompleted: '/safeTaskTemplate/query/completed/status#post', // 局端查询已完成情况
  delAlarmList: '/invasion/warning/set/delete/#del', // 报警设置删除 确定要通知该学校相关负责人去处理该任务？
  reportTaskDetail: '/userAnswers/report/result#get', // 上报结果查看
  // 统计
  seeStatisticsLists: '/safeTaskQuestion/query/by/taskcode#postJsonQuery', // 查看统计所有条数题目
  seeStatistics: '/safeTaskTemplate/statistics#post', // 查看统计单条数据
  // 删除
  removeTask: '/safeTaskTemplate/remove/#getUrl', // 删除任务模板
  removeTaskAll: '/safeTaskTemplate/removes#post', // 批量删除任务模板
  // 发布任务
  getJobAll: '/edu/job/manage/queryjob/by/educode/and/definded#get', // 根据机构编码查询岗位获取预设岗位  限定职务基础数据
  taskPublish: '/safeTaskTemplate/edu/publish#post' // 任务发布
  // schoolorJobSearchPeople: '/userjob/query/by/schoolcodes/and/jobnames#post' // 根据机构编码查询岗位获取预设岗位  限定职务基础数据
}

for (const val in taskApi) {
  taskApi[val] = `${hostEnv.lz_safe}${taskApi[val]}`
}
export default taskApi
