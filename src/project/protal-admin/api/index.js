import homeApi from './home'
import userApi from './user'
import schoolApi from './school'
import canpointApi from './canpoint'
import calendarApi from './calendar'
import yearApi from './year'

const apiList = {
  ...homeApi,
  ...userApi,
  ...schoolApi,
  ...canpointApi,
  ...calendarApi,
  ...yearApi
}
export default apiList
