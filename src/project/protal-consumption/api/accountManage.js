/**
 * @des 账户管理模块接口
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const accountApi = {
  getUserInfoByCard: '/accountInfo/checkCardAccount#getUrl', // 通过卡id查询人员信息
  getAccountList: '/accountInfo/list#get', // 账户列表
  getRechargeList: '/recharge/list#get', // 查询充值记录
  addRecharge: '/accountInfo/accountRecharge#post', // 新增充值记录
  getSubsidyList: '/subsidyManage/list#get', // 补助管理
  getSubsidyDetail: '/subsidyManage#getUrl', // 补助详情
  subsidyInfoList: '/subsidyPeople/list#get', // 补助发放名单
  getOpenAccount: '/accountInfo/isOpenAccount#getUrl', // 查询开户信息
  addOpenAccount: '/accountInfo/openAccount#post', // 开户
  grantSubsidy: '/subsidyManage/grantSubsidy#post', // 发放补助
  saveSubsidy: '/subsidyManage/saveSubsidy#post', // 延期发放补助
  immedGrantSubsidy: '/subsidyManage/immedGrant#postWithQueryAndBody', // 立即发放补助
  deleteSubsidy: '/subsidyManage#delWithQuery', // 删除补助管理
  getAccountRecord: '/accountRecords/list#get', // 查询账户操作记录
  exportAccountRecord: '/accountRecords/export#export', // 导出操作记录
  importTemplate: '/accountInfo/importTemplate#export' // 下载开户模板
}
for (const val in accountApi) {
  accountApi[val] = `${hostEnv.hzz_ecard}${accountApi[val]}`
}
export default accountApi
