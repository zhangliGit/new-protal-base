/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */
import hostEnv from '@config/host-env'

const baseData1Api = {
  // 专业管理
  highSubDetail: '/subject/manage/info#getUrl', // 根据id查询详情
  getHighSub: '/subject/manage/list#post', // 列表查询

  // 学年管理
  highTermDetail: '/school/year/manage/detail#postForm', // 详情
  getHighTerm: '/school/year/manage/list#post', // 列表

  // 班级管理
  highClassDetail: '/class/manage/detail#get', // 详情
  getHighClass: '/class/manage/list#post', // 列表查询
  getHighNode: '/class/manage/node#get', // 班级节点查询
  getHighGrade: '/class/manage/query/grade#get' // 查询年级
}

const baseData2Api = {
  // 文件上传
  addPhoto: '/file/uploadUserPhoto#post', // 上传照片
  addFile: '/file/freeUpload#post' // 上传文件
}

for (const val in baseData1Api) {
  baseData1Api[val] = `${hostEnv.ljj_high}${baseData1Api[val]}`
}

for (const val in baseData2Api) {
  baseData2Api[val] = `${hostEnv.zk_school}${baseData2Api[val]}`
}

const baseDataApi = {
  ...baseData1Api,
  ...baseData2Api
}

export default baseDataApi
