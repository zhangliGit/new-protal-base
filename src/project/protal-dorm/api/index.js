import homeApi from './home'
import orgTreeApi from './orgTree'
import checkTotalApi from './checkTotal'
import realBedApi from './realBed'
import timeSetApi from './timeSet'
import baseApi from './base'
import deviceApi from './device'

const api = {
  ...homeApi,
  ...orgTreeApi,
  ...checkTotalApi,
  ...realBedApi,
  ...timeSetApi,
  ...baseApi,
  ...deviceApi
}
export default api
