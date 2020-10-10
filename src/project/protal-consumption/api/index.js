import homeApi from './home'
import accountManage from './accountManage'
import billRecord from './billRecord'
const apiList = {
  ...homeApi,
  ...accountManage,
  ...billRecord
}
export default apiList
