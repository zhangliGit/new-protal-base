import homeApi from './home'
import archiveApi from './archive'
import inspectApi from './inspect'
import dangerApi from './danger'
import specialApi from './special'
import accdientApi from './accident'

const apiList = {
  ...homeApi,
  ...archiveApi,
  ...inspectApi,
  ...dangerApi,
  ...specialApi,
  ...accdientApi
}
export default apiList