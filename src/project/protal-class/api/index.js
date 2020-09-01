import homeApi from './home'
import baseDataApi from './baseData'
import countApi from './count'
import showApi from './show'
import scheduleApi from './schedule'
import planApi from './plan'
import attendanceApi from './attendance'
import year from './year'

const apiList = {
  ...homeApi,
  ...baseDataApi,
  ...countApi,
  ...showApi,
  ...scheduleApi,
  ...planApi,
  ...attendanceApi,
  ...year
}
export default apiList
