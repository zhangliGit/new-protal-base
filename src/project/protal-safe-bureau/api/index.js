import specialApi from './special'
import dangerApi from './danger'
import uploadPdfApi from './uploadPdf'
import streetApi from './street'
import accidentApi from './accident'

const apiList = {
  ...specialApi,
  ...dangerApi,
  ...uploadPdfApi,
  ...streetApi,
  ...accidentApi
}
export default apiList
