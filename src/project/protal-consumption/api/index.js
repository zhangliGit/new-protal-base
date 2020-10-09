import homeApi from './home'
import accountManage from './accountManage'
const apiList = {
  ...homeApi,
  ...accountManage
}
export default apiList
