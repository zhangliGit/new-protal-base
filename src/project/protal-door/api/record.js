/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const recordApi = {
  getrecordList: '/record/access/list#post', // 出入记录列表
  addRecord: '/record/access/add#post' // 添加出入记录
}
for (const val in recordApi) {
  recordApi[val] = `${hostEnv.zx_door}${recordApi[val]}`
}
export default recordApi
