import attendanceApi from './attendanceApi'
import leaveApi from './leaveApi'
import teacherApi from './teacher'

const apiList = {
  ...attendanceApi,
  ...leaveApi,
  ...teacherApi
}
export default apiList
