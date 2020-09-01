import homeApi from './home'
import archiveApi from './archive'
import inspectApi from './inspect'
import dangerApi from './danger'

const apiList = {
  ...homeApi,
  ...archiveApi,
  ...inspectApi,
  ...dangerApi
}
export default apiList
