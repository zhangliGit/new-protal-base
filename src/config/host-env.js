/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let wxz_contorl = ''
let zk_school = ''
let zk_leave = ''
let zx_visitor = ''
let zx_door = ''
let lz_attendance = ''
let lz_user_center = ''

if (ConfigEnv === 'test') {
  wxz_contorl = '/wxz_contorl'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
} else if (ConfigEnv === 'prod') {
  wxz_contorl = '/wxz_contorl'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
} else {
  wxz_contorl = '/wxz_contorl'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
}

export default {
  wxz_contorl,
  zk_school,
  zk_leave,
  zx_visitor,
  zx_door,
  lz_attendance,
  lz_user_center
}
