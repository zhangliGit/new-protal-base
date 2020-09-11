import homeApi from './home'
import archiveApi from './archive'
import inspectApi from './inspect'
import dangerApi from './danger'
import specialApi from './special'
import accdientApi from './accident'
import taskApi from './task'

const apiList = {
  ...homeApi,
  ...archiveApi,
  ...inspectApi,
  ...dangerApi,
  ...specialApi,
  ...taskApi,
  ...accdientApi

}
export default apiList