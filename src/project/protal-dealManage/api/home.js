/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const dealApi = {
  getOrderList: '/order/page#postQuery', // 查询订单列表
  getDictList: '/dict/data/type#getUrl', // 数据字典
  getOrderDetail: '/order/info#getUrl', // 查询订单详情
}
for (const val in dealApi) {
  dealApi[val] = `${hostEnv.hzz_deal}${dealApi[val]}`
}
export default {
  ...dealApi
}
