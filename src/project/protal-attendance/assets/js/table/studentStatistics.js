const studentStatistics = [
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
    title: '学号',
    dataIndex: 'num',
    width: '10%'
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: '10%'
  },
  {
    title: '班级',
    dataIndex: 'class',
    width: '10%'
  },
  {
    title: '正常次数',
    dataIndex: 'normal',
    width: '10%'
  },
  {
    title: '迟到次数',
    dataIndex: 'late',
    width: '10%'
  },
  {
    title: '早退次数',
    dataIndex: 'early',
    width: '10%'
  },
  // {
  //   title: '上学缺卡次数',
  //   dataIndex: 'start',
  //   width: '10%'
  // },
  // {
  //   title: '放学缺卡次数',
  //   dataIndex: 'end',
  //   width: '10%'
  // },
  // {
  //   title: '请假次数',
  //   dataIndex: 'leave',
  //   width: '10%'
  // },
  {
    title: '考勤次数',
    dataIndex: 'absence',
    width: '10%'
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default studentStatistics
