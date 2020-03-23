const studentRecord = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '8%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '8%',
    customRender: (text) => {
      if (text === 1) {
        return '男'
      } else if (text === 2) {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: '8%'
  },
  {
    title: '班级',
    dataIndex: 'class',
    width: '8%'
  },
  {
    title: '学号',
    dataIndex: 'num',
    width: '10%'
  },
  {
    title: '上学时间',
    dataIndex: 'startTime',
    width: '10%'
  },
  {
    title: '上学状态',
    dataIndex: 'startState',
    width: '10%',
    customRender: (text) => {
      if (text === 0) {
        return '正常'
      } else if (text === 1) {
        return '迟到'
      } else if (text === 2) {
        return '缺卡'
      } else {
        return '请假'
      }
    }
  },
  {
    title: '放学时间',
    dataIndex: 'endTime',
    width: '10%'
  },
  {
    title: '放学状态',
    dataIndex: 'endState',
    width: '10%',
    customRender: (text) => {
      if (text === 0) {
        return '正常'
      } else if (text === 1) {
        return '早退'
      } else if (text === 2) {
        return '缺卡'
      } else {
        return '请假'
      }
    }
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default studentRecord
