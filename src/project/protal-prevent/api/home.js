/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  riskCategory: '/riskTemplate/category#get', // 风险清单分类列表
  riskModelList: '/riskTemplate/page#post', // 风险清单条件分页查询
  riskGroupList: '/riskGroup/info#getUrl', // 查看风险管理小组名单
  saveRiskGroup: '/riskGroup/save#post', // 保存风险管理小组名单
  riskFileList: '/riskFile/list#getUrl', // 查看风险管理方案
  delRiskFile: '/riskFile/remove#getUrl', // 删除文件
  addRiskFile: '/riskFile/add#post', // 新增文件
  riskIdentifyList: '/riskIdentification/page#post', // 风险辨识分页条件查询
  addRiskIdentify: '/riskIdentification/add#post', // 风险辨识新增
  modifyRiskIdentify: '/riskIdentification/modify#post', // 风险辨识修改
  riskIdentifyDetail: '/riskIdentification/info#getUrl', // 根据id查风险辨识详情
  publishRiskIdentify: '/riskIdentification/publish#getUrl', // 风险辨识发布
  delRiskIdentify: '/riskIdentification/remove#getUrl', // 风险辨识删除
  delsRiskIdentify: '/riskIdentification/removes#post', // 风险辨识批量删除
  riskAssessList: '/riskAssessment/page#post' // 校端-风险评估分页条件查询
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.lz_safe}${homeApi[val]}`
}
export default homeApi
