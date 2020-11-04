import homeApi from './home'
import baseDataApi from './baseData'
import attractApi from './attract'
import greetApi from './greet'

const apiList = {
  ...homeApi,
  ...baseDataApi,
  ...attractApi,
  ...greetApi
}
export default apiList
