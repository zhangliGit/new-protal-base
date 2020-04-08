/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const doorApi = {
  getrecordList: '/record/access/list#post' ,// 出入记录
  addrecordList: '/record/access/add#post', // 添加出入记录
  getappointList: '/invite/appoint/list#post' ,// 访客记录
  addcause: '/cause/info/add#post' ,// 事由添加
  delcause: '/cause/info/delete#get' ,// 事由删除
  getcauseList: '/cause/info/list#post' ,// 事由查询列表
  addcontrolgroup: '/visitor/controlgroup/add#post' ,// 添加访客控制组
  delcontrolgroup: '/visitor/controlgroup/delete#get' ,// 访客控制组删除
  getcontrolgroupList: '/visitor/controlgroup/list#post' // 控制组列表
}
for (const val in doorApi) {
  doorApi[val] = `${hostEnv.zx}${doorApi[val]}`
}
export default doorApi
