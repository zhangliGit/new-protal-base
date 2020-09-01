/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const Api = {
  getpayInfoList: '/payProjectInfo/listSelect#postQuery', // 获取收费项目名称下拉列表
  getItemList: '/itemInfo/info/#getUrl', // 通过id获取收费项信息
  getselectList: '/itemInfo/listSelect#postQuery', // 获取收费详情下拉列表
  getList: '/billInfo/list#post', // 查询账单列表
  getbatchInfoList: '/batchInfo/listSelect#postQuery', // 获取批次下拉列表
  addbillInfo: '/billInfo/checkStand#post' ,// 收银台新增账单
  getbillDetail:'/billInfo/billDetailInfo/#getUrl',//查看账单详细
  delbillInfo:'/billInfo/shutDownBill/#postQuery',//关闭账单
}
for (const val in Api) {
  Api[val] = `${hostEnv.wxz_pay}${Api[val]}`
}
export default Api
