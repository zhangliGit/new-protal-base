import hostEnv from '@config/host-env'
import homeApi from './home'
import noticeApi from './notice'

const apiList = {
  ...homeApi,
  ...noticeApi,
  getSchoolInfo: `${hostEnv.zk_school}/school/info/getSchoolByCode#getUrl`, // 获取学校信息
  getRecord: `${hostEnv.ljj_user_center}/change/record/query/by/userCode#get`
}

export default apiList
