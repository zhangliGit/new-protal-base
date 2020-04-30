/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let wxz_control = ''
let zk_school = ''
let zk_leave = ''
let zx_visitor = ''
let zx_door = ''
let zx_protal = ''
let lz_attendance = ''
let lz_user_center = ''
let lz_ncov = ''

if (ConfigEnv === 'test') {
  wxz_control = '/wxz_control'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  zx_protal = '/zx_protal'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
  lz_ncov = '/lz_ncov'
} else if (ConfigEnv === 'prod') {
  wxz_control = '/wxz_control'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  zx_protal = '/zx_protal'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
  lz_ncov = '/lz_ncov'
} else {
  wxz_control = '/wxz_control'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  zx_protal = '/zx_protal'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
  lz_ncov = '/lz_ncov'
}

export default {
  wxz_control,
  zk_school,
  zk_leave,
  zx_visitor,
  zx_door,
  zx_protal,
  lz_attendance,
  lz_user_center,
  lz_ncov
}
