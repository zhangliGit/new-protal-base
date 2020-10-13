import homeApi from './home'
import accountManage from './accountManage'
import cardManage from './cardManage'
const apiList = {
  ...homeApi,
  ...accountManage,
  ...cardManage
}
export default apiList
