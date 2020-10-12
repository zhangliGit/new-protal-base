/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getMachineList: '/consumerMachine/list#get', // 消费级设备列表查询

  getStallList: '/windowManage/list#get', // 档口列表查询
  addNewStall: '/windowManage#post', // 新增档口
  editStall: '/windowManage#putJson', // 修改档口
  deleStall: '/windowManage#delWithQuery', // 删除档口

  getBlackList: '/FaceBlacklist/list#get', // 黑名单列表查询
  addNewBlack: '/FaceBlacklist#post', // 添加黑名单
  deleBlack: '/FaceBlacklist#delWithQuery', // 删除黑名单

  getRuleList: '/consumeRule/list#get', // 消费规则列表查询
  editRule: '/consumeRule#putJson' // 修改消费规则
}
const baseDataApi = {
  // 场地管理
  getSiteList: '/place/manage/getFirstStagePlaceList#get', // 查询场地信息列表
  getSiteById: '/place/manage/getPlaceManageById#getUrl', // 根据id获取场地信息
  getChildSite: '/place/manage/getPlaceManageList#post' // 查询场地子节点列表
}

for (const val in homeApi) {
  homeApi[val] = `${hostEnv.hzz_ecard}${homeApi[val]}`
}

for (const val in baseDataApi) {
  baseDataApi[val] = `${hostEnv.zk_school}${baseDataApi[val]}`
}
export default {
  ...homeApi,
  ...baseDataApi
}
