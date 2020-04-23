/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const baseApi = {
  getPlace: '/place/manage/getFirstStagePlaceList#get' // 平台场地接口
}
for (const val in baseApi) {
  baseApi[val] = `${hostEnv.zk_school}${baseApi[val]}`
}
export default baseApi
