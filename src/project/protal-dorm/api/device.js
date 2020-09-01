/**
 * @des 宿舍关联接口
 */

import hostEnv from '@/config/host-env'

const deviceApi = {
  getDeviceList: '/dorm/controller/list', // 解绑
  addDeviceInfo: '/dorm/controller/saveOrUpdate', // 绑定
  // getRoleList: '/base/user/role/list',
  deleteDeviceInfo: '/dorm/controller/delete/',
  updateDeviceInfo: '/dorm/controller/updateInOrOut'
}
for (const val in deviceApi) {
  deviceApi[val] = `${hostEnv.ljj_dorm}${deviceApi[val]}`
}
export default deviceApi
