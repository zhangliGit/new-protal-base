/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const showApi = {
  getClassMotto: '/class/info/list#get', // 班级格言
  addClassMotto: '/class/info/add#postQuery', // 新增班级格言
  addNewAlbum: '/album/add#postQuery', // 创建相册
  editAlbumById: '/album/update#put', // 修改相册名称
  delAlbumById: '/album/delete#del', // 删除相册
  getAlbumList: '/album/list#post', // 相册列表
  addPhotos: 'album/batchAddAlbumContent#postWithQueryAndBody', // 批量新增相片
  editPhotoById: '/album/updateAlbumContent#putWithQuery', // 修改照片名称
  delPhotoById: '/album/deleteAlbumContent#delete', // 删除照片
  getAlbumPhotoList: '/album/albumContentlist#postWithQuery', // 相册相片列表
  getCoversList: '/album/carouselList#postQuery', // 轮播图列表
  setCovers: '/album/updateIsCover#putJson', // 轮播图设置

  getClassCardList: '/classcard/bind/list#post', // 班牌管理列表
  bindClassCard: '/classcard/bind/add#post', // 绑定班牌
  unitClassCard: '/classcard/bind/unbound#putWithQuery', // 班牌解绑
  addPlace: '/classcard/bind/bound#putJson', // 班牌绑定场地
  resetPassWord: '/classcard/bind/resetPwd/#putWithQuery', // 班牌重置密码

  getWelcomeList: '/welcome/model/list#postQuery', // 欢迎模式列表
  getWelcomeDetail: 'welcome/model/detail#getUrl', // 欢迎模式详情
  addWelcome: '/welcome/model/add#post', // 新增欢迎模式
  delWelcomeById: '/welcome/model/delete#del', // 删除欢迎模式
  editWelcomeById: '/welcome/model/update#putJson', // 修改欢迎模式

  getTemList: '/welcome/model/temList#post', // 测温模式列表
  setTemSwitch: '/welcome/model/updateTemSwitch#putJson', // 批量编辑测温模式

  getLostList: '/lost/and/found/list#post', // 矢物招领列表
  editLost: '/lost/and/found/update#putJson', // 编辑矢物招领
  addLost: '/lost/and/found/add#post', // 新增矢物招领
  deleLost: '/lost/and/found/delete#delWithQuery', // 删除矢物招领
  batchDeleLost: '/lost/and/found/batchDelete#delWithQuery', // 批量删除矢物招领

  getHomeworkList: '/homework/findHomeWork#post', // 作业统计列表
  exportHomework: '/homework/export#export', // 作业统计导出

  getClassHonorList: '/class/honor/list#post', // 查询班级荣誉列表
  getClassHonorDetail: '/class/honor/detail#getUrl', // 查询班级荣誉详情
  addClassHonor: '/class/honor/add#post', // 添加班级荣誉
  editClassHonor: '/class/honor/update#putJson', // 修改班级荣誉
  deleClassHonor: '/class/honor/delete#delete', // 删除班级荣誉

  getNewspaperList: '/electronic/newspaper/list#post', // 查询班级电子板报列表
  addNewspaper: '/electronic/newspaper/add#post', // 添加电子板报
  deleNewspaper: '/electronic/newspaper/delete#delWithQuery' // 删除电子板报
}

for (const val in showApi) {
  showApi[val] = `${hostEnv.zq_class}${showApi[val]}`
}
export default {
  ...showApi,
  delFile: `${hostEnv.zk_oa}/study/theme/file/delete#delWithQuery` // 文件删除
}
