// 系统表单
import { RouteView } from '../layouts'
const AccountList = resolve => require(['../views/accountMge/AccountList.vue'], resolve)
const SubsidyManage = resolve => require(['../views/accountMge/SubsidyManage.vue'], resolve)
const systemSettings = {
  path: '/systemSettings',
  name: 'systemSettings',
  component: RouteView,
  meta: {
    title: '系统设置'
  },
  children: [
    {
      path: '/faceBlacklist',
      name: 'faceBlacklist',
      component: AccountList,
      meta: {
        title: '人脸黑名单'
      }
    },
    {
      path: '/messageSettings',
      name: 'messageSettings',
      component: SubsidyManage,
      meta: {
        title: '消息设置'
      }
    }
  ]
}

export default systemSettings
