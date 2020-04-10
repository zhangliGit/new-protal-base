import homeApi from './home'
import doorApi from './door'
import doorsApi from './doors'
import baseApi from './base'

const apiList = {
  ...homeApi,
  ...doorsApi,
  ...doorApi,
  ...baseApi
}
export default apiList
