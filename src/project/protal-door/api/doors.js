/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const doorsApi = {
  getappointList: '/invite/appoint/list#post', // 访客记录
  getappointDetail: '/invite/appoint/detail#get', // 详细访问记录
  addcause: '/cause/info/add#post', // 事由添加
  delcause: '/cause/info/delete#get', // 事由删除
  getcauseList: '/cause/info/list#post', // 事由列表
  addcontrolgroup: '/visitor/controlgroup/add#post', // 添加访客控制组
  delcontrolgroup: '/visitor/controlgroup/delete#get', // 删除访客控制组
  getcontrolgroupList: '/visitor/controlgroup/list#post' // 访客控制组查询列表
}
for (const val in doorsApi) {
<<<<<<< HEAD
  doorsApi[val] = `${hostEnv.zx_protal}${doorsApi[val]}`
=======
  doorsApi[val] = `${hostEnv.zx_door}${doorsApi[val]}`
>>>>>>> 96f707b2c7a962fff0fa60a78220bc968134ad6b
}
export default doorsApi
