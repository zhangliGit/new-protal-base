/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const baseApi = {
  schoolorJobSearchPeople: '/userjob/query/by/schoolcodes/and/jobnames#post' // 根据机构编码查询岗位获取预设岗位  限定职务基础数据
}
for (const val in baseApi) {
  baseApi[val] = `${hostEnv.ljj_people}${baseApi[val]}`
}
export default baseApi
