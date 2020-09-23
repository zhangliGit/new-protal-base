/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  riskCategory: '/riskTemplate/category#get', // 风险清单分类列表
  riskModelList: '/riskTemplate/page#post', // 风险清单条件分页查询
  riskGroupList: '/riskGroup/info#getUrl', // 查看风险管理小组名单
  saveRiskGroup: '/riskGroup/save#post' // 保存风险管理小组名单
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.lz_safe}${homeApi[val]}`
}
export default homeApi
