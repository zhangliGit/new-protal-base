import specialApi from './special'
import dangerApi from './danger'
import uploadPdfApi from './uploadPdf'
import streetApi from './street'
import accidentApi from './accident'
import taskApi from './task'
const apiList = {
  ...specialApi,
  ...dangerApi,
  ...uploadPdfApi,
  ...streetApi,
  ...accidentApi,
  ...taskApi
}
export default apiList
