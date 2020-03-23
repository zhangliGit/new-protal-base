const teacherOperate = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '时间',
    dataIndex: 'time',
    width: '25%'
  },
  {
    title: '操作类型',
    dataIndex: 'type',
    width: '12%',
    customRender: (text) => {
      return text === 1 ? '上班' : '下班'
    }
  },
  {
    title: '原状态',
    dataIndex: 'oldState',
    width: '10%',
    customRender: (text) => {
      if (text === 0) {
        return '正常'
      } else if (text === 1) {
        return '迟到'
      } else if (text === 2) {
        return '缺卡'
      } else if (text === 3) {
        return '早退'
      } else {
        return '请假'
      }
    }
  },
  {
    title: '更改后状态',
    dataIndex: 'newState',
    width: '14%',
    customRender: (text) => {
      return text === 1 ? '正常' : '请假'
    }
  },
  {
    title: '操作人',
    dataIndex: 'name',
    width: '12%'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '10%'
  }
]
export default teacherOperate
