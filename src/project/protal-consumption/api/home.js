/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.hzz_ecard}${homeApi[val]}`
}
export default homeApi
