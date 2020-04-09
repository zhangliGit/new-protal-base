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

if (ConfigEnv === 'test') {
  wangxuanzhang = '/wangxuanzhang' // 控制中心
  zhuxu = '/zhuxu'
  zhangkun = '/zhangkun'
  gejunwei = '/lvzhuo'
  lvzhuo = '/lvzhuo'
} else if (ConfigEnv === 'prod') {
  // 线上接口
  wangxuanzhang = '/web-protal/controlCenter'
  zhuxu = '/web-protal/application'
  zhangkun = '/web-protal/canpoint-school-view'
  gejunwei = '/web-protal/plateform-userinfo-view'
  lvzhuo = '/web-protal/plateform-userinfo-view'
} else {
  // wangxuanzhang = '/wangxuanzhang' // 控制中心
  // zhuxu = '/zhuxu'
  // zhangkun = '/zhangkun'
  // gejunwei = '/lvzhuo'
  // lvzhuo = '/lvzhuo'
  wangxuanzhang = '/wangxuanzhang/web-protal/controlCenter'
  zhuxu = '/zhuxu/web-protal/application'
  zhangkun = '/zhangkun/web-protal/canpoint-school-view'
  gejunwei = '/gejunwei/web-protal/plateform-userinfo-view'
  lvzhuo = '/lvzhuo/web-protal/plateform-userinfo-view'
  wxz = '/wxz'
  zx = '/zx'
  mj = '/mj'
  lz = '/lz'
  zk = '/zk'
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
  mj
}
