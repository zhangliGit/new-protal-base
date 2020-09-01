/**
 * @des 统计报表
 */

import hostEnv from '@/config/host-env'

const totalApi = {
  getTotalList: '/dorm/check/result/list'
}

for (const val in totalApi) {
  totalApi[val] = `${hostEnv.ljj_dorm}${totalApi[val]}`
}
export default totalApi
