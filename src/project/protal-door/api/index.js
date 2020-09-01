import homeApi from './home'
import doorApi from './door'
import visitorApi from './visitor'
import baseApi from './base'
import recordApi from './record'
import addVisitorApi from './addVisitor'
import hostEnv from '@config/host-env'
const apiList = {
  ...homeApi,
  ...visitorApi,
  ...doorApi,
  ...baseApi,
  ...recordApi,
  ...addVisitorApi,
  downRecord: `${hostEnv.ljj_door}/record/access/record/list/export#export`, // 导出出入记录
  getRespondentinfo: `${hostEnv.ljj_visitor}/respondentinfo/list#post`, // 受访人信息列表
  addRespondentinfo: `${hostEnv.ljj_visitor}/respondentinfo/manage/batchAdd#post`, // 添加
  delrespondentinfo: `${hostEnv.ljj_visitor}/respondentinfo/manage/delete#get`, // 删除
  getrespondentinfoDetail: `${hostEnv.ljj_visitor}/respondentinfo/queryByNameAndPhone#get`, // 详细信息
  downAppoint: `${hostEnv.ljj_visitor}/invite/appoint/access/downloadExcel#export` // 访客记录导出
}
export default apiList