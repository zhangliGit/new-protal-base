import Tools from '@u/tools'
import baseData from '../js/base'
const cardColumns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '6%'
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '9%'
  },
  {
    title: '身份',
    dataIndex: 'userType',
    width: '9%',
    customRender: text => {
      return baseData.userType(text)
    }
  },
  {
    title: '学号/工号',
    dataIndex: 'workNo',
    width: '9%'
  },
  {
    title: '班级/部门',
    dataIndex: 'classBoards',
    width: '9%'
  },
  {
    title: '账户状态',
    dataIndex: 'status',
    width: '8%',
    customRender: text => {
      return baseData.actionType(text)
    }
  },
  {
    title: '卡状态',
    dataIndex: 'cardStatus',
    width: '8%',
    customRender: text => {
      return baseData.getCardStatus(text)
    }
  },
  {
    title: '卡号',
    dataIndex: 'cardNo',
    width: '9%'
  },
  {
    title: '账户余额',
    dataIndex: 'balance',
    width: '9%'
  },
  {
    title: '头像',
    dataIndex: 'photoUrl',
    width: '9%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '操作',
    key: 'action',
    width: '15%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default cardColumns
