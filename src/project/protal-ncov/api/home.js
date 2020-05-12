/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const homeApi = {
  getUnReport: '/school/unReport/list#get', // 未上报名单
  getDaily: '/school/daily/num#get', // 疫情日报数量
  getReport: '/school/reportinfo/getReportInfoList#post', // 获取上报信息
  getInfoDoctor: '/school/schooldoctorinfo/getSchoolDoctorList#postQuery', // 获取校医列表
  getDailyData: '/index/page/getEpidemicData#postQuery', // 获取首页疫情日报数据
  getFeverAndHealth: '/index/page/getFeverAndHealthData#postQuery', // 获取首页发热和健康数
  getNoReport: '/index/page/getNoReportUserData#postQuery', // 获取首页未上报人数统计
  getSymptomsUser: '/index/page/getSymptomsUserData#postQuery', // 获取首页个症状人数统计
  getSymptomList: '/operate/symptomsinfo/list#get', // 获取症状信息列表
  getInformUser: '/school/informpersoninfo/list#postQuery', // 获取学校通知人员的设置
  updateInformUser: '/school/informpersoninfo/update#post', // update学校通知人员的设置
  gettmpList: '/school/bodypartstemperatureinfo/getSchoolDoctorList#postQuery', // 获取体温设置列表
  saveTmpList: '/school/bodypartstemperatureinfo/save#post', // save体温设置
  updateTmpList: '/school/bodypartstemperatureinfo/update#post', // update体温设置
  addDoctor: '/school/schooldoctorinfo/batchAdd#post', // 批量设置校医
  getInformWay: '/school/informwayinfo/list#postQuery', // 获取学校设置的通知方式
  updateInformWay: '/school/informwayinfo/update#post', // 设置学校的通知方式
  unBindDoc: '/school/schooldoctorinfo/deleteById#delete' // 通过id删除校医设置信息
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.lz_ncov}${homeApi[val]}`
}
export default homeApi
