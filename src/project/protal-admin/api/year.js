/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const yearApi = {
  getyearList: '/schoolYearSemester/list#postQuery', // 查询学年列表
}
for (const val in yearApi) {
  yearApi[val] = `${hostEnv.year}${yearApi[val]}`
}
export default yearApi
