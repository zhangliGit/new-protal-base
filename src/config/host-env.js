/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let wangxuanzhang = ''
let zhuxu = ''
let lvzhuo = ''
let zhangkun = ''
let gejunwei = ''
let wxz = ''
let zk = ''
let lz = ''
let zx = ''
let mj = ''
let base = ''
let year = ''

if (ConfigEnv === 'test') {
  // 环境接口
  wangxuanzhang = '/api-pc-protal/controlCenter'
  zhuxu = '/api-pc-protal/application'
  zhangkun = '/api-pc-protal/canpoint-school-view'
  gejunwei = '/api-pc-protal/plateform-userinfo-view'
  lvzhuo = '/api-pc-protal/plateform-userinfo-view'
  wxz = '/wxz'
  lz = '/lz'
  zx = '/zx'
  zk = '/zk'
  base = '/base'
  mj = '/mj'
} else if (ConfigEnv === 'prod') {
  // 线上接口
  wangxuanzhang = '/api-pc-protal/controlCenter'
  zhuxu = '/api-pc-protal/application'
  zhangkun = '/api-pc-protal/canpoint-school-view'
  gejunwei = '/api-pc-protal/plateform-userinfo-view'
  lvzhuo = '/api-pc-protal/plateform-userinfo-view'
} else {
  // wangxuanzhang = '/wangxuanzhang' // 控制中心
  // zhuxu = '/zhuxu'
  // zhangkun = '/zhangkun'
  // gejunwei = '/lvzhuo'
  // lvzhuo = '/lvzhuo'
  wangxuanzhang = '/wangxuanzhang/api-pc-protal/controlCenter'
  zhuxu = '/zhuxu/api-pc-protal/application'
  zhangkun = '/zhangkun/api-pc-protal/canpoint-school-view'
  gejunwei = '/gejunwei/api-pc-protal/plateform-userinfo-view'
  lvzhuo = '/lvzhuo/api-pc-protal/plateform-userinfo-view'
  wxz = '/wxz'
  zx = '/zx'
  mj = '/mj'
  lz = '/lz'
  zk = '/zk'
  base = '/base'
  year = '/year'
}

export default {
  wangxuanzhang,
  zhuxu,
  zhangkun,
  gejunwei,
  lvzhuo,
  wxz,
  zx,
  lz,
  zk,
  mj,
  base,
  year
}
