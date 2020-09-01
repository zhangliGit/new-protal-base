import homeApi from './home'
import dangerApi from './danger'
import uploadPdfApi from './uploadPdf'
import streetApi from './street'
const apiList = {
  ...homeApi,
  ...dangerApi,
  ...uploadPdfApi,
  ...streetApi
}
export default apiList
