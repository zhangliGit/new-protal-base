import homeApi from './home'
import doorApi from './door'

const apiList = {
  ...homeApi,
  ...doorApi
}
export default apiList
