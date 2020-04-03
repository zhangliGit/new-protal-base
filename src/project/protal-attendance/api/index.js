import homeApi from './home'
import attendanceApi from './attendanceApi'
import leaveApi from './leaveApi'
import teacherApi from './teacher'

const apiList = {
  ...homeApi,
  ...attendanceApi,
  ...leaveApi,
  ...teacherApi
}
export default apiList
