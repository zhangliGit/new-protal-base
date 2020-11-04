/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */
import hostEnv from '@config/host-env'
const highApi = {
  // 高校版学生管理
  addHighStu: '/student/manage/add#post', // 新增学生用户信息
  highStusChange: '/student/manage/batch/change/class#post', // 批量转班
  highStuImport: '/student/manage/batch/import#post', // 批量导入
  highStusRemove: '/student/manage/batch/remove#putQuery', // 批量移出
  highStuChange: '/student/manage/change/class#post', // 转班
  getHighStuDetail: '/student/manage/detail#get', // 详情
  highStuJoin: '/student/manage/join/class#post', // 加入班级
  getHighStu: '/student/manage/list#post', // 列表
  highStuRemove: '/student/manage/remove#putQuery', // 移出班级
  updateHighStu: '/student/manage/update#post' // 更新

}
for (const val in highApi) {
  highApi[val] = `${hostEnv.ljj_people}${highApi[val]}`
}
export default highApi
