/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const accountApi = {
  getAccountList: '/dev-api/cardmanager/accountinfo/list#get' // 账户列表
}
for (const val in accountApi) {
  accountApi[val] = `${hostEnv.hzz_ecard}${accountApi[val]}`
}
export default accountApi
