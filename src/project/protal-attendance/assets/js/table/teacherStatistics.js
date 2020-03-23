const teacherStatistics = [
  {
    title: '序号',
    width: '10%',
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
    title: '工号',
    dataIndex: 'num',
    width: '10%'
  },
  {
    title: '组织机构',
    dataIndex: 'org',
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
  //   title: '上班缺卡次数',
  //   dataIndex: 'onWork',
  //   width: '10%'
  // },
  // {
  //   title: '下班缺卡次数',
  //   dataIndex: 'offWork',
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
export default teacherStatistics
