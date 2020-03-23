import homeApi from './home'
import attendanceApi from './attendanceApi'
import teacherApi from './teacher'

const apiList = {
  ...homeApi,
  ...attendanceApi,
  ...teacherApi
}
export default apiList
