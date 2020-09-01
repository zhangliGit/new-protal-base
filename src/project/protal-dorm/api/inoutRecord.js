/**
 * @des 出入记录
 * @author zhangli
 */

import hostEnv from '@/config/host-env'

const recordApi = {
  getRecordList: '/dorm/access/record/list#postJsonQuery'
}

for (const val in recordApi) {
  recordApi[val] = `${hostEnv.ljj_dorm}${recordApi[val]}`
}
export default recordApi
