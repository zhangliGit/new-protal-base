const teacherRecord = [
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
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '10%',
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
    title: '组织机构',
    dataIndex: 'org',
    width: '10%'
  },
  {
    title: '工号',
    dataIndex: 'num',
    width: '10%'
  },
  {
    title: '上班时间',
    dataIndex: 'workTime',
    width: '10%'
  },
  {
    title: '上班状态',
    dataIndex: 'workState',
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
    title: '下班时间',
    dataIndex: 'restTime',
    width: '10%'
  },
  {
    title: '下班状态',
    dataIndex: 'restState',
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
export default teacherRecord
