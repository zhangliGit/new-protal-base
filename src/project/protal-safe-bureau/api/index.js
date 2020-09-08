import specialApi from './special'
import dangerApi from './danger'
import uploadPdfApi from './uploadPdf'
import streetApi from './street'
const apiList = {
  ...specialApi,
  ...dangerApi,
  ...uploadPdfApi,
  ...streetApi
}
export default apiList
