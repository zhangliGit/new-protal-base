import homeApi from './home'
import doorApi from './door'
import doorsApi from './doors'

const apiList = {
  ...homeApi,
  ...doorsApi,
  ...doorApi
}
export default apiList
