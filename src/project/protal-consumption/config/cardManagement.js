// 系统表单
import { RouteView } from '../layouts'
const AccountList = resolve => require(['../views/accountMge/AccountList.vue'], resolve)
const SubsidyManage = resolve => require(['../views/accountMge/SubsidyManage.vue'], resolve)
const cardManagement = {
  path: '/billingRecord',
  name: 'billingRecord',
  component: RouteView,
  meta: {
    title: '账单记录'
  },
  children: [
    {
      path: '/accountList',
      name: 'accountList',
      component: AccountList,
      meta: {
        title: '账户列表'
      }
    },

    {
      path: '/cardOperationRecord',
      name: 'cardOperationRecord',
      component: SubsidyManage,
      meta: {
        title: '卡操作记录'
      }
    }
  ]
}

export default cardManagement
