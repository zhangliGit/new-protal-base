/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  addNews: '/news/add#postForm', // 新增新闻
  delAllnews: '/news/delete#post', // 批量删除新闻
  delNews: '/news/delete#del', // 删除新闻
  getNewsDetail: '/news/detail/#getWithPara', // 新闻详情
  newsList: '/news/list#post', // 新闻列表
  updateNews: '/news/update#put', // 更新 新闻
  addNotice: '/notice/add#post', // 新增公告
  delAllnotice: '/notice/delete#post', // 批量删除公告
  delNotice: '/notice/delete#post', // 删除公告
  getNoticeDetail: '/notice/detail/#getWithPara', // 公告 详情
  noticeList: '/notice/list#post', // 公告 列表
  updateNotice: '/notice/update#putJson', // 更新公告
  getReadStatus: '/notice/readStatusDetail#post', // 阅读状态详情
  updateStatus: '/notice/readStatus#put', // 更新阅读状态为已读
  getTeaList: '/notice/teacherCode#getUrl', // 查询职工列表
  getStuList: '/notice/classCode#getUrl' // 查询学生列表
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.zq_news}${homeApi[val]}`
}
export default homeApi