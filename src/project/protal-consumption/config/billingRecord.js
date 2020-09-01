// 系统表单
import { RouteView } from '../layouts'
const AccountList = resolve => require(['../views/accountMge/AccountList.vue'], resolve)
const SubsidyManage = resolve => require(['../views/accountMge/SubsidyManage.vue'], resolve)
const billingRecord = {
  path: '/billingRecord',
  name: 'billingRecord',
  component: RouteView,
  meta: {
    title: '账单记录'
  },
  children: [
    {
      path: '/rechargeRecord',
      name: 'rechargeRecord',
      component: AccountList,
      meta: {
        title: '充值记录'
      }
    },
    {
      path: '/subsidyPaymentRecord',
      name: 'subsidyPaymentRecord',
      component: SubsidyManage,
      meta: {
        title: '补助发放记录'
      }
    },
    {
      path: '/revocationRecord',
      name: 'revocationRecord',
      component: SubsidyManage,
      meta: {
        title: '撤销记录'
      }
    },
    {
      path: '/refundRecord',
      name: 'refundRecord',
      component: SubsidyManage,
      meta: {
        title: '退款记录'
      }
    },
    {
      path: '/balanceResetRecord',
      name: 'balanceResetRecord',
      component: SubsidyManage,
      meta: {
        title: '余额清零记录'
      }
    }
  ]
}

export default billingRecord
