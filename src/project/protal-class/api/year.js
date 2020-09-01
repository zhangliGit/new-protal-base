import hostEnv from '@config/host-env'

const yearApi = {
  getYearId: `${hostEnv.lz_user_center}/schoolYearSemester/list#postForm` // 查询学年
}
export default yearApi
