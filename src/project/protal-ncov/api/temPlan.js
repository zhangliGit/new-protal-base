/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const temPlanApi = {
  saveorUpdate: '/thermometry/plan/saveorupdate#post', // 更新保存测温计划
  getplanList: '/thermometry/plan/queryplan#get', // 查询测温计划列表
  gettimeList: '/thermometry/plan/queryTimeByCode#getWithPara', // 测温计划时间段
  getqueryList: '/plan/record/query/By/SchoolCodeAndDate#get', // 测温计划
}
for (const val in temPlanApi) {
  temPlanApi[val] = `${hostEnv.ljj_ncov}${temPlanApi[val]}`
}
export default temPlanApi