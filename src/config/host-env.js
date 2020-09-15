/* eslint-disable */
const ConfigEnv = process.env.VUE_APP_URL
let wxz_control = ''
let zk_school = ''
let zk_leave = ''
let zx_subject = ''
let zx_visitor = ''
let zx_door = ''
let ljj_door = ''
let zx_protal = ''
let lz_attendance = ''
let lz_user_center = ''
let ljj_user_center = ''
let ljj_edu = ''
let lz_ncov = ''
let ljj_dorm = ''
let zq_news = ''
let zq_oa = ''
let zk_moral = ''
let ljj_admin = ''
let zq_class = ''
let lz_protal = ''
let hpb_card = ''
let hpb_consume = ''
let zq_schedule = ''
let zk_examplan = ''
let zx_center = ''
let ljj_ncov = ''
let ljj_visitor = ''
let hpb_face = ''
let zk_work = ''
let ljj_attendance = ''
let zk_oa = ''
let lz_safe = ''
let cl_oa=''
let wxz_pay=''
let cl_class=''
let zk_class=''
if (ConfigEnv === 'test') {
  wxz_control = '/wxz_control'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zx_visitor = '/zx_visitor'
  zx_subject = '/zx_subject'
  zx_door = '/zx_door'
  ljj_door = '/ljj_door'
  zx_protal = '/zx_protal'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
  ljj_user_center = '/ljj_user_center'
  ljj_edu = '/ljj_edu'
  lz_ncov = '/lz_ncov'
  ljj_dorm = '/ljj_dorm'
  zq_news = '/zq_news'
  zk_moral = '/zk_moral'
  ljj_admin = '/ljj_admin'
  zq_class = '/zq_class'
  lz_protal = '/lz_protal'
  hpb_card = '/hpb_card'
  hpb_consume = '/hpb_consume'
  zq_schedule = '/zq_schedule'
  zk_examplan = '/zk_examplan'
  zx_center = '/zx_center'
  ljj_visitor = '/ljj_visitor'
  ljj_ncov = '/ljj_ncov'
  zk_oa = '/zk_oa'
  hpb_face = '/hpb_face'
  zq_oa = '/zq_oa'
  ljj_attendance = '/ljj_attendance'
  lz_safe = '/lz_safe'
  cl_oa='/cl_oa'
  wxz_pay='/wxz_pay'
  cl_class='/cl_class'
  zk_class='/zk_class'
} else if (ConfigEnv === 'prod') {
  wxz_control = '/wxz_control'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zx_subject = '/zx_subject'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  ljj_door = '/ljj_door'
  zx_protal = '/zx_protal'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
  ljj_user_center = '/ljj_user_center'
  ljj_edu = '/ljj_edu'
  lz_ncov = '/lz_ncov'
  ljj_dorm = '/ljj_dorm'
  zq_news = '/zq_news'
  zk_moral = '/zk_moral'
  ljj_admin = '/ljj_admin'
  zq_class = '/zq_class'
  lz_protal = '/lz_protal'
  hpb_card = '/hpb_card'
  hpb_consume = '/hpb_consume'
  zq_schedule = '/zq_schedule'
  zk_examplan = '/zk_examplan'
  zx_center = '/zx_center'
  ljj_visitor = '/ljj_visitor'
  ljj_ncov = '/ljj_ncov'
  zk_oa = '/zk_oa'
  hpb_face = '/hpb_face'
  zq_oa = '/zq_oa'
  ljj_attendance = '/ljj_attendance'
  lz_safe = '/lz_safe'
  cl_oa='/cl_oa'
  wxz_pay='/wxz_pay'
  cl_class='/cl_class'
  zk_class='/zk_class'
} else {
  wxz_control = '/wxz_control'
  zk_school = '/zk_school'
  zk_leave = '/zk_leave'
  zx_subject = '/zx_subject'
  zx_visitor = '/zx_visitor'
  zx_door = '/zx_door'
  ljj_door = '/ljj_door'
  zx_protal = '/zx_protal'
  lz_attendance = '/lz_attendance'
  lz_user_center = '/lz_user_center'
  ljj_user_center = '/ljj_user_center'
  ljj_edu = '/ljj_edu'
  lz_ncov = '/lz_ncov'
  ljj_dorm = '/ljj_dorm'
  zq_news = '/zq_news'
  zk_moral = '/zk_moral'
  ljj_admin = '/ljj_admin'
  zq_class = '/zq_class'
  lz_protal = '/lz_protal'
  hpb_card = '/hpb_card'
  hpb_consume = '/hpb_consume'
  zq_schedule = '/zq_schedule'
  zk_examplan = '/zk_examplan'
  zx_center = '/zx_center'
  ljj_visitor = '/ljj_visitor'
  ljj_ncov = '/ljj_ncov'
  zk_oa = '/zk_oa'
  hpb_face = '/hpb_face'
  ;(zq_oa = '/zq_oa'), (ljj_attendance = '/ljj_attendance')
  lz_safe = '/lz_safe'
  cl_oa='/cl_oa'
  wxz_pay='/wxz_pay'
  cl_class='/cl_class'
  zk_class='/zk_class'
}

export default {
  wxz_control,
  zk_school,
  zk_leave,
  zx_subject,
  zx_visitor,
  zx_door,
  ljj_door,
  zx_protal,
  lz_attendance,
  lz_user_center,
  ljj_user_center,
  ljj_edu,
  lz_ncov,
  ljj_dorm,
  zq_news,
  zk_moral,
  ljj_admin,
  zq_class,
  lz_protal,
  hpb_card,
  hpb_consume,
  zk_examplan,
  ljj_visitor,
  zq_schedule,
  zx_center,
  ljj_ncov,
  hpb_face,
  zk_oa,
  zq_oa,
  ljj_attendance,
  lz_safe,
  cl_oa,
  wxz_pay,
  cl_class,
  zk_class
}
