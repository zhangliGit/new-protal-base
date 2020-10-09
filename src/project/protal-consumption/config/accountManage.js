// 账户管理
import { RouteView } from '../layouts'
const AccountList = resolve => require(['../views/accountMge/AccountList.vue'], resolve)
const CardReadingRecharge = resolve => require(['../views/accountMge/CardReadingRecharge.vue'], resolve)
const AccountOperation = resolve => require(['../views/accountMge/AccountOperation.vue'], resolve)
const AccountDetails = resolve => require(['../views/accountMge/AccountDetails.vue'], resolve)
const SubsidyManagement = resolve => require(['../views/accountMge/SubsidyManagement.vue'], resolve)

const accountMge = {
  path: '/accountList',
  name: 'accountList',
  component: RouteView,
  meta: {
    title: '账户管理'
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
      path: '/accountList/accountDetails',
      name: 'accountDetails',
      component: AccountDetails,
      meta: {
        title: '账户详情',
        isHide: true
      }
    },
    {
      path: '/cardReadingRecharge',
      name: 'cardReadingRecharge',
      component: CardReadingRecharge,
      meta: {
        title: '读卡充值'
      }
    },
    {
      path: '/subsidyManagement',
      name: 'subsidyManagement',
      component: SubsidyManagement,
      meta: {
        title: '补助管理'
      }
    },
    {
      path: '/accountOperationRecord',
      name: 'accountOperationRecord',
      component: AccountOperation,
      meta: {
        title: '账户操作记录'
      }
    }
  ]
}
export default accountMge
