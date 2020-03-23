import homeApi from './home'
import userApi from './user'
import schoolApi from './school'
import canpointApi from './canpoint'

const apiList = {
  ...homeApi,
  ...userApi,
  ...schoolApi,
  ...canpointApi
}
export default apiList
