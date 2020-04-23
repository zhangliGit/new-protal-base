import homeApi from './home'
import doorApi from './door'
import visitorApi from './visitor'
import baseApi from './base'
import recordApi from './record'

const apiList = {
  ...homeApi,
  ...visitorApi,
  ...doorApi,
  ...baseApi,
  ...recordApi
}
export default apiList
