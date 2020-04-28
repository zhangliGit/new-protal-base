/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const reportApi = {
  getLatestMedicalInfo: '/school/medicalinfo/getLatestMedicalInfo#postQuery', // 获取体检最新一条记录
  updateInfo: '/school/medicalinfo/save#post', // 修改体检数据
  getTemperatureData: '/school/reportinfo/getTemperatureData#postQuery', // 获取个人体温数据
  getreportList: '/school/userinfo/getUserInfoList#post', // 人员信息查询
  getReportInfoList: '/school/reportinfo/getReportInfoList#post', // 获取上报信息记录
  getSymptomList: '/operate/symptomsinfo/list#get' // 获取症状信息列表
}
for (const val in reportApi) {
  reportApi[val] = `${hostEnv.lz_ncov}${reportApi[val]}`
}
export default reportApi
